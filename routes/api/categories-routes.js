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
// create
router.post('/', (req, res) => {
  Categories.create({
    category_name: req.body.category_name
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err) => {
    console.log(err);
    req.status(500).json(err);
  });
});
// update
router.put('/:id', (req, res) => {
  Categories.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then((dbUpdatedCategoryName) => {
    if (!dbUpdatedCategoryName) {
      res.status(404).json({ message: "Category not found, please try again" });
      return;
    }
    res.json({
      changed_category: dbUpdatedCategoryName,
      changed_to: req.body.category_name
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});
// delete
router.delete('/:id', (req, res) => {
  Categories.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(500).json({ message: "No category found with this id, please try again" });
      return;
    }
    res.json({
      rows_affected: dbCategoryData,
      deleted: req.params.id
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;