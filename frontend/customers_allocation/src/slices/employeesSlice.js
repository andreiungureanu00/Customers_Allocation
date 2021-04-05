import { createSlice } from "@reduxjs/toolkit";
import { SortAsc, SortDesc } from "./sort";

import {
  addEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../thunks/employeesThunks";

const initialState = {
  employees: [],
  status: "idle",
  error: null,
  editEmployee: false,
  addEmployee: false,
  sortKey: null,
  sortType: null,
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },

    setEditEmployee: (state, action) => {
      state.editEmployee = action.payload;
    },

    setAddEmployee: (state, action) => {
      state.addEmployee = action.payload;
    },

    setSortKey: (state, action) => {
      state.sortKey = action.payload;
    },

    setSortType: (state, action) => {
      state.sortType = action.payload;
    },

    sortEmployees: (state, action) => {
      if (state.sortType === "increasing") {
        state.employees.sort(SortAsc(state.sortKey));
      } else if (state.sortType === "decreasing") {
        state.employees.sort(SortDesc(state.sortKey));
      }
      state.sortType = null;
    },
  },

  extraReducers: {
    [fetchEmployees.pending]: (state, action) => {
      state.status = "loading";
    },

    [fetchEmployees.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.employees = action.payload;
    },

    [fetchEmployees.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [deleteEmployee.fulfilled]: (state, action) => {
      let elementIndex;
      const toDeleteEmployee = action.payload;
      console.log(toDeleteEmployee);
      for (let i = 0; i < state.employees.length; i++) {
        if (
          state.employees[i].id === toDeleteEmployee.id &&
          state.employees[i].project_id === toDeleteEmployee.project_id
        ) {
          elementIndex = i;
          break;
        }
      }
      state.employees.splice(elementIndex, 1);
    },

    [addEmployee.fulfilled]: (state, action) => {
      state.employees.push(action.payload);
    },

    [updateEmployee.fulfilled]: (state, action) => {
      const updatedEmployee = action.payload;
      let existingEmployee = state.employees.find(
        (employee) => employee.id === updatedEmployee.id
      );

      if (existingEmployee) {
        Object.assign(existingEmployee, updatedEmployee);
      }
    },
  },
});

export const {
  setStatus,
  setAddEmployee,
  setEditEmployee,
  setSortKey,
  setSortType,
  sortEmployees,
} = employeesSlice.actions;

export const getEmployees = (state) => state.employees.employees;

export default employeesSlice.reducer;
