const { ListSubSection } = require("../models/models");
const ApiError = require("../error/ApiError");

class UnitController {
  async create(req, res, next) {
    try {
      let { title_sub, section } = req.body;
      const unit = await ListSubSection.create({
        title_sub,
        section,
      });

      return res.json(unit);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  // видалення підрозділу по id
  async delete(req, res, next) {
    try {
      let { id } = req.query;
      debugger;
      console.log("unitController.delId=", id);
      const unit = await ListSubSection.destroy({
        where: {
          id: id,
        },
      });
      return res.json(unit);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  // пошук всіх підрозділів батьківського підрозділу
  async getAll(req, res) {
    let { section } = req.query;
    let unit;

    if (!section) {
      unit = await ListSubSection.findAll();
    }
    if (section) {
      unit = await ListSubSection.findAll({
        where: { section },
      });
    }

    return res.json(unit);
  }

  // пошук підрозділу по id
  async getOne(req, res) {
    const { id } = req.params;
    const order = await ListSubSection.findOne({
      where: { id },
    });
    return res.json(order);
  }
}

module.exports = new UnitController();
