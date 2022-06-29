const axios = require("axios");
const puppeteer = require("puppeteer");
const express = require("express");
const PORT = 8000;

const app = express();
// const url = "https://www.timeanddate.com/holidays/germany/new-year-day";
const url = "https://www.timeanddate.com/holidays/germany/palm-sunday";

async function getDataPerCountry(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  // const title = await page.$eval(".mgt0", (title) => title.textContent);
  // const titleText = await page.$eval(".mgt0 p", (p) => p.textContent);
  // console.log(title);
  // console.log(titleText);

  const imgs = await page.$eval(".article__fig img", (img) => img.src);
  const desc = await page.$eval(".lead", (text) => text.textContent);
  console.log(imgs);
  console.log(desc);
}
getDataPerCountry(url);

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
