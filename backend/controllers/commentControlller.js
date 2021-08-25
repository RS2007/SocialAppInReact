const commentModel = require("../models/commentModel");
module.exports.getComment = async (req, res) => {
  try {
    const comment = await commentModel.findById(req.params.id);
    res.json(comment);
  } catch (err) {
    console.log(err.message);
  }
};
module.exports.getAllComments = async (req, res) => {
  try {
    const commentList = await commentModel.find({});
    res.json(commentList);
  } catch (err) {
    res.json(err);
  }
};
module.exports.postComment = async (req, res) => {
  try {
    const comment = new commentModel({
      postId: req.body.postId,
      userId: req.body.userId,
      commentBody: req.body.commentBody,
    });
    await comment.save();
    res.send("Comment posted");
  } catch (err) {
    console.log(err.message);
  }
};
module.exports.deleteComment = async (req, res) => {
  const comment = await commentModel.findById(req.params.id);
  if (comment.userId === req.body.userId) {
    try {
      await commentModel.findByIdAndDelete(req.params.id);
    } catch (err) {
      console.log(err.message);
    }
  } else {
    res.send("You can only delete only your own comment");
  }
};
module.exports.likeComment = async (req, res) => {
  const comment = await commentModel.findById(req.params.id);
  const currentUser = await commentModel.findById(req.body.userId);
  if (!comment.likes.includes(req.body.userId)) {
    try {
      await commentModel.findByIdAndUpdate(req.params.id, {
        $push: { likes: req.body.userId },
      });
      res.send("comment like succesful");
    } catch (err) {
      console.log(err.message);
    }
  } else {
    try {
      await commentModel.findByIdAndUpdate(req.params.id, {
        $pull: { likes: req.body.userId },
      });
      res.send("comment like removed succesfuly");
    } catch (err) {
      console.log(err.message);
    }
  }
};
module.exports.updateComment = async (req, res) => {
  const comment = await commentModel.findById(req.params.id);
  if (req.body.userId === comment.userId) {
    await commentModel.findByIdAndUpdate(req.params.id, {
      commentBody: req.body.commentBody,
    });
  } else {
    res.send("You can only edit your own comment");
  }
};
