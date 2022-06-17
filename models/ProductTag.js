const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: "Products",
        key: "id",
      },
    },
    // References the tag model's id
    tag_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: "Tags",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "ProductTag"
  }
);

module.exports = ProductTag;