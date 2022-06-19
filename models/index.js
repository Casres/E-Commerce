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
    foreignKey: 'products_id'
});

Tags.belongsToMany(Products, {
    through: ProductTag,
    foreignKey: 'tags_id'
});

Products.hasMany(ProductTag, {
    foreignKey: 'products_id'
});

Tags.hasMany(Products, {
    foreignKey: 'tags_id'
});

module.exports = { Employee, Tags, Categories, Products, ProductTag };
