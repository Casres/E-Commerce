const router = require("express").Router();
const { Employee } = require("../../models");

// get all employees✅
router.get("/", (req, res) => {
  console.log("================================");
  Employee.findAll({
    order: [["id", "DESC"]],
    attributes: [
      "id",
      "username",
      // "password"
    ],
    // attributes: {
    //   exclude: ["password"],
    // },
  })
    .then((dbEmployeeData) => res.json(dbEmployeeData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// gets employee by id✅
router.get("/:id", (req, res) => {
  Employee.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "username"],
    // attributes: {
    //   exclude: ["password"],
    // },
  })
    .then((dbEmployeeData) => {
      if (!dbEmployeeData) {
        res.status(404).json({ message: "Employee not found" });
        return;
      }
      res.json(dbEmployeeData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// creates employee✅
router.post("/", (req, res) => {
  Employee.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbEmployeeData) => {
      res.json({
        message: `New employee named '${dbEmployeeData.username}' created`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// updates employee✅
router.put("/:id", (req, res) => {
  Employee.update(
    {
      username: req.body.username,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbEmployeeData) => {
      if (!dbEmployeeData) {
        res.status(404).json({ message: "Employee with this user not found" });
        return;
      }
      res.json({
        id: req.params.id,
        updated: req.body.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// deletes employee✅
router.delete("/", (req, res) => {
  Employee.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then((dbEmployeeData) => {
      if (!dbEmployeeData) {
        res
          .status(500)
          .json({
            message: "Employee with this ID does not exist, please try again",
          });
        return;
      }
      res.json({
        rows_affected_by_id: dbEmployeeData,
        deleted: req.body.id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
