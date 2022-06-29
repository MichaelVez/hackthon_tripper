const puppeteer = require("puppeteer");
const Country = require("../models/scraped.country.model.js");
// const mongoose = require("mongoose");
const moment = require("moment");

// * Crawller to fetch event data
async function crawllerEventsPerCountry(countryArg) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.timeanddate.com/holidays/${countryArg.toLowerCase()}/`);

  const tableRowElement = await page.$$eval("tr", (tr) => {
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
    });
  });

  const flag = await page.$eval(".headline-banner__wrap img", (img) => img.src);

  const country = new Country(addCountryToDB(tableRowElement, countryArg, flag));
  await country.save();

  await browser.close();
  return country;
}

//* Utils for cralwer
function addCountryToDB(tableRow, countryArg, flag) {
  const countryDocument = {
    country: countryArg,
    flag: flag,
    events: [],
  };
  tableRow.forEach((row) => {
    if (row[0] && row[2]) {
      countryDocument.events.push({
        name: row[2][0],
        link: row[2][1],
        type: row[3],
        date: moment(row[0], "MMM DD YYYY").format("M.DD.YYYY"),
      });
    }
  });

  // countryDocument.shift();

  return countryDocument;
}

// ! This is the function to export
// ExctractData from DB or Crawller
async function exctractData(countryName) {
  const country = await Country.findOne({ country: countryName });
  //   console.log(country);
  if (country) {
    console.log("Data taken from DB");
    return country;
  } else {
    console.log("Crawller start");
    return crawllerEventsPerCountry(countryName);
  }
}

// exctractData("egypt").then((country) => console.log(country));

// =======================================================================================
module.exports = exctractData;
