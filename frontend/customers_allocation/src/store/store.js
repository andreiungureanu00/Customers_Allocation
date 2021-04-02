import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../slices/employeesSlice";

export default configureStore({
  reducer: {
    employees: employeesReducer,
  },
});
