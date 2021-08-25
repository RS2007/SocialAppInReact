const postModel = require("../models/postModel");
module.exports.postGet = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    res.json(post);
  } catch (err) {
    console.log(err.message);
  }
};
module.exports.getAllPosts = async (req, res) => {
  try {
    const postList = await postModel.find({});
    res.json(postList);
  } catch (err) {
    res.json(err);
  }
};
module.exports.postPost = async (req, res) => {
  try {
    const newPost = new postModel({
      userId: req.body.userId,
      image: req.body.image,
      desc: req.body.desc,
      likes: req.body.likes,
    });
    await newPost.save();
    res.send("post saved");
  } catch (err) {
    console.log(err.message);
  }
};
module.exports.postUpdate = async (req, res) => {
  try {
    const posts = await postModel.findById(req.params.id);
    if (posts.userId === req.body.userId) {
      const { image, desc } = req.body;
      await postModel.findByIdAndUpdate(req.params.id, {
        image,
        desc,
      });
      console.log(posts);
      res.send("Updated succesfully");
    } else {
      res.send("This is not your post");
    }
  } catch (err) {
    console.log(err.message);
  }
  //console.log(req.params.id)
};
module.exports.postLike = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await postModel.findByIdAndUpdate(req.params.id, {
        $push: { likes: req.body.userId },
      });
      res.send("You have liked the post");
    } else {
      await postModel.findByIdAndUpdate(req.params.id, {
        $pull: { likes: req.body.userId },
      });
      res.send("Your like is removed");
    }
  } catch (err) {
    console.log(err.message);
  }
};
