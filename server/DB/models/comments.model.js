const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
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
