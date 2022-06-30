const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      require: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    author: {
      type: String,
      require: true
    },
    countryName: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

// countrySchema.methods.addEvents = async function (events) {
//   const country = this;
//   country.events.push(events);
//   await country.save();
// };

const Comments = mongoose.model("comments", commentsSchema);
module.exports = Comments;
