const router = require("express").Router();
const { Tags, Products, ProductTag } = require("../../models");
// const userInputCheck = require('./checkUserInput');

// gets all Tags
router.get("/", (req, res) => {
  Tags.findAll({
    order: [["id", "DESC"]],
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Products,
        attributes: [
            "id", 
            "product_name", 
            "price", 
            "stock", 
            "category_id"
        ],
        include: [{
          model: ProductTag,
          through: ProductTag
        }],
      },
    ],
  })
    .then((dbTagsData) => res.json(dbTagsData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get('/', (req, res) => {
//     Tags.findAll({
//       include: [
//         {
//           model: Products,
//           through: ProductTag,
//         },
//       ],
//     }).then((tags) => res.json(tags));
//   });

// gets product by id
router.get("/:id", (req, res) => {
  Tags.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "product_name", "price", "stock", "category_id"],
    include: [
      {
        model: Categories,
        attributes: ["category_name"],
      },
    ],
  })
    .then((dbTagsData) => {
      if (!dbTagsData) {
        res
          .status(404)
          .json({ message: "No product found with this ID, please try again" });
        return;
      }
      res.json(dbTagsData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// creates Tags
router.post("/", (req, res) => {
  Tags.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
  })
    .then((dbTagsData) => res.json(dbTagsData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// updates product by id
router.put("/:id", (req, res) => {
  Tags.update(
    {
      stock: req.body.stock,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbTagsData) => {
      if (!dbTagsData) {
        res.status(404).json({ message: "Product with this ID is not found" });
        return;
      }
      res.json({
        message: "product stock change successful",
        changed: req.params.id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// deletes product by id
router.delete("/:id", (req, res) => {
  Tags.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagsData) => {
      if (!dbTagsData) {
        res
          .status(500)
          .json({
            messages: "Cannot find product to delete, please try again",
          });
        return;
      }
      res.json({
        deleted: req.params.id,
        rows_affected: dbTagsData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

module.exports = router;
