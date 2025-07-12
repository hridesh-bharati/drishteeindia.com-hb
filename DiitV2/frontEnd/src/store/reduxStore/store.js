import { configureStore } from "@reduxjs/toolkit";
import {
  examReducer,
  studentProfileReducer,
  paperReducer,
  allCoursesReducer
} from "./student/studentSlice";
export const store = configureStore({
  reducer: {
    studentProfileDetails: studentProfileReducer,
    examDetails: examReducer,
    exmQstns: paperReducer,
    courses:allCoursesReducer
  },
});
