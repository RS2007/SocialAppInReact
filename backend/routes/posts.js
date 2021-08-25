const { Router } = require("express");
const router = Router();
const postController = require("../controllers/postController");
//getting a post
router.get("/:id", postController.postGet);
//getting all posts
router.get("/", postController.getAllPosts);
//posting a post
router.post("/", postController.postPost);
//updating a post
router.put("/update/:id", postController.postUpdate);
//liking and unliking a post
router.put("/like/:id", postController.postLike);
module.exports = router;
