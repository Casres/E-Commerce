const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Products extends Model {}

Products.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        len: [10],
        isNumeric: true,
      },
    },
    // References the category model's id
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: "Categories",
        key: "id"
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Products"
  }
);

module.exports = Products;
