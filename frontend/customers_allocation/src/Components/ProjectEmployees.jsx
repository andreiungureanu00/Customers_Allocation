import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
import AddModal from "./Modals/AddModal";
import EditModal from "./Modals/EditModal";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";

import { useHistory } from "react-router-dom";

import "../styles/ProjectEmployees.css";

export default function ProjectEmployees() {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [empl, setEmpl] = useState(null);
  const [sortedAscData, setSortedAscData] = useState(false);
  const [sortedDescData, setSortedDescData] = useState(false);
  const [keySort, setKeySort] = useState("");
  const [mounted, setMounted] = useState(false);

  let { projectID } = useParams();

  function SortAsc(key) {
    return function (a, b) {
      if (a[key] > b[key]) {
        return 1;
      } else if (a[key] < b[key]) {
        return -1;
      }
      return 0;
    };
  }

  function SortDesc(key) {
    return function (a, b) {
      if (b[key] > a[key]) {
        return 1;
      } else if (b[key] < a[key]) {
        return -1;
      }
      return 0;
    };
  }

  const deleteEmployee = (id) => {
    (async () => {
      const result = await axios.delete(`/employees/${id}`);
      setUpdate(true);
    })();
  };

  const takeEmployee = (empl) => {
    setEmpl(empl);
  };

  useEffect(() => {
    setUpdate(false);
    setMounted(true);
    (async () => {
      const result = await axios(`/employees?project_id=${projectID}`);
      setData(result.data);
    })();
    return () => setMounted(false);
  }, [update]);

  useEffect(() => {
    if (sortedAscData == true) {
      data.sort(SortAsc(keySort));
      setSortedAscData(false);
    } else if (sortedDescData == true) {
      data.sort(SortDesc(keySort));
      setSortedDescData(false);
    }
  }, [data, sortedAscData, sortedDescData]);

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
                <th>
                  Employee Hire Date
                  <Row className="justify-content-center">
                    <ArrowUp
                      id="sortAsc_button"
                      onClick={() => {
                        setSortedAscData(true);
                        setKeySort("hire_date");
                      }}
                    >
                      Sort
                    </ArrowUp>
                    <ArrowDown
                      id="sortDesc_button"
                      onClick={() => {
                        setSortedDescData(true);
                        setKeySort("hire_date");
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
                        setSortedAscData(true);
                        setKeySort("salary");
                      }}
                    >
                      Sort
                    </ArrowUp>
                    <ArrowDown
                      id="sortDesc_button"
                      onClick={() => {
                        setSortedDescData(true);
                        setKeySort("salary");
                      }}
                    ></ArrowDown>
                  </Row>
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
          setUpdate={setUpdate}
        />
        {empl ? (
          <EditModal
            projectID={projectID}
            editModal={editModal}
            setEditModal={setEditModal}
            empl={empl}
            setUpdate={setUpdate}
            mounted={mounted}
          />
        ) : null}
      </div>
    </>
  );
}
