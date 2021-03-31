import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
import AddModal from "./Modals/AddModal";
import EditModal from "./Modals/EditModal";

import { useHistory } from "react-router-dom";

import "../styles/ProjectEmployees.css";

export default function ProjectEmployees() {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [empl, setEmpl] = useState(null);

  let { projectID } = useParams();

  const deleteEmployee = (id) => {
    (async () => {
      await axios.delete(`/employees/${id}`);
    })();
  };

  const takeEmployee = (empl) => {
    setEmpl(empl);
  };

  useEffect(() => {
    (async () => {
      const result = await axios(`/employees?project_id=${projectID}`);
      setData(result.data);
    })();
  }, [data]);

  return (
    <>
      <div
        className="container"
        id="return_button"
        onClick={() => history.push("/projects")}
      >
        <img src="https://image.flaticon.com/icons/png/512/32/32170.png"></img>
      </div>
      <div className="container">
        <div className="container">
          <h1>Employees for project with id = {projectID}</h1>
          <table
            style={{
              borderCollapse: "collapse",
              border: "solid 2px black",
            }}
          >
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Employee Hire Date</th>
                <th>
                  Employee Salary
                  <button id="sortAsc_button">Sort</button>
                </th>
                <th>Employee Job Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
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
                            deleteEmployee(item.id);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            takeEmployee(item);
                            setEditModal(true);
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
              setAddModal(true);
            }}
          >
            Add employee
          </Button>
        </div>
        <AddModal
          projectID={projectID}
          addModal={addModal}
          setAddModal={setAddModal}
        />
        {empl ? (
          <EditModal
            projectID={projectID}
            editModal={editModal}
            setEditModal={setEditModal}
            empl={empl}
          />
        ) : null}
      </div>
    </>
  );
}
