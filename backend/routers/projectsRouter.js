const express = require("express");
const router = express.Router();
const connection = require("../config").connection;
const Project = require("../models/Project");

router.get("/", (req, res) => {
  const query = "SELECT * from projects";
  connection.query(query, function (error, results, fields) {
    if (error) res.status(500).send(err);
    res.send(JSON.stringify(results));
  });
});

router.post("/", (req, res) => {
  const start_date = new Date();
  const finish_date = new Date();
  const query = "INSERT INTO projects SET ?";
  finish_date.setDate(start_date.getDate() + 7);

  const project = new Project(req.body);
  project.Planned_end_date = finish_date;
  project.Start_date = start_date;

  connection.query(query, project, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: "Status Server 500",
      });
    }
    console.log(results);
    project["id"] = results.insertId;
    res.status(200).send(JSON.stringify(project));
  });
});

router.put("/:id", function (req, res) {
  let id = req.params.id;
  const query = "UPDATE projects SET ? where id = ?";
  const updatedProject = req.body;
  id = parseInt(id);
  const data = [updatedProject, id];

  connection.query(query, data, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: "Status Server 500",
      });
    }
    project["id"] = results.insertId;
    res.status(200).send(JSON.stringify(project));
  });
});

router.delete("/:id", function (req, res) {
  let id = req.params.id;
  id = parseInt(id);
  const query = "Delete from projects where id = ?";
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
