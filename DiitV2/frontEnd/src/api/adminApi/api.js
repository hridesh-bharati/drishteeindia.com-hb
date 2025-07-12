const baseUrl = "http://localhost:3000/admin";
import { toast } from "react-toastify";
import { postData, putData, getData, deleteData } from "../tools/apiTools";
let aToken = localStorage.getItem("aToken");
// Admin Api
const addAdmin = async (data) => {
  return await postData(baseUrl, "/addAdmin", data);
};
const loginAdmin = async (email, password) => {
  return await postData(baseUrl, "/login", { email, password });
};
const sendOtpForRPsd = async (email) => {
  return await putData(baseUrl, '/sendOtpForRPsd', { email });
}
const verifyOtpAndUpdatePsd = async (email, tOtp, password) => {
  return await putData(baseUrl, '/verifyOtpAndUpdatePsd', { email, tOtp, password });
}
const adminProfile = async () => {
  return await getData(baseUrl, "/adminProfile", { Authorization: aToken });
};
const getAdminList = async () => {
  return await getData(baseUrl, "/getAdminList", { Authorization: aToken });
};
const deleteAdmin = async (dlAdminId) => {
  return await deleteData(baseUrl, `/deleteAdmin/${dlAdminId}`, {
    Authorization: aToken,
  });
};
// Notice Api
const pushNotice = async (title, nMessage) => {
  return await postData(
    baseUrl,
    "/pushNotice",
    { title, nMessage },
    { Authorization: aToken }
  );
};
const getAllNotice = async () => {
  return await getData(baseUrl, "/getAllNotice", { Authorization: aToken });
};
const updateNotice = async (_id, title, nMessage) => {
  return await putData(
    baseUrl,
    "/updateNotice",
    { _id, title, nMessage },
    { Authorization: aToken }
  );
};
const deleteNotice = async (noticeId) => {
  return await deleteData(baseUrl, `/deleteNotice/${noticeId}`, {
    Authorization: aToken,
  });
};
// Course API
const pushANewCourse = async (courseData) => {
  return await postData(baseUrl, "/pushANewCourse", courseData, {
    Authorization: aToken,
  });
};
const getCourseList = async () => {
  return await getData(baseUrl, "/getCourseList");
};
const deleteCourse = async (cId) => {
  return await deleteData(baseUrl, `/deleteCourse/${cId}`, {
    Authorization: aToken,
  });
};
// Student API
const getStudentList = async () => {
  return await getData(baseUrl, "/studentList", { Authorization: aToken });
};
const deleteStudentRegistrationForm = async (formId) => {
  return await deleteData(baseUrl, `/deleteStudentRegistrationForm/${formId}`, {
    Authorization: aToken,
  });
};
// for toggle student status
const toggleStudentStatus = async (student_id, activeStatus) => {
  return await putData(baseUrl, `/toggleStatus/${student_id}`, { activeStatus }, { Authorization: aToken });
}
const takeNewAdmission = async (formId, iNum) => {
  return await putData(
    baseUrl,
    `/takeNewAdmission/${formId}`,
    { iNum },
    { Authorization: aToken }
  );
};
const generateCertificate = async (_id, percentage, issueDate) => {
  return await postData(
    baseUrl,
    "/generateCertificate",
    { _id, percentage, issueDate },
    { Authorization: aToken }
  );
};
const verifyCertificate = async (regNum) => {
  return await postData(baseUrl, "/verifyCertificate", { regNum });
};
// Query API
const getAllQuery = async () => {
  return await getData(baseUrl, "/getAllQuery", { Authorization: aToken });
};
const updateQueryStatus = async (queryId) => {
  return await putData(
    baseUrl,
    "/updateQueryStatus",
    { _id: queryId },
    { Authorization: aToken }
  );
};
const deleteQuery = async (queryId) => {
  return await deleteData(baseUrl, `/deleteQuery/${queryId}`, {
    Authorization: aToken,
  });
};
// Gallery API
const pushPhoto = async (name, category, url) => {
  return await postData(
    baseUrl,
    "/pushPhoto",
    { name, category, url },
    { Authorization: aToken }
  );
};
const getPhotos = async (category) => {
  return await getData(baseUrl, `/getPhotos/${category}`);
};
const deletePhoto = async (photoId) => {
  return await deleteData(baseUrl, `/deletePhoto/${photoId}`, {
    Authorization: aToken,
  });
};
// Exam API
const issueExamForm = async (
  courseName,
  examDate,
  duration,
  reportingTime,
  from,
  to
) => {
  return await postData(
    baseUrl,
    "/issueExamForm",
    { courseName, examDate, duration, reportingTime, from, to },
    { Authorization: aToken }
  );
};
const examFormList = async (completed, course) => {
  return await getData(
    baseUrl,
    `/examFormList?completed=${completed}&course=${course}`,
    {
      Authorization: aToken,
    }
  );
};
const verifyExamForm = async (examId, formIds) => {
  return await putData(
    baseUrl,
    "/verifyExamForm",
    { examId, formIds },
    { Authorization: aToken }
  );
};
const lockExamForm = async (examIds, locked) => {
  return await putData(baseUrl, "/lockExam", { Authorization: aToken });
};
const getAllExams = async (completed, locked) => {
  return await getData(baseUrl, `/getExams/${completed}/${locked}`, {
    Authorization: aToken,
  });
};
// Question Paper API
const pushQuestionPaper = async (
  examId,
  courseName,
  date,
  maxMarks,
  totalQuestions
) => {
  return await postData(
    baseUrl,
    "/pushQuestionPaper",
    { examId, courseName, date, maxMarks, totalQuestions },
    { Authorization: aToken }
  );
};
const pushQuestions = async (data) => {
  return await putData(baseUrl, "/pushQuestions", data, {
    Authorization: aToken,
  });
};
const getQuestionPapers = async () => {
  return await getData(baseUrl, "/getQuestionPapers", {
    Authorization: aToken,
  });
};
const deleteQuestionPaper = async (paperId) => {
  return await deleteData(baseUrl, `/deleteQuestionPaper/${paperId}`, {
    Authorization: aToken,
  });
};
const getQuestions = async (paperId) => {
  return await getData(baseUrl, `/getQuestions?paperId=${paperId}`, {
    Authorization: aToken,
  });
};

export {
  // Admin  API
  addAdmin,
  loginAdmin,
  sendOtpForRPsd,
  verifyOtpAndUpdatePsd,
  adminProfile,
  getAdminList,
  deleteAdmin,
  // Notice  API
  pushNotice,
  getAllNotice,
  updateNotice,
  deleteNotice,
  // Course API
  pushANewCourse,
  getCourseList,
  deleteCourse,
  // Student API
  getStudentList,
  deleteStudentRegistrationForm,
  toggleStudentStatus,
  takeNewAdmission,
  generateCertificate,
  verifyCertificate,
  // Query API
  getAllQuery,
  updateQueryStatus,
  deleteQuery,
  // Gallery API
  pushPhoto,
  getPhotos,
  deletePhoto,
  // Exam API
  issueExamForm,
  examFormList,
  verifyExamForm,
  lockExamForm,
  getAllExams,
  // Question Papers API
  pushQuestionPaper,
  pushQuestions,
  getQuestionPapers,
  deleteQuestionPaper,
  getQuestions,
};
