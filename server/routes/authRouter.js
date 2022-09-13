const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleMiddleware = require("../middleware/roleMiddleware");

router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.get("/auth", authMiddleware, controller.check);

router.get("/users", checkRoleMiddleware("ADMIN"), controller.getUsers);
router.get("/:id", checkRoleMiddleware("ADMIN"), controller.getOne);
router.put("/update", checkRoleMiddleware("ADMIN"), controller.updateRole);
router.delete("/delete", checkRoleMiddleware("ADMIN"), controller.deleteUser);
module.exports = router;
