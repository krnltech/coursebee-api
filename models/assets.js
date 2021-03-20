const { Schema, model } = require("mongoose");

const AssetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

module.exports = model("asset", AssetSchema);
