const { Schema, model } = require('mongoose');

const PlanSchema = new Schema({
  text: String,
  amount:Number,
});

const Plan = model('Plan', PlanSchema);

module.exports = { Plan };
