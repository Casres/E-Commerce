const router = require("express").Router();
const { Categories } = require("../../models");
const Products = require("../../models/products");
// read
router.get("/", (req, res) => {
  Categories.findAll({
    attributes: ["id", "category_name"],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get by id
router.get("/:id", (req, res) => {
  Categories.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "category_name"],
    include: [
      {
        model: Products,
        attributes: [
            "id", 
            "product_name", 
            "price", "stock", 
            "category_id"
        ],
      },
    ],
  })
  .then((dbCategoryData) => {
    if(!dbCategoryData) {
      res.status(404).json({ message: "No category found" });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500). json(err);
  });
});


module.exports = router;