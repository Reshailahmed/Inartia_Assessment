const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Offer = sequelize.define("Offer", {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  position: DataTypes.STRING,
  department: DataTypes.STRING,
  salary: DataTypes.FLOAT,
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,   
  },
  status: { 
    type: DataTypes.STRING, 
    defaultValue: "Pending" 
  },
  sentDate: { type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },
  responseDate: { type: DataTypes.DATE },
  location: DataTypes.STRING,
  pdf_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Offer;
