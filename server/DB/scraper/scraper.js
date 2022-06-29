const puppeteer = require("puppeteer");
const Country = require("../models/scraped.country.model.js");
const mongoose = require("mongoose");

// * Crawller to fetch event data
async function crawllerEventsPerCountry(countryArg) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`https://www.timeanddate.com/holidays/${countryArg}/`);

  const tr = await page.$$eval("tr", (tr) => {
    return tr.map((x) => {
      if (x.children) {
        return [...x.children].map((c) => c.textContent);
      }
      return x.textContent;
    });
  });

  const country = new Country(addCountryToDB(tr, countryArg));
  await country.save();

  await browser.close();
  return country;
}

//* Utils for cralwer
function addCountryToDB(tableRow, countryArg) {
  const countryDocument = {
    country: countryArg,
    events: [],
  };
  tableRow.forEach((row) => {
    if (row[0]) {
      countryDocument.events.push({ name: row[2], type: row[3], date: row[0] });
    }
  });

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

// ! Moshe :The function u need to use is a promise that return country
// ! The line bellow is example how to use this function
// exctractData("egypt").then((country) => console.log(country));

// =======================================================================================
module.exports = exctractData;
