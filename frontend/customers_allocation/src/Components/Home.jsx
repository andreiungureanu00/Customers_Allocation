import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);
  let history = useHistory();

  const viewEmployees = (projectID) => {
    setClicked(true);
    history.push(`/projectEmployees/${projectID}`);
  };

  useEffect(() => {
    (async () => {
      const result = await axios("/projects");
      console.log(result.data);
      setData(result.data);
    })();
  }, []);

  return (
    <div className="container">
      <h1>Projects</h1>
      <table
        style={{
          borderCollapse: "collapse",
          border: "solid 2px black",
        }}
      >
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Project Start Date</th>
            <th>Planned Project End Date</th>
            <th>Description</th>
            <th>Project Code</th>
            <th>Employees</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.project_name}</td>
              <td>{item.start_date}</td>
              <td>{item.planned_end_date}</td>
              <td>{item.description}</td>
              <td>{item.project_code}</td>
              <td>
                <button onClick={() => viewEmployees(item.id)}>
                  View employees
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
