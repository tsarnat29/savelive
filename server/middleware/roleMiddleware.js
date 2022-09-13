const jwt = require("jsonwebtoken");
// const {secret} = require('../config')
const secret = process.env.SECRET_KEY;

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }
      const { role } = jwt.verify(token, secret);
      console.log("role=", role);
      console.log("roles=", roles);
      let hasRole = false;
      if (role === roles || role === "ADMIN") {
        hasRole = true;
      }

      if (!hasRole) {
        return res.status(403).json({ message: "У вас нет доступа" });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
  };
};
