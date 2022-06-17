const Employee = require("./employee");
const Tags = require("./tags");
const Categories = require('./categories');
const Products = require('./products');
const ProductTag = require('./ProductTag');

Products.belongsTo(Categories, {
    foreignKey: 'category_id'
});

Categories.hasMany(Products, {
    foreignKey: 'category_id'
});

Products.belongsToMany(Tags, {
    through: ProductTag,
    as: 'product_tags',
    foreignKey: 'products_id'
})

module.exports = { Employee, Tags, Categories, Products, ProductTag };
