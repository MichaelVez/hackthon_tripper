const Country = require("../models/scraped.country.model.js");
const puppeteer = require("puppeteer");

// const url = "https://www.timeanddate.com/holidays/germany/new-year-day";
// const url = "https://www.timeanddate.com/holidays/germany/palm-sunday";

async function getDataPerCountry(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const imgs = await page.$eval(".article__fig img", (img) => img.src);
  const desc = await page.$eval(".lead", (text) => text.textContent);
  console.log(imgs);
  console.log(desc);
}
getDataPerCountry(url);

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
