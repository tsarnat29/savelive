const { Demand } = require("../models/models");
const ApiError = require("../error/ApiError");

class CommentController {
  async updateComment(req, res) {
    let { id, comment } = req.query;
    debugger;
    const data = await Demand.update({ comment }, { where: { id } });
    return res.json(data);
  }
}
module.exports = new CommentController();
