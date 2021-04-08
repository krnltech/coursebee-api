const { Schema, model } = require("mongoose");

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mentorId: {
    type: Schema.Types.ObjectId,
    ref: "mentor",
    required: "true",
  },
  whatToLearn: [
    {
      type: String,
    },
  ],
  shortDescription: {
    type: String,
  },
  description: {
    type: String,
  },
  rating: [
    {
      userId: { type: String },
      rate: { type: Number },
      comment: { type: String },
    },
  ],
  section: {
    name: String,
    contents: [
      {
        name: String,
        type: String,
        content: String,
        duration: String,
        completed: [],
      },
    ],
  },
  label: String,
  price: Number,
  fakePrice: Number,
  requirements: String,
  views: Number,
  tags: [String],
});

module.exports = model("course", CourseSchema);
