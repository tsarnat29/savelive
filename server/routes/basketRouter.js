const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");
const checkOper = require("../middleware/checkRoleMiddleware");
const checkRole = require("../middleware/roleMiddleware");
const checkAuth = require("../middleware/authMiddleware");

router.post("/", checkRole("OPER"), basketController.create);
router.get("/", basketController.getAll);
router.get("/:id", checkAuth, basketController.getOne);
router.put("/", checkRole("OPER"), basketController.updateStatus);
router.delete("/", checkRole("OPER"), basketController.delete);
module.exports = router;
