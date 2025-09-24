const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const TimeEntry = sequelize.define("TimeEntry", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hour: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = TimeEntry;
