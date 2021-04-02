import { Modal, Form, Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee, setEditEmployee } from "../../slices/employeesSlice";

export default function EditModal(props) {
  const [hire_date, onChangeHireDate] = useState(new Date());
  const dispatch = useDispatch();
  const editEmployeeStatus = useSelector(
    (state) => state.employees.editEmployee
  );

  const getEmployeeData = (projectID) => {
    const employee = {
      id: props.empl.id,
      name: document.getElementById("employee_name_edit").value,
      email: document.getElementById("employee_email_edit").value,
      hire_date: hire_date,
      salary: document.getElementById("employee_salary_edit").value,
      job_title: document.getElementById("employee_job_title_edit").value,
      project_id: projectID,
    };

    return employee;
  };

  const editEmployee = (projectID) => {
    const employee = getEmployeeData(projectID);
    dispatch(updateEmployee(employee));
  };

  return (
    <div>
      <Modal
        show={editEmployeeStatus}
        onHide={() => dispatch(setEditEmployee(false))}
        dialogClassName={"primaryModal"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit an employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="employee_name_edit">
              <Form.Control
                placeholder="Enter name"
                defaultValue={props.empl.name}
              />
            </Form.Group>

            <Form.Group controlId="employee_email_edit">
              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue={props.empl.email}
              />
            </Form.Group>

            <Form.Group controlId="employee_hire_date_edit">
              <DateTimePicker onChange={onChangeHireDate} value={hire_date} />
            </Form.Group>

            <Form.Group controlId="employee_salary_edit">
              <Form.Control
                placeholder="Enter salary"
                defaultValue={props.empl.salary}
              />
            </Form.Group>

            <Form.Group controlId="employee_job_title_edit">
              <Form.Control
                placeholder="Enter job title"
                defaultValue={props.empl.job_title}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(setEditEmployee(false));
              editEmployee(props.projectID);
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
