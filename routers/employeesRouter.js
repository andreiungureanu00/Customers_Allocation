const express = require("express");
const router = express.Router();
const connection = require("../config").connection;

router.get("/", (req, res) => {
  const query = "SELECT * from employees";
  connection.query(query, function (error, results, fields) {
    if (error) res.status(500).send(err);
    res.send(JSON.stringify(results));
  });
});

router.post("/", (req, res) => {
  const hire_date = new Date();
  var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  const employee = {
    name: req.body.name,
    email: req.body.email,
    hire_date: hire_date,
    salary: req.body.salary,
    job_title: req.body.job_title,
    project_id: req.body.project_id,
  };

  var valid = emailRegex.test(employee.email);
  if (!valid) res.status(500).send("Wrong email format");

  connection.query(
    "INSERT INTO employees SET ?",
    employee,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).json({
          message: "Status Server 500",
        });
      }
      res.status(200).send(JSON.stringify(employee));
    }
  );
});

module.exports = router;
