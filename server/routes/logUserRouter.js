const Router = require("express");
const router = new Router();
const logUserController = require("../controllers/logUserController");
const checkRole = require("../middleware/roleMiddleware");

router.post("/", checkRole("OPER"), logUserController.create);
router.get("/", checkRole("OPER"), logUserController.getAll);

module.exports = router;
