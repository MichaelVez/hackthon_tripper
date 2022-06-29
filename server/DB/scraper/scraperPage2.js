const Country = require("../models/scraped.country.model");
const puppeteer = require("puppeteer");

// const url = "https://www.timeanddate.com/holidays/germany/new-year-day";
// const url = "https://www.timeanddate.com/holidays/germany/palm-sunday";

async function getDataPerCountry(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`${url}`);

  const imgs = await page.$eval(".article__fig img", (img) => img.src);
  const desc = await page.$eval(".lead", (text) => text.textContent);
  //   console.log(imgs);
  //   console.log(desc);
  return [imgs, desc];
}

async function getEventsDataAndUpdateDb(countryName, eventId, eventLink) {
  // scrapper will return src and desc
  const dataArr = await getDataPerCountry(eventLink);

  const data = await Country.findOneAndUpdate(
    {
      country: countryName,
      events: {
        $elemMatch: {
          _id: eventId,
        },
      },
    },
    { $set: { "events.$.image": dataArr[0], "events.$.description": dataArr[1] } }
  );

  return data;
}

module.exports = getEventsDataAndUpdateDb;
