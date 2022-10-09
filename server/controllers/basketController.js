const uuid = require("uuid");
const path = require("path");
const { Basket, Demand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
  async create(req, res, next) {
    try {
      let {
        name_unit,
        title_sub,
        contacter,
        title_contacter,
        phone_contacter,
        head,
        phone_head,
        title_region,
        form_act,
        comment,
        psw,
        unitId,
        potrebs,
      } = req.body;
      console.log(potrebs);
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const order = await Basket.create({
        name_unit,
        title_sub,
        contacter,
        title_contacter,
        phone_contacter,
        head,
        phone_head,
        title_region,
        form_act,
        comment,
        psw,
        unitId,
        img: fileName,
      });

      if (potrebs) {
        potrebs = JSON.parse(potrebs);
        potrebs.forEach((i) =>
          Demand.create({
            name: i.potreba,
            amount: i.amount,
            status: i.status,
            comment: i.comment,
            basketId: order.id,
          })
        );
      }

      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  // по підрозділу всі заявки
  async getAll(req, res) {
    let { unitId } = req.query;
    let orders;
    if (unitId) {
      orders = await Basket.findAll({ where: { unitId } });
    }
    if (!unitId) {
      orders = await Basket.findAll();
    }

    return res.json(orders);
  }

  // пошук заявки по id
  async getOne(req, res) {
    const { id } = req.params;
    const order = await Basket.findOne({
      where: { id },
      include: [{ model: Demand, as: "potrebs" }],
    });
    return res.json(order);
  }

  // заміна статусу заявки
  async updateStatus(req, res) {
    let { id, status } = req.query;
    const data = await Demand.update({ status }, { where: { id } });
    debugger;
    return res.json(data);
  }

  async delete(req, res, next) {
    try {
      debugger;
      let { id } = req.query;
      console.log("basketController.delId", id);
      const order = await Basket.destroy({
        where: { id },
        include: [{ model: Demand, as: "potrebs" }],
      });
      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BasketController();
