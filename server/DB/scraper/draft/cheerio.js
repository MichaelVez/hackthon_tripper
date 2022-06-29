const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const PORT = 8000;

const app = express();

async function crawllerEventsPerCountry(countryArg) {
  const url = `https://www.timeanddate.com/holidays/germany/new-year-day`;
  const { data } = await axios(url); //html
  const $ = cheerio.load(data);
  const arr = [];

  // console.log(typeof $("tr", data).parent.Element);

  $("img", data).each(function () {
    // const row = $(this).text();
    const row = $(this);
    const image = row.find("img").attr("src");
    // console.log(row);
    // console.log(image);
    // if (row) {
    //   arr.push(row);
    // }
    console.log(image);
  });
  console.log(arr);
}

crawllerEventsPerCountry("angola");

// axios(url)
//   .then((res) => {
//     const html = res.data;
//     //   console.log(html);
//     const $ = cheerio.load(html);
//     const arr = [];

//     $("tr", html).each(function () {
//       const row = $(this).text();

//       arr.push({ row });
//     });

//     console.log(arr);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
