const Comments = require("../DB/models/comments.model");

router.post("/comments", auth, async (req, res) => {
  const comment = new Comments({
    // owner: req.user._id,
    owner: req.body.userId,
    text: req.body.text,
    event: req.body.eventId,
  });
  try {
    await comment.save();
    res.status(201).send(comment);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
