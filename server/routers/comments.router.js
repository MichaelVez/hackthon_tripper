const { Router } = require("express");
const Comments = require("../DB/models/comments.model");
const User = require("../DB/models/User/user.model");
// const User = require("../DB/models/User/user.model");
const auth = require("../middleware/authentication.js");

const router = Router();

// owner: req.body.userId,
// router.post("/comments", auth, async (req, res) => {
router.post("/comments/:id", auth, async (req, res) => {
  const eventID = req.params.id;
  console.log(req.body);
  const comment = new Comments({
    owner: req.user._id,
    author: req.user.firstName,
    text: req.body.text,
    event: eventID,
    countryName: req.body.countryName,
  });
  try {
    await comment.save();
    res.status(201).send(comment);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/comments/:eventId", async (req, res) => {
  const comments = await Comments.find({ event: req.params.eventId });

  try {
    res.send(comments);
    console.log(comments);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
