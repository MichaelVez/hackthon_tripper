const axios = require("axios");
const puppeteer = require("puppeteer");
const express = require("express");
const PORT = 8000;

const app = express();

// *test
const Country = require("../server/DB/models/scraped.country.model");
async function test(countryName, eventId, eventLink) {
  const data = await Country.findOne(
    {
      country: countryName,
    },
    {
      events: {
        $elemMatch: {
          _id: eventId,
        },
      },
    }
  );

  // scrapper will return src and desc
  const dataArr = gettingCountryEvent(eventLink);
  data.events[0].image = dataArr[0];
  data.events[0].description = dataArr[1];
  await data.save();
  // console.log(data.events[0]);
}

test();

// *test

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
