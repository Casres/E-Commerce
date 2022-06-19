const router = require("express").Router();
const { Tags, Products, ProductTag } = require("../../models");
// const userInputCheck = require('./checkUserInput');

// gets all Tags✅
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
        // include: [{
        //   model: ProductTag,
        //   attributes: ['product_id', 'tag_id']
        // }],
      },
    ],
  })
    .then((dbTagsData) => res.json(dbTagsData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// gets product by id✅
router.get("/:id", (req, res) => {
  Tags.findOne({
    where: {
        id: req.params.id,
    },
    attributes: ['id', 'tag_name'],
    include: [
        {
            model: Products,
            attributes: [
                'id',
                'product_name',
                'price',
                'stock',
                'category_id'
            ],
            // include: [{
            //     model: ProductTag,
            //     attributes: ['product_id', 'tag_id']
            // }]
        }
    ]
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

// creates Tags✅
router.post("/", (req, res) => {
  Tags.create({
    tag_name: req.body.tag_name
  })
    .then((dbTagsData) => res.json(dbTagsData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// updates product by id✅
router.put("/:id", (req, res) => {
  Tags.update(
    {
        tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbTagsData) => {
      if (!dbTagsData) {
        res.status(404).json({ message: "Tag with this ID is not found" });
        return;
      }
      res.json({
        message: "Tag change successful",
        changed: req.params.id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// deletes product by id✅
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
            messages: "Cannot find tag to delete, please try again",
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
