const Router = require("express");
const router = new Router();

const authRouter = require("./authRouter");
const basketRouter = require("./basketRouter");
const unitRouter = require("./unitRouter");
const orderRouter = require("./orderRouter");
const commentRouter = require("./commentRouter");
const logRouter = require("./logRouter");
const logUnitRouter = require("./logUnitRouter");
const logUserRouter = require("./logUserRouter");

router.use("/users", authRouter);
router.use("/basket", basketRouter);
router.use("/unit", unitRouter);
router.use("/order", orderRouter);
router.use("/comment", commentRouter);
router.use("/logsOrder", logRouter);
router.use("/logsUnit", logUnitRouter);
router.use("/logsUser", logUserRouter);

module.exports = router;
