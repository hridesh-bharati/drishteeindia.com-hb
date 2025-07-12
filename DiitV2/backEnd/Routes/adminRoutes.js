const router = require("express").Router();
const {
  addAdmin,
  loginAdmin,
  sendOtpForRPsd,
  verifyOtpAndUpdatePsd,
  studentList,
  pushNotice,
  getAllNotice,
  updateNotice,
  deleteNotice,
  getAllQuery,
  updateQueryStatus,
  deleteStudentRegistrationForm,
  toggleStatus,
  takeNewAdmission,
  deleteAdmin,
  getAdminList,
  pushANewCourse,
  getCourseList,
  issueExamForm,
  getExams,
  examFormList,
  verifyExamForm,
  lockExam,
  pushQuestionPaper,
  pushQuestions,
  getQuetionPaperList,
  deleteQuestionPaper,
  getQuestions,
  generateCertificate,
  verifyCertificate,
  adminProfile,
  deleteQuery,
  deleteCourse,
  pushPhoto,
  deletePhotos,
  getPhotos,
} = require("../Controller/adminController");
const requireAdminLogin = require("../Middleware/requireAdminLogin");
// Admin Routes
router.post("/addAdmin", addAdmin);
router.post("/login", loginAdmin);
router.put("/sendOtpForRPsd", sendOtpForRPsd);
router.put("/verifyOtpAndUpdatePsd", verifyOtpAndUpdatePsd);
router.get("/adminProfile", requireAdminLogin, adminProfile);
router.get("/getAdminList", requireAdminLogin, getAdminList);
router.delete("/deleteAdmin/:_id", requireAdminLogin, deleteAdmin);

//Course Routes
router.post("/pushANewCourse", requireAdminLogin, pushANewCourse);
router.get("/getCourseList", getCourseList);
router.delete("/deleteCourse/:_id", requireAdminLogin, deleteCourse);

// exam Routes

router.post("/issueExamForm", requireAdminLogin, issueExamForm);
router.get("/getExams/:completed/:locked", requireAdminLogin, getExams);
router.get("/examFormList",requireAdminLogin, examFormList);
router.put("/verifyExamForm",requireAdminLogin, verifyExamForm);
router.put("/lockExam",requireAdminLogin,lockExam);

// question Paper Routes
router.post("/pushQuestionPaper",requireAdminLogin,pushQuestionPaper);
router.put("/pushQuestions",requireAdminLogin,pushQuestions);
router.get("/getQuestionPapers",requireAdminLogin,getQuetionPaperList);
router.delete("/deleteQuestionPaper/:_id",requireAdminLogin,deleteQuestionPaper);
router.get("/getQuestions",requireAdminLogin,getQuestions);

// Student Routes
router.get("/studentList", requireAdminLogin, studentList);
router.put("/takeNewAdmission/:_id", requireAdminLogin, takeNewAdmission);
router.delete(
  "/deleteStudentRegistrationForm/:_id",
  requireAdminLogin,
  deleteStudentRegistrationForm
);
// for active deactive student
router.put("/toggleStatus/:student_id", requireAdminLogin, toggleStatus);

// Certificate Routes
router.post("/generateCertificate", requireAdminLogin, generateCertificate);
router.post("/verifyCertificate", verifyCertificate);

// Notice Routes
router.post("/pushNotice", requireAdminLogin, pushNotice);
router.get("/getAllNotice", getAllNotice);
router.put("/updateNotice", requireAdminLogin, updateNotice);
router.delete("/deleteNotice/:_id", requireAdminLogin, deleteNotice);

// Query Routes
router.get("/getAllQuery", requireAdminLogin, getAllQuery);
router.put("/updateQueryStatus", requireAdminLogin, updateQueryStatus);
router.delete("/deleteQuery/:_id", requireAdminLogin, deleteQuery);
// Gallery Routes
router.post("/pushPhoto", requireAdminLogin, pushPhoto);
router.get("/getPhotos/:category", getPhotos);
router.delete("/deletePhoto/:_id", requireAdminLogin, deletePhotos);
module.exports = router;
