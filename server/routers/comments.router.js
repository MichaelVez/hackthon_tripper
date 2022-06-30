const { Router } = require("express");
const Comments = require("../DB/models/comments.model");
const auth = require("../middleware/authentication.js");

const router = Router();

// owner: req.body.userId,
// router.post("/comments", auth, async (req, res) => {
router.post("/comments/:id", auth, async (req, res) => {
  const eventID = req.params.id;
  console.log(req.body);
  const comment = new Comments({
    owner: req.user._id,
    text: req.body.text,
    event: eventID,
    countryName: req.body.countryName
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
