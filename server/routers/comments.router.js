const { Router } = require("express");
const Comments = require("../DB/models/scraped.country.model.js");
const auth = require("../middleware/authentication.js");

const router = Router();

router.post("/comments", auth, async (req, res) => {
  const comment = new Comments({
    owner: user._id,
    text: text,
    event: eventId._id,
  });
  try {
    await comment.save();
    res.status(201).send(comment);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
