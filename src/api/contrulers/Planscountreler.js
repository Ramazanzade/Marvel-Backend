const { Plan } = require("../../models/Plansmodel");


const Planscountreler = {
  add: async (req, res) => {
    const body = req.body;
    let product = new Plan({
      amount: body.amount,
      text: body.text,
    });

    try {
      const savedProduct = await product.save();
      return res.json(savedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
        const products = await Plan.find();
        if (products.length > 0) {
            res.send(products);
        } else {
            res.status(404).send({ error: 'No products found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal server error' });
    }
},

  delete: async (req, res) => {
    try {
      const result = await Plan.deleteOne({ _id: req.params.id });
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    const result = await Plan.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send('Not changed');
    }
  },
  put: async (req, res) => {
    const result = await Plan.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(result);
  },
};

module.exports = { Planscountreler }
