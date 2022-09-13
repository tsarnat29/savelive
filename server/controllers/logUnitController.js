const { LogsUnit } = require("../models/models");
const ApiError = require("../error/ApiError");

class LogUnitController {
  async create(req, res, next) {
    try {
      let { reason, nomer, title_sub, section } = req.body;
      const unit = await LogsUnit.create({
        reason,
        nomer,
        title_sub,
        section,
      });

      return res.json(unit);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // пошук по ID підрозділу
  async getAll(req, res) {
    let { nomer } = req.query;
    let unit;
    console.log("fromServer. param", nomer);
    console.log(typeof nomer);
    if (!nomer) {
      unit = await LogsUnit.findAll();
    }
    if (nomer) {
      unit = await LogsUnit.findAll({
        where: { nomer: nomer },
      });
    }

    return res.json(unit);
  }
}
module.exports = new LogUnitController();
