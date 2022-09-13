const { LogsBasket } = require("../models/models");
const ApiError = require("../error/ApiError");

class LogController {
  async create(req, res, next) {
    try {
      let {
        reason,
        nomer,
        psw,
        head,
        title_head,
        phone_contacter,
        name_sub,
        name_unit,
        comment,
        potrebs,
        img,
      } = req.body;
      debugger;
      const order = await LogsBasket.create({
        reason,
        nomer,
        psw,
        head,
        title_head,
        phone_contacter,
        name_sub,
        name_unit,
        comment,
        potrebs,
        img,
      });

      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  // по підрозділу всі заявки
  async getAll(req, res) {
    try {
      let { nomer } = req.query;
      let orders;
      if (nomer) {
        orders = await LogsBasket.findAll({
          where: { nomer },
        });
      }
      if (!nomer) {
        orders = await LogsBasket.findAll();
      }

      return res.json(orders);
    } catch (e) {
      console.log({ message: "error getAll" });
    }
  }
}
module.exports = new LogController();
