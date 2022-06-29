const puppeteer = require("puppeteer");
const Country = require("../../models/scraped.country.model.js");
// const mongoose = require("mongoose");
// const moment = require("moment");
// const express = require("express");
// const PORT = 8000;
// const app = express();
// app.listen(PORT, () => {
//     console.log("Server running on port ", PORT);
//   });
function splitLinkTag(aTag) {
  const web = "https://www.timeanddate.com";
  const cut1 = aTag.indexOf(">");
  const str2 = web + aTag.slice(9, cut1 - 1);
  const cut2 = aTag.lastIndexOf("<");
  const str3 = aTag.slice(cut1 + 1, cut2);
  return [str3, str2];
}

// * Crawller to fetch event data
async function crawllerEventsPerCountry(countryArg) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.timeanddate.com/holidays/${countryArg}/`);

  const trEl = await page.$$eval("tr", (tr) => {
    return tr.map((row) => {
      if (row.children) {
        return [...row.children].map((c) => {
          if (c.innerHTML.includes("<")) {
            const web = "https://www.timeanddate.com";
            const cut1 = c.innerHTML.indexOf(">");
            const str2 = web + c.innerHTML.slice(9, cut1 - 1);
            const cut2 = c.innerHTML.lastIndexOf("<");
            const str3 = c.innerHTML.slice(cut1 + 1, cut2);
            return [str3, str2];
          }

          return c.innerHTML;
        });
      }
      //     return "benny";
      //   }
      //   console.log("xxxxxxxxx");
      //   return x.textContent;
    });
  });
  console.log(trEl);
  //   const strLink = tr[3];
  // console.log(t);

  //   await page.waitForSelector("tr");
  //   let element = await page.$("a");
  //   let value = await page.evaluate((el) => el.innerHTML, element);
  //   console.log(value);
}
crawllerEventsPerCountry("angola");

//   const country = new Country(addCountryToDB(tr, countryArg));
//   await country.save();

//   await browser.close();
//   return country;
// }

// //* Utils for cralwer
// function addCountryToDB(tableRow, countryArg) {
//   const countryDocument = {
//     country: countryArg,
//     events: [],
//   };
//   tableRow.forEach((row) => {
//     if (row[0]) {
//       countryDocument.events.push({
//         name: row[2],
//         type: row[3],
//         date: moment(row[0], "MMM DD YYYY").format("M.DD.YYYY"),
//       });
//     }
//   });

//   // countryDocument.shift();

//   return countryDocument;
// }

// ! This is the function to export
// ExctractData from DB or Crawller
// async function exctractData(countryName) {
//   const country = await Country.findOne({ country: countryName });
//   //   console.log(country);
//   if (country) {
//     console.log("Data taken from DB");
//     return country;
//   } else {
//     console.log("Crawller start");
//     return crawllerEventsPerCountry(countryName);
//   }
// }

// ! Moshe :The function u need to use is a promise that return country
// ! The line bellow is example how to use this function
// exctractData("egypt").then((country) => console.log(country));
