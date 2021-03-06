const { Router } = require("express");
const router = Router();
const commentController = require("../controllers/commentControlller");
router.get("detail/:id", commentController.getComment);
router.get("/", commentController.getAllComments);
router.post("/", commentController.postComment);
router.delete("/delete/:id", commentController.deleteComment);
router.put("/like/:id", commentController.likeComment);
module.exports = router;
