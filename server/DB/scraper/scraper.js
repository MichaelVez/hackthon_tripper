const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const Country = require("../models/scraped.country.model.js");
const app = require("../../app.js");
const mongoose = require("mongoose");

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
// utils cralwer
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

// validate data
async function CheckIfcountryOnDB(countryName) {
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

CheckIfcountryOnDB("egypt").then((country) => console.log(country));

// =======================================================================================

// const URL = `${process.env.MONGODB_URI}`;
const URL = "mongodb://127.0.0.1:27017/triper";

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("listen on port " + PORT);
});
