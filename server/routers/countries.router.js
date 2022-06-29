const { Router } = require("express");
const exctractData = require("../DB/scraper/scraper.js"); // arg1: country name
const eventByDateAndCountry = require("../DB/scraper/scraperPage2.js"); //

const router = new Router();

// Get Country data
router.post("/countries/holydays", async (req, res) => {
  try {
    const data = await exctractData(req.body.country);
    console.log(req.body);
    res.send(data);
  } catch (error) {
    res.send({ error: error.message, error2: "Not avilable data" });
  }
});
// Get Country event by date
router.post("/countries/events", async (req, res) => {
  try {
    // console.log(req.body);
    const data = await eventByDateAndCountry(req.body.countryName, req.body.eventId, req.body.eventLink); //countryName, eventId, eventLink
    res.send(data);
  } catch (error) {
    res.send({ error: error.message, error2: "Somthing went wrong" });
  }
});

module.exports = router;
