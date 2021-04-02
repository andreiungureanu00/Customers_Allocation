import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  employees: [],
  status: "idle",
  error: null,
  editEmployee: false,
  addEmployee: false,
  sortKey: null,
  sortType: null,
};

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

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (projectID) => {
    const response = await axios(`/employees?project_id=${projectID}`);
    console.log("fetched");
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (item) => {
    const response = await axios.delete(`/employees/${item.id}`);
    return response.data;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee) => {
    try {
      const response = await axios.post("/employees", employee);
      return response.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employee) => {
    try {
      const response = await axios.put(`/employees/${employee.id}`, employee);
      return response.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
);

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
      const elementIndex = state.employees.indexOf(action.payload);
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
