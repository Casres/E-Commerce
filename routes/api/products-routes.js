const router = require("express").Router();
const { Products, Categories, Employee } = require("../../models");
const userInputCheck = require('./checkUserInput');

// gets all products✅
router.get("/", (req, res) => {
  Products.findAll({
    order: [["id", "DESC"]],
    attributes: ["id", "product_name", "price", "stock", "category_id"],
    // include: []
  })
    .then((dbProductsData) => res.json(dbProductsData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// gets product by id✅
router.get("/:id", (req, res) => {
  Products.findOne({
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
    .then((dbProductsData) => {
      if (!dbProductsData) {
        res
          .status(404)
          .json({ message: "No product found with this ID, please try again" });
        return;
      }
      res.json(dbProductsData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// creates products✅
router.post('/', (req, res) => {
    Products.create({
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
    })
    .then((dbProductsData) => res.json(dbProductsData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// updates product by id
router.put('/:id', (req, res) => {
    Products.update({
        // userInputCheck(req)
        where: {
            id: req.params.id   
        },
    })
});

// deletes product by id
module.exports = router;
