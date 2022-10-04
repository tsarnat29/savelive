const sequelize = require("../db");
const { DataTypes } = require("sequelize");
//pass:gjrfnarjq

const User = sequelize.define("user", {
  email: { type: DataTypes.STRING, validate: { isEmail: true }, unique: true },
  password: { type: DataTypes.STRING },
  role: {
    type: DataTypes.STRING,
    defaultValue: "USER",
  },
});

formData.append("unitId", dbData.selectedUnit.id);
const Basket = sequelize.define("basket", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titlee_sub: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contacter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title_contacter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_contacter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  head: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_head: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title_region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  form_act: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  psw: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Demand = sequelize.define("demand", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Нова заявка",
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const ListSubSection = sequelize.define("unit", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title_sub: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const LogsBasket = sequelize.define("logsBasket", {
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name_unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titlee_sub: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contacter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title_contacter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_contacter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  head: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_head: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title_region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  form_act: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  psw: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const LogsUnit = sequelize.define("logsUnit", {
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title_sub: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const LogsUser = sequelize.define("logsUser", {
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: { type: DataTypes.STRING, allowNull: false },
  passw: { type: DataTypes.STRING },
  role: {
    type: DataTypes.STRING,
  },
});

// status:  нова заявка, прийнято, в очікуванні, відхилено, опрацьовано
//Опціонально можна додавати коментар до статусу (обов’язково для відхилено)

Basket.hasMany(Demand, { as: "potrebs" });
Demand.belongsTo(Basket);

ListSubSection.hasMany(Basket);
Basket.belongsTo(ListSubSection);

module.exports = {
  User,
  Basket,
  Demand,
  ListSubSection,
  LogsBasket,
  LogsUnit,
  LogsUser,
};
