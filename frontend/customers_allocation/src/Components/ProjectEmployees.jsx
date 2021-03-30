import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default function ProjectEmployees() {
  const [data, setData] = useState([]);
  let { projectID } = useParams();

  useEffect(() => {
    (async () => {
      const result = await axios(`/employees?project_id=${projectID}`);
      console.log(result.data);
      setData(result.data);
    })();
  }, []);

  return (
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
            <th>Employee Salary</th>
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
                    <button>Delete</button>
                    <button>Edit</button>
                  </Row>
                </Container>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
