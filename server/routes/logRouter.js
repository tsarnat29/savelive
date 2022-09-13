const Router = require("express");
const router = new Router();
const logController = require("../controllers/logController");
const checkRole = require("../middleware/roleMiddleware");

router.post("/", logController.create);
router.get("/", checkRole("OPER"), logController.getAll);

module.exports = router;
