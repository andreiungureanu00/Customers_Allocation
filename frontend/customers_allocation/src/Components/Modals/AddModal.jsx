import { Modal, Form, Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, setAddEmployee } from "../../slices/employeesSlice";

export default function AddModal(props) {
  const [hire_date, onChangeHireDate] = useState(new Date());
  const dispatch = useDispatch();
  const addEmployeeStatus = useSelector((state) => state.employees.addEmployee);

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

  const add_employee = (projectID) => {
    const employee = getEmployeeData(projectID);
    dispatch(addEmployee(employee));
  };

  return (
    <div>
      <Modal
        show={addEmployeeStatus}
        onHide={() => dispatch(setAddEmployee(false))}
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
              dispatch(setAddEmployee(false));
              add_employee(props.projectID);
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
