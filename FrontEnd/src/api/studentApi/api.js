const baseUrl = "http://localhost:3000";
import { getData, postData, putData } from "../tools/apiTools";

const sendQuery = async (data) => {
  return await postData(baseUrl, "/queryNow", data);
};

const registrateStudent = async (data) => {
  return await postData(baseUrl, "/studentRegistration", { ...data });
};
const sendOtpForRPsd = async (email) => {
  return await putData(baseUrl, '/sendOtpForRPsd', { email });
}
const verifyOtpAndUpdatePsd = async (email, tOtp, password) => {
  return await putData(baseUrl, '/verifyOtpAndUpdatePsd', { email, tOtp, password });
}
const loginStudent = async (regNum, password) => {
  return await postData(baseUrl, "/login", { regNum, password },);
};
const getProfile = async () => {
  const sToken = localStorage.getItem("sToken");
  return await getData(baseUrl, "/getProfile", { Authorization: sToken });
}

const getExams = async (completed, locked) => {
  const sToken = localStorage.getItem("sToken");
  return await postData(
    baseUrl,
    "/getExams",
    { completed, locked },
    { Authorization: sToken }
  );
};
const fillExamForm = async (applied, examId) => {
  const sToken = localStorage.getItem("sToken");
  return await postData(
    baseUrl,
    "/fillExamForm",
    { applied, examId },
    { Authorization: sToken }
  );
};
const startExam = async (start) => {
  const sToken = localStorage.getItem("sToken");
  return await postData(
    baseUrl,
    "/startExam",
    { start },
    { Authorization: sToken }
  );
};
const submitAnswer = async (examId, answers) => {
  const sToken = localStorage.getItem("sToken");
  return postData(
    baseUrl,
    "/submitAnswer",
    { examId, answers },
    { Authorization: sToken }
  );
};
const uploadPhoto = async (image) => {
  if (image) {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "hridesh99!")
    data.append("cloud_name", "draowpiml")
    var rspns = await fetch('https://api.cloudinary.com/v1_1/draowpiml/image/upload',
      { method: 'post', body: data });
    rspns = await rspns.json();
    if (rspns.url) {
      return rspns;
    }
    else {
      toast.error('failed to image upload')
    }
  }
}
export {
  sendQuery,
  registrateStudent,
  sendOtpForRPsd,
  verifyOtpAndUpdatePsd,
  loginStudent,
  uploadPhoto,
  getProfile,
  getExams,
  fillExamForm,
  startExam,
  submitAnswer,
};
