const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const projectsRouter = require("./routers/projectsRouter");
const employeesRouter = require("./routers/employeesRouter");

app.use(express.json());
app.use(
  bodyParser.json({
    extended: true,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/projects", projectsRouter);
app.use("/employees", employeesRouter);

app.listen(port, function () {
  console.log("Server is running on localhost port " + port);
});
