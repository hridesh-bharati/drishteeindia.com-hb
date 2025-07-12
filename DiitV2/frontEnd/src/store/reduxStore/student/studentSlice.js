import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState:
    {
      _id: "",
      photo: "",
      name: "",
      fatherName: "",
      motherName: "",
      gender: "",
      address: "",
      mobileNumber: "",
      email: "",
      dob: "",
      course: "",
      category: "",
      admitted: "",
      gnCertificate: "",
      createdAt: "",
      updatedAt: "",
      __v: "",
      regNum: "",
    },
  reducers: {
    setProfileDetails: (state, action) => {
      return action.payload;
    },
    deleteProfileDetails: () => {
      state = {};
    },
  },
});
const examSlice = createSlice({
  name: "exams",
  initialState: {
    _id: "",
    courseName: "",
    examDate: "",
    duration: "",
    reportingTime: "",
    from: "",
    to: "",
    locked: "",
    completed: "",
    createdAt: "",
    updatedAt: "",
    __v: "",
  },
  reducers: {
    setExamData: (state, actions) => {
      return actions.payload;
    },
  },
});
const coursesSlice = createSlice({
  name:"courses",
  initialState:[],
  reducers:{
    setCourses:(state,actions)=>{
      return actions.payload;
    }
  }
})
const exmQstnsSlice = createSlice({
  name:'examPaper',
  initialState:[],
  reducers:{
    setExmQstns:(state,actions)=>{
      return actions.payload;
    }
  }
})

export const { actions:profileAction,reducer:profileReducer } = profileSlice;
export const { setProfileDetails, deleteProfileDetails } = profileAction;
export const studentProfileReducer = profileReducer;

export const { actions: eActions,reducer: eReducer } = examSlice;
export const { setExamData } = eActions;
export const examReducer = eReducer;

export const {actions: exmQstnsActions, reducer: exmQstnsReducer} = exmQstnsSlice;
export const {setExmQstns} = exmQstnsActions;
export const  paperReducer = exmQstnsReducer;

export const { actions:coursesAction, reducer: coursesReducer} = coursesSlice;
export const { setCourses} = coursesAction;
export const allCoursesReducer = coursesReducer;