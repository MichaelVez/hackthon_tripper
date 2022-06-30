const { Router } = require("express");
const Comments = require("../DB/models/comments.model");
const auth = require("../middleware/authentication.js");

const router = Router();

// router.post("/comments", auth, async (req, res) => {
router.post("/comments", async (req, res) => {
  const comment = new Comments({
    owner: req.body.userId,
    // owner: req.user._id,
    text: req.body.text,
    event: req.body.countryId,
  });
  try {
    await comment.save();
    console.log(req.body);
    res.status(201).send(comment);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
