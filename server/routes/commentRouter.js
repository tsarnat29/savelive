const Router = require("express");
const router = new Router();
const commentController = require("../controllers/commentController");
const checkRole = require("../middleware/roleMiddleware");

router.put("/", checkRole("OPER"), commentController.updateComment);

module.exports = router;
