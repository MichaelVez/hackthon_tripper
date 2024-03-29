const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  country: {
    type: String,
  },
  flag: {
    type: String,
  },
  events: [
    {
      date: {
        type: String,
      },
      name: {
        type: String,
      },
      link: {
        type: String,
      },
      type: {
        type: String,
      },
      image: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
});

// countrySchema.methods.addEvents = async function (events) {
//   const country = this;
//   country.events.push(events);
//   await country.save();
// };

const Country = mongoose.model("country", countrySchema);
module.exports = Country;
