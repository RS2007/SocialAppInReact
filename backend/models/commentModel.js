const mongoose = require("mongoose");
const { Schema } = mongoose;
const { model } = mongoose;
const commentSchema = new Schema({
  postId: {
    type: String,
    required: [true, "You can only comment on a post"],
  },
  userId: {
    type: String,
    required: [true, "You must be a user"],
  },
  commentBody: {
    type: String,
    required: [true, "Enter a valid comment"],
  },
  likes: {
    type: Array,
    default: [],
  },
});
module.exports = model("comments-posts", commentSchema);
