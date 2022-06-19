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
    foreignKey: 'product_id'
});

Tags.belongsToMany(Products, {
    through: ProductTag,
    foreignKey: 'tag_id'
});

// Products.hasMany(ProductTag, {
//     foreignKey: 'product_id'
// });

module.exports = { Employee, Tags, Categories, Products, ProductTag };
