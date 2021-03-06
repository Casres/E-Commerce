const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Tags extends Model {}

Tags.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Tags",
  }
);

module.exports = Tags;
