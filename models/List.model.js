const { Schema, model } = require('mongoose');

const ListSchema = new Schema(
  {
    title: { type: String, require: true },
    activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
  },
  { timestamps: true }
);

module.exports = model('List', ListSchema)