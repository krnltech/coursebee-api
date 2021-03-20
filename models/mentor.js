const { Schema, model } = require("mongoose");

const MentorSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  documents: [
    {
      type: Schema.Types.ObjectId,
      ref: "asset",
    },
  ],
});

module.exports = model("mentor", MentorSchema);
