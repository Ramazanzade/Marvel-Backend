const { Schema, model } = require('mongoose');

const PlanSchema = new Schema({
  text: String,
  amount:String,
});

const Plan = model('Plan', PlanSchema);

module.exports = { Plan };
