const router = require("express").Router();
const { Products, Categories, Employee } = require("../../models");
// const userInputCheck = require('./checkUserInput');

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

// updates product by id✅
// wanted to make it to where the user input is checked 
// and based off of what the user had put, 
// then that is what would have been edited
router.put('/:id', (req, res) => {
    Products.update(
        {
            stock: req.body.stock,
        },
        {
            where: {
                id: req.params.id   
            },
        }
    )
    .then((dbProductsData) => {
        if(!dbProductsData) {
            res.status(404).json({ message: "Product with this ID is not found" });
            return;
        }
        res.json({
            message: 'product stock change successful',
            changed: req.params.id
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// deletes product by id✅
router.delete('/:id', (req, res) => {
    Products.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((dbProductsData) => {
        if (!dbProductsData) {
            res.status(500).json({ messages: 'Cannot find product to delete, please try again' });
            return;
        }
        res.json({
            deleted: req.params.id,
            rows_affected: dbProductsData
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(404).json(err);
    });
});

module.exports = router;
