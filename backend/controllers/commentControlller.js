const commentModel = require("../models/commentModel");
const jwt=require("jsonwebtoken");
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
  try {
    console.log(req.cookies);
    const currentUserId= req.body.userId;
    console.log(currentUserId);
    if(!currentUserId) res.status(400).json({error: "Invalid Login"});
    const comment=await commentModel.findById(req.params.id);
    if(comment.userId===currentUserId) {
      await commentModel.findByIdAndDelete(comment._id);
      res.status(200).json({message: "Succesfully deleted the comment"});
    } else {
      console.log("voo");
      res.status(400).json({error: "You can delete only your own comment"});
    } 
  } catch(err) {
    console.log(err.message);
    res.status(400).json({error: err.message})
  }
};
module.exports.likeComment=async (req,res) => {
  try {
    const currentUserId=await jwt.verify(req.cookies.jwt,process.env.JWT_PASS);
    if(!currentUserId) res.status(400).json({error: "Invalid Login"});
    const comment=await commentModel.findById(req.params.id);
    if(!comment.likes.includes(currentUserId.userId)) {
      try {
        await commentModel.findByIdAndUpdate(req.params.id,{
          $push: {likes:currentUserId.userId},
        });
        res.send("comment like succesful");
      } catch(err) {
        console.log(err.message);
      }
    } else {
      try {
        await commentModel.findByIdAndUpdate(req.params.id,{
          $pull: {likes: currentUserId.userId},
        });
        res.send("comment like removed succesfuly");
      } catch(err) {
        console.log(err.message);
      }
    }
  } catch(err) {
    console.log(err.message);
  }
  };
