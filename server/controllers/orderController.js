const uuid = require("uuid");
const path = require("path");
const { Basket, Demand } = require("../models/models");
const ApiError = require("../error/ApiError");

class OrderController {
  async create(req, res, next) {
    try {
      let {
        psw,
        head,
        title_head,
        phone_contacter,
        name_sub,
        name_unit,
        comment,
        unitId,
        potrebs,
      } = req.body;
      console.log("potrebs=", potrebs);
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const order = await Basket.create({
        psw,
        head,
        title_head,
        phone_contacter,
        name_sub,
        name_unit,
        comment,
        unitId,
        img: fileName,
      });

      if (potrebs) {
        potrebs = JSON.parse(potrebs);
        console.log(".parse=", potrebs);
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
}

module.exports = new OrderController();
