const {DataTypes} = require("sequelize")
const sequelize = require("../config/db")

const Template = sequelize.define("Template", {

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type:DataTypes.ENUM("Active", "Draft"),
        defaultValue: "Draft",
    },
    date: {
  type: DataTypes.DATEONLY,
  defaultValue: sequelize.literal("CURRENT_DATE"),
   },


},{
    timestamps: true,
});

module.exports = Template;