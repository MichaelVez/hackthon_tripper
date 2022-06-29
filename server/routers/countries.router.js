const { Router } = require("express");
const exctractData = require("../DB/scraper/scraper.js"); // arg1: country name

const router = new Router();

// Get Country data
router.post("/countries/holydays", async (req, res) => {
  try {
    const data = await exctractData(req.body.country);
    console.log(req.body);
    res.send(data);
  } catch (error) {
    res.send({ error, error2: "Not avilable data" });
  }
});

module.exports = router;
