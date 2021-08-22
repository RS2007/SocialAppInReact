const { Router } = require("express");
const router = Router();
const commentController = require("../controllers/commentControlller");
router.get("/:id", commentController.getComment);
router.post("/", commentController.postComment);
router.delete("/delete/:id", commentController.deleteComment);
router.put("/like/:id", commentController.likeComment);
router.put("update/:id", commentController.updateComment);
module.exports = router;
