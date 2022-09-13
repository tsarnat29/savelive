const Router = require("express");
const router = new Router();
const logUnitController = require("../controllers/logUnitController");
const checkRole = require("../middleware/roleMiddleware");

router.post("/", checkRole("OPER"), logUnitController.create);
router.get("/", checkRole("OPER"), logUnitController.getAll);

module.exports = router;
