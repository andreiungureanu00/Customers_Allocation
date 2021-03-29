const express = require("express");
const router = express.Router();
const connection = require("../config").connection;

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
  finish_date.setDate(start_date.getDate() + 7);
  const project = {
    project_name: req.body.project_name,
    start_date: start_date,
    planned_end_date: finish_date,
    description: req.body.description,
    project_code: req.body.project_code,
  };
  connection.query(
    "INSERT INTO projects SET ?",
    project,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).json({
          message: "Status Server 500",
        });
      }
      res.status(200).send(JSON.stringify(project));
    }
  );
});

module.exports = router;
