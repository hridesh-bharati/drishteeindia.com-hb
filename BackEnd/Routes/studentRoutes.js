const router = require("express").Router();
const {
  studentRegistration,
  sendOtpForRPsd,
  verifyOtpAndUpdatePsd,
  sendQuery,
  loginController,
  saveProfilePhotoUrl,
  getProfile,
  getExams,
  fillExamForm,
  startExam,
  submitAnswer
} = require("../Controller/studentController");
const requireStudentLogin = require("../Middleware/requireStudentLogin");
const { upload } = require("../tools/tools");
router.post("/studentRegistration", studentRegistration);
router.put("/sendOtpForRPsd", sendOtpForRPsd);
router.put("/verifyOtpAndUpdatePsd", verifyOtpAndUpdatePsd);
router.post("/queryNow", sendQuery);
router.post("/login", loginController);
router.post('/uploadProfilePhoto',requireStudentLogin,upload.single('photo'),saveProfilePhotoUrl);
router.get("/getProfile",requireStudentLogin,getProfile);
router.post("/getExams", requireStudentLogin, getExams);
router.post("/fillExamForm", requireStudentLogin, fillExamForm);
router.post("/startExam", requireStudentLogin, startExam);
router.post("/submitAnswer",requireStudentLogin,submitAnswer);

module.exports = router;
