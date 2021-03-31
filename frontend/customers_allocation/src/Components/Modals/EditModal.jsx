import { Modal, Form, Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import React, { useState } from "react";

export default function EditModal(props) {
  const [hire_date, onChangeHireDate] = useState(new Date());

  const editEmployee = (projectID) => {
    const employee = props.empl;
    employee.hire_date = hire_date;
    employee.project_id = projectID;
    (async () => {
      try {
        const resp = await axios.put(`/employees/${props.empl.id}`, employee);
        console.log(resp.data);
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <div>
      <Modal
        show={props.editModal}
        onHide={() => props.setEditModal(false)}
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
                value={props.empl.name}
                onChange={() =>
                  (props.empl.name = document.getElementById(
                    "employee_name_edit"
                  ).value)
                }
              />
            </Form.Group>

            <Form.Group controlId="employee_email_edit">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={props.empl.email}
                onChange={() =>
                  (props.empl.email = document.getElementById(
                    "employee_email_edit"
                  ).value)
                }
              />
            </Form.Group>

            <Form.Group controlId="employee_hire_date_edit">
              <DateTimePicker onChange={onChangeHireDate} value={hire_date} />
            </Form.Group>

            <Form.Group controlId="employee_salary_edit">
              <Form.Control
                placeholder="Enter salary"
                value={props.empl.salary}
                onChange={() =>
                  (props.empl.salary = document.getElementById(
                    "employee_salary_edit"
                  ).value)
                }
              />
            </Form.Group>

            <Form.Group controlId="employee_job_title_edit">
              <Form.Control
                placeholder="Enter job title"
                value={props.empl.job_title}
                onChange={() =>
                  (props.empl.job_title = document.getElementById(
                    "employee_job_title_edit"
                  ).value)
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              props.setEditModal(false);
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
