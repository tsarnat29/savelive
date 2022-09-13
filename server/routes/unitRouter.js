const Router = require("express");
const router = new Router();
const unitController = require("../controllers/unitController");
const checkRole = require("../middleware/roleMiddleware");

router.post("/", checkRole("OPER"), unitController.create);
router.delete("/", checkRole("OPER"), unitController.delete);
router.get("/", unitController.getAll);
router.get("/:id", unitController.getOne);

module.exports = router;
