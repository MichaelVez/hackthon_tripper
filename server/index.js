const app = require("./app.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const URL = `${process.env.MONGODB_URI}`;

// *test
// const Country = require("../server/DB/models/scraped.country.model");
// async function test() {
//   const data = await Country.findOne(
//     {
//       // _id: "62bc7a08633e5888ed591896",
//       country: "germany",
//     },
//     {
//       events: {
//         $elemMatch: {
//           _id: "62bc7f70b4f6f5e4b36ac76e",
//         },
//       },
//     }
//   );
//   data.events[0].image = "abcd";
//   await data.save();
//   console.log(data.events[0]);
// }

// test();

// // *test

mongoose.connect(URL, (error, mongoDBInstance) => {
  if (error) {
    console.log(error.message);
    throw error;
  }
  if (!process.env.NODE_ENV || !process.env.NODE_ENV === "development") {
    const { host, port, name } = mongoDBInstance;
    console.log({ host, port, name });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log("listen on port " + PORT);
});
