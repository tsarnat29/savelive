const { LogsUser } = require("../models/models");
const ApiError = require("../error/ApiError");

class LogUserController {
  async create(req, res, next) {
    try {
      let { reason, nomer, email, passw, role } = req.body;
      const data = await LogsUser.create({
        reason,
        nomer,
        email,
        passw,
        role,
      });

      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // пошук по ID підрозділу
  async getAll(req, res) {
    let { nomer } = req.query;
    let data;

    if (!nomer) {
      data = await LogsUser.findAll();
    }
    if (nomer) {
      data = await LogsUser.findAll({
        where: { nomer },
      });
    }

    return res.json(data);
  }
}
module.exports = new LogUserController();
