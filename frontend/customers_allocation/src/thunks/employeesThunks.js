import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  add_employee,
  delete_employee,
  fetch_employees,
  update_employee,
} from "../REST/employees";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (projectID) => {
    return fetch_employees(projectID);
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (item) => {
    return delete_employee(item);
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee) => {
    return add_employee(employee);
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employee) => {
    return update_employee(employee);
  }
);
