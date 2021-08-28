const userModel = require("../models/userModel");
module.exports.userGet = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err.message);
  }
};
module.exports.getAllUsers = async (req, res) => {
  try {
    const userList = await userModel.find({});
    res.json(userList);
  } catch (err) {
    res.json(err);
  }
};
module.exports.userUpdate = async (req, res) => {
  const { username, email } = req.body;
  if (req.body.userId === req.params.id) {
    try {
      await userModel.findByIdAndUpdate(req.params.id, {
        username,
        email,
      });
      res.json("update succesful");
    } catch (err) {
      console.log(err.message);
    }
  } else {
    res.send("You can only update your own account");
  }
};
module.exports.userDelete = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await userModel.findByIdAndDelete(req.params.id);
      res.send("user deleted succesfuly");
    } catch (err) {
      console.log(err.message);
    }
  }
};
module.exports.userFollows = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await userModel.findById(req.params.id);
      const currentUser = await userModel.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await userModel.findByIdAndUpdate(req.params.id, {
          $push: { followers: req.body.userId },
        });
        await userModel.findByIdAndUpdate(req.body.userId, {
          $push: { following: req.params.id },
        });
        res.send("Done");
      } else {
        res.send("you are already following this user");
      }
    } catch (err) {
      console.log(err.message);
    }
  } else {
    res.send("you cannot follow yourself");
  }
};
module.exports.userUnfollow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await userModel.findById(req.params.id);
      const currentUser = await userModel.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await userModel.findByIdAndUpdate(req.params.id, {
          $pull: { followers: req.body.userId },
        });
        await userModel.findByIdAndUpdate(req.body.userId, {
          $pull: { following: req.params.id },
        });
        res.send(done);
      } else {
        res.send("U cant unfollow a user you are not following");
      }
    } catch (err) {
      console.log(err.message);
    }
  } else {
    res.send("What are you doing?");
  }
};
