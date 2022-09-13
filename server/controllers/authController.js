const ApiError = require("../error/ApiError");
const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class authController {
  async registration(req, res, next) {
    try {
      const { email, password, role } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest("Invalid email or password"));
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "A user with the same name already exists" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = await User.create({
        email,
        password: hashPassword,
      });
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      console.log("Error registration", e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next(ApiError.internal("The User is not found"));
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError("The password is wrong"));
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      try {
      } catch (e) {
        console.log("login", e);
        res.status(400).json({ message: "Login error" });
      }
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
    });
    return res.json(user);
  }

  async deleteUser(req, res) {
    try {
      let { id } = req.query;
      const data = await User.destroy({
        where: {
          id: id,
        },
      });
      return res.json(data);
      // const users = await User.findAll();
      // res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  async updateRole(req, res) {
    let { id, role } = req.query;
    debugger;
    console.log("id=", id, "role=", role);
    const data = await User.update({ role }, { where: { id } });

    return res.json(data);
  }
}

module.exports = new authController();
