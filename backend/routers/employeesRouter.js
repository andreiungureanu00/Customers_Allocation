const express = require("express");
const router = express.Router();
const connection = require("../config").connection;
const EmployeeModel = require("../models/Employee");

router.get("/", (req, res) => {
  if (!req.query.project_id) {
    const query = "SELECT * from employees";
    connection.query(query, function (error, results, fields) {
      if (error) res.status(500).send(err);
      res.status(200).send(JSON.stringify(results));
    });
  }
  const projectID = parseInt(req.query.project_id);
  if (Number.isInteger(projectID) === true) {
    const query = "SELECT * from employees where project_id = ?";
    connection.query(query, projectID, function (error, results, fields) {
      if (error) res.status(500).send(err);
      res.status(200).send(JSON.stringify(results));
    });
  } else {
    res
      .status(400)
      .send("Incompatible projectID format. Please provide a number");
  }
});

router.post("/", (req, res) => {
  var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const query = "INSERT INTO employees SET ?";

  const employee = new EmployeeModel.EmployeePostBody(req.body);
  employee.Hire_date = new Date(employee.Hire_date);

  var valid = emailRegex.test(employee.email);
  if (!valid) res.status(500).send("Wrong email format");

  connection.query(query, employee, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: "Status Server 500",
      });
    }
    res.status(200).send(JSON.stringify(results));
  });
});

router.put("/:id", function (req, res) {
  let id = req.params.id;
  const query = "UPDATE employees SET ? where id = ?";
  const updatedEmployee = req.body;
  id = parseInt(id);
  const data = [updatedEmployee, id];

  updatedEmployee.hire_date = new Date(updatedEmployee.hire_date);

  connection.query(query, data, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: "Status Server 500",
      });
    }
    res.status(200).send(JSON.stringify(results));
  });
});

router.delete("/:id", function (req, res) {
  let id = req.params.id;
  id = parseInt(id);
  const query = "Delete from employees where id = ?";
  connection.query(query, id, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: "Status Server 500",
      });
    }
    res.status(200).send(JSON.stringify(results));
  });
});

module.exports = router;
