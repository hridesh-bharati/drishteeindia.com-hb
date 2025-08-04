const { student, enquiry } = require("../Model/student");
const { course, exam, questionPaper, otp } = require("../Model/admin");
const { getTodayDate, generateOtp, getHtmlEmailpage, sendMail } = require("../tools/tools");
const ErrorHandler = require("../tools/errorHandler");
const catchAsyncError = require("../Middleware/catchAsyncError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWTKEYS = process.env.JWTKEYS;
const Course = course;
const studentRegistration = catchAsyncError(async (req, res, next) => {
  const {
    center,
    photo,
    name,
    fatherName,
    motherName,
    gender,
    address,
    mobileNumber,
    email,
    aadhaar,
    dob,
    course,
    category,
  } = req.body;
  if (
    !center ||
    !photo ||
    !name ||
    !fatherName ||
    !motherName ||
    !gender ||
    !address ||
    !mobileNumber ||
    !email ||
    !aadhaar ||
    !dob ||
    !course ||
    !category
  ) {
    return next(new ErrorHandler(400, "Please fill all details"));
  } else if (center !== 'nichlaul' && center !== 'thoothibari') {
    return next(new ErrorHandler(400, "Please Choose Valid Branch"));
  }
  else {
    const studentData = new student({
      center,
      photo,
      name,
      fatherName,
      motherName,
      gender,
      address,
      mobileNumber,
      email,
      aadhaar,
      dob,
      course,
      category,
    });
    await Course.findOne({ name: course })
      .then(async (crs) => {
        if (!crs) {
          return next(new ErrorHandler(404, "Course Does Not Found"));
        } else {
          await studentData
            .save()
            .then(() => {
              res.json({ ackbool: 1, message: "Registration Succussfull" });
            })
            .catch((error) => {
              console.log(error);
              return next(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        return next(error);
      });
  }
});

const sendOtpForRPsd = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorHandler(400, "please enter email id"));
  }
  const adDtl = await student.findOne({ email: email }, { email: 1 });
  if (adDtl == null) {
    return next(new ErrorHandler(404, "Enter Valid Credential"));
  }
  const otpValue = await generateOtp();
  const message = getHtmlEmailpage(otpValue);
  setOtp = new otp({
    email: adDtl.email,
    otp: otpValue,
    user: "student",
  });
  await setOtp.save();
  await sendMail(email, "Do not Share Otp", message)
    .then((result) => {
      if (result) {
        return res
          .status(200)
          .json({ ackbool: 1, message: "Otp Sent to the register email" });
      } else {
        return next(new ErrorHandler(500, "Please Try again later"));
      }
    })
    .catch((err) => {
      return next(new ErrorHandler(500, "Failed to send E-mail"));
    });
});
const verifyOtpAndUpdatePsd = catchAsyncError(async (req, res, next) => {
  const { email, tOtp, password } = req.body;
  if (!email || !tOtp || !password) {
    return next(new ErrorHandler(400, "Please enter valid otp and password"));
  }
  const ack = await otp.findOne({ email: email, otp: tOtp, user: "student" });
  if (ack == null) {
    return next(new ErrorHandler(401, "Invalid Otp"));
  }
  bcrypt
    .hash(password, 9)
    .then(async (hsPsd) => {
      const sDtls = await student.findOneAndUpdate(
        { email: email },
        { $set: { password: hsPsd } }
      );
      if (sDtls) {
        return res
          .status(201)
          .json({ ackbool: 1, message: "Password Change Succussfully" });
      }
      return next(new ErrorHandler(400, "Bad Request"));
    })
    .catch((error) => {
      return next(new ErrorHandler(500, error));
    });
});

const sendQuery = catchAsyncError(async (req, res, next) => {
  const { fullName, mobile, email, title, query } = req.body;
  if (!fullName || !mobile || !email || !title || !query) {
    return next(new ErrorHandler(400, "Please fill all the field"));
  } else {
    const queryData = new enquiry({
      fullName,
      mobile,
      email,
      title,
      query,
    });
    await queryData
      .save()
      .then(() => {
        res.json({ ackbool: 1, message: "Query Submitted" });
      })
      .catch((error) => {
        return next(error);
      });
  }
});
const loginController = catchAsyncError(async (req, res, next) => {
  const { regNum, password } = req.body;
  if (!regNum || !password) {
    return next(new ErrorHandler(400, "Please fill all the field"));
  } else {
    await student
      .findOne({ regNum: regNum }, { password: 1, _id: 1, activeStatus:1 })
      .then(async (data) => {
        if (data) {
          if(!data.activeStatus) return res.status(200).json({ackbool:0, message:"Your account is Deavtivated Please Contact to the Admin"});
          console.log(data.activeStatus)
          bcrypt
            .compare(password, data.password)
            .then(async (result) => {
              if (result) {
                const sToken = await jwt.sign({ _id: data._id }, JWTKEYS);
                return res.status(200).json({ ackbool: 1, token: sToken });
              } else {
                return next(
                  new ErrorHandler(
                    401,
                    "Please Enter Valid Registration Number and Password"
                  )
                );
              }
            })
            .catch((error) => {
              console.log(error);
              return next(error);
            });
        } else {
          return next(
            new ErrorHandler(
              401,
              "Please Enter Valid Registration Number and Password"
            )
          );
        }
      });
  }
});
const saveProfilePhotoUrl = catchAsyncError(async (req, res, next) => {
  console.log(req.file)
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded or file is too large!' });
  }
  const rspns = await student.updateOne({ _id: req.user._id }, { $set: { photo: req.file.path } });
  if (rspns) {
    return res.status(200).json({ message: 'Photo uploaded successfully!', filePath: req.file.path });
  }
  return next(new ErrorHandler(500, 'Some Error Occured'))
})
const getProfile = catchAsyncError(async (req, res, next) => {
  return res.status(200).json({ ackbool: 1, message: req.user });
});
const getExams = catchAsyncError(async (req, res, next) => {
  const { completed, locked } = req.body;
  const filter = {
    completed: completed,
    locked: locked,
  };
  const query = {};
  for (const key in filter) {
    if (
      filter[key] !== undefined &&
      filter[key] !== null &&
      filter[key] !== ""
    ) {
      query[key] = filter[key];
    }
    query["courseName"] = req.user.course;
  }
  await exam
    .findOne(query, { paper: 0, students: 0 })
    .then((data) => {
      if (data) {
        return res.status(200).json({ ackbool: 1, message: data });
      } else {
        return next(
          new ErrorHandler(404, "Currently exan Records not available")
        );
      }
    })
    .catch((error) => {
      return next(error);
    });
});
const fillExamForm = catchAsyncError(async (req, res, next) => {
  const { examId } = req.body;
  if (
    examId === undefined ||
    examId === true ||
    examId === false ||
    examId === null ||
    examId === ""
  ) {
    return next(
      new ErrorHandler(400, "Please accept the rules and regulation")
    );
  } else {
    const _id = req.user._id;

    const stExmForm = await exam.findOne({
      _id: examId,
      "students.id": { $in: _id },
    });
    if (stExmForm) {
      return res.status(409).json({
        ackbool: 0,
        message:
          "You don't need to Submit again your exam form Already Submitted",
        mError: "Your For Submitted Already",
      });
    }
    await exam
      .findOneAndUpdate(
        { _id: examId, courseName: req.user.course },
        {
          $addToSet: {
            students: {
              id: _id,
              regNum: req.user.regNum,
              name: req.user.name,
              photo: req.user.photo,
            },
          },
        }
      )
      .then(async (data) => {
        if (data.courseName) {
          return res
            .status(201)
            .json({ ackbool: 1, message: "Exam Form Submitted Succussefully" });
        } else {
          return next(new ErrorHandler(400, "Bad request"));
        }
      })
      .catch((error) => {
        return next(error);
      });
  }
});
const startExam = catchAsyncError(async (req, res, next) => {
  const { start } = req.body;
  if (!start) {
    next(new ErrorHandler(400, "Please Tick the Accept Button To start Exam"));
  }

  const currentDate = getTodayDate();
  const examDtls = await exam.findOne({ "students.id": req.user._id });
  let examDate = new Date(examDtls.examDate);
  const from = new Date(examDtls.from);
  const to = new Date(examDtls.to);
  const now = new Date();
  if (!examDtls.paper) {
    return next(new ErrorHandler(404, "Question Paper Not Available"));
  }
  if (currentDate.getTime() < examDate.getTime()) {
    return next(
      new ErrorHandler(400, `exam will be on ${examDate.toLocaleDateString()} `)
    );
  } else if (currentDate.getTime() == examDate.getTime()) {
    if (now.getTime() <= from.getTime()) {
      return next(
        new ErrorHandler(
          200,
          `wait your Exam will be Start on ${from.toLocaleTimeString()}`
        )
      );
    } else if (
      now.getTime() >= from.getTime() &&
      now.getTime() <= to.getTime()
    ) {
      const questions = await questionPaper.aggregate([
        { $match: { _id: examDtls.paper } },
        {
          $project: {
            _id: 0,
            questions: {
              $map: {
                input: "$questions",
                as: "question",
                in: {
                  question: "$$question.question",
                  options: "$$question.options",
                  _id: "$$question._id",
                },
              },
            },
          },
        },
      ]);

      return res
        .status(200)
        .json({
          ackbool: 1,
          message: { questions: questions[0].questions, examId: examDtls._id },
        });
    } else if (now.getTime() >= to.getTime()) {
      return next(new ErrorHandler(400, "Exam Session Timeout"));
    } else {
      return next(new ErrorHandler(500, `Report to admin error Occured`));
    }
  } else if (currentDate.getTime() > examDate.getTime()) {
    return next(
      new ErrorHandler(
        400,
        `Exam Portal Has Been Closed exam Was on ${examDate.toLocaleDateString()}`
      )
    );
  } else {
    return next(new ErrorHandler(500, `Report This Error To admin `));
  }
});
const submitAnswer = catchAsyncError(async (req, res, next) => {
  const { examId, answers } = req.body;
  const examDtls = await exam.findOne(
    {
      _id: examId,
      students: { $elemMatch: { id: req.user._id } },
    },
    { paper: 1, _id: 0 }
  );
  if (examDtls == null) {
    return next(
      new ErrorHandler(404, "Exam Not exist according to the exam Id")
    );
  }
  const paperDtls = await questionPaper.findById(examDtls.paper);

  if (!paperDtls) {
    return next(new ErrorHandler(404, "Question paper not found"));
  }

  // Check if the student has already submitted responses
  const existingResponseIndex = paperDtls.studentsRspns.findIndex(
    (rspn) => rspn.regNum === req.user.regNum
  );

  if (existingResponseIndex !== -1) {
    // Update existing responses
    return next(new ErrorHandler(400, "Already Submitted"));
  } else {
    // Add new responses
    const ack = await questionPaper.findByIdAndUpdate(examDtls.paper, {
      $push: {
        studentsRspns: {
          regNum: req.user.regNum,
          rspns: answers,
        },
      },
    });
    await exam.findOneAndUpdate(
      { _id: examId, students: { $elemMatch: { id: req.user._id } } },
      { $set: { "students.$.tested": true } }
    );
    return res
      .status(200)
      .json({ ackbool: 1, message: "Responses submitted successfully" });
  }

  // Save the updated question paper
});
module.exports = {
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
  submitAnswer,
};
