import axios from "axios";

const fetch_employees = async (projectID) => {
  try {
    const response = await axios(`/employees?project_id=${projectID}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const delete_employee = async (item) => {
  try {
    await axios.delete(`/employees/${item.id}`);
    return item;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const update_employee = async (employee) => {
  try {
    const response = await axios.put(`/employees/${employee.id}`, employee);
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const add_employee = async (employee) => {
  try {
    const response = await axios.post("/employees", employee);
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export { fetch_employees, add_employee, delete_employee, update_employee };
