const { Schema, model } = require('mongoose');

const ActivitySchema = new Schema(
  {
    description: { type: String, require: true },
    isItDone: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model('Activity', ActivitySchema)