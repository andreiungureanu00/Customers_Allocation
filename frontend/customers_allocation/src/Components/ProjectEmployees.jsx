import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
import AddModal from "./Modals/AddModal";
import EditModal from "./Modals/EditModal";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEmployees,
  getEmployees,
  setStatus,
  deleteEmployee,
  setEditEmployee,
  setAddEmployee,
  setSortKey,
  setSortType,
  sortEmployees,
} from "../slices/employeesSlice";

import { useHistory } from "react-router-dom";

import "../styles/ProjectEmployees.css";

export default function ProjectEmployees() {
  let history = useHistory();
  const [empl, setEmpl] = useState(null);
  const employees = useSelector(getEmployees);
  const employeesStatus = useSelector((state) => state.employees.status);

  const dispatch = useDispatch();

  let { projectID } = useParams();

  const takeEmployee = (empl) => {
    setEmpl(empl);
  };

  useEffect(() => {
    dispatch(setStatus("idle"));
  }, []);

  useEffect(() => {
    if (employeesStatus === "idle") {
      dispatch(fetchEmployees(projectID));
    }
  }, [employeesStatus, dispatch]);

  return (
    <>
      <div
        className="container"
        id="return_button"
        onClick={() => history.push("/")}
      >
        <img src="https://image.flaticon.com/icons/png/512/32/32170.png"></img>
      </div>
      <div className="container">
        <div className="container">
          <h1>Employees for project with id = {projectID}</h1>
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>
                  Employee Hire Date
                  <Row className="justify-content-center">
                    <ArrowUp
                      id="sortAsc_button"
                      onClick={() => {
                        dispatch(setSortType("increasing"));
                        dispatch(setSortKey("hire_date"));
                        dispatch(sortEmployees());
                      }}
                    >
                      Sort
                    </ArrowUp>
                    <ArrowDown
                      id="sortDesc_button"
                      onClick={() => {
                        dispatch(setSortType("decreasing"));
                        dispatch(setSortKey("hire_date"));
                        dispatch(sortEmployees());
                      }}
                    ></ArrowDown>
                  </Row>
                </th>
                <th>
                  Employee Salary
                  <Row className="justify-content-center">
                    <ArrowUp
                      id="sortAsc_button"
                      onClick={() => {
                        dispatch(setSortType("increasing"));
                        dispatch(setSortKey("salary"));
                        dispatch(sortEmployees());
                      }}
                    >
                      Sort
                    </ArrowUp>
                    <ArrowDown
                      id="sortDesc_button"
                      onClick={() => {
                        dispatch(setSortType("decreasing"));
                        dispatch(setSortKey("salary"));
                        dispatch(sortEmployees());
                      }}
                    ></ArrowDown>
                  </Row>
                </th>
                <th>Employee Job Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.hire_date}</td>
                  <td>{item.salary}</td>
                  <td>{item.job_title}</td>
                  <td>
                    <Container>
                      <Row>
                        <button
                          onClick={() => {
                            dispatch(deleteEmployee(item));
                          }}
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            takeEmployee(item);
                            dispatch(setEditEmployee(true));
                          }}
                        >
                          Edit
                        </button>
                      </Row>
                    </Container>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p></p>
          <Button
            className="container"
            onClick={() => {
              dispatch(setAddEmployee(true));
            }}
          >
            Add employee
          </Button>
          <br></br>
        </div>
        <AddModal projectID={projectID} />
        {empl ? <EditModal projectID={projectID} empl={empl} /> : null}
      </div>
    </>
  );
}
