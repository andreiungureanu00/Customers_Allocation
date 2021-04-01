import { Modal, Form, Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function AddModal(props) {
  const [hire_date, onChangeHireDate] = useState(new Date());

  const getEmployeeData = (projectID) => {
    const employee = {
      name: document.getElementById("employee_name").value,
      email: document.getElementById("employee_email").value,
      hire_date: hire_date,
      salary: document.getElementById("employee_salary").value,
      job_title: document.getElementById("employee_job_title").value,
      project_id: projectID,
    };

    return employee;
  };

  const addEmployee = (projectID) => {
    const employee = getEmployeeData(projectID);
    (async () => {
      try {
        const resp = await axios.post("/employees", employee);
        props.setUpdate(true);
        console.log(resp.data);
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <div>
      <Modal
        show={props.addModal}
        onHide={() => props.setAddModal(false)}
        dialogClassName={"primaryModal"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add an employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="employee_name">
              <Form.Control placeholder="Enter name" />
            </Form.Group>

            <Form.Group controlId="employee_email">
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="employee_hire_date">
              <DateTimePicker onChange={onChangeHireDate} value={hire_date} />
            </Form.Group>

            <Form.Group controlId="employee_salary">
              <Form.Control placeholder="Enter salary" />
            </Form.Group>

            <Form.Group controlId="employee_job_title">
              <Form.Control placeholder="Enter job title" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              props.setAddModal(false);
              addEmployee(props.projectID);
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
