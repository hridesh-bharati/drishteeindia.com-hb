const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTKEYS = process.env.JWTKEYS;

const {
  notice,
  admin,
  course,
  exam,
  gallery,
  questionPaper,
  otp,
} = require("../Model/admin");
const { student, enquiry, certificate } = require("../Model/student");
const {
  sendMail,
  passwordGenerator,
  generateOtp,
  getHtmlEmailpage,
} = require("../tools/tools");
const ErrorHandler = require("../tools/errorHandler");
const catchAsyncError = require("../Middleware/catchAsyncError");
const { default: mongoose } = require("mongoose");
// Student Controller
const studentList = catchAsyncError(async (req, res, next) => {
  const { name, regNum } = req.body;
  const query = {};
  if (name !== undefined && name !== null && name !== "") {
    query.name = { $regex: new RegExp(name, "i") };
  }
  if (regNum !== undefined && regNum !== null && regNum !== "") {
    query.regNum = regNum;
  }
  student.find(query).then((result) => {
    res.json({ ackbool: 1, message: result });
  });
});
const takeNewAdmission = catchAsyncError(async (req, res, next) => {
  const _id = req.params._id;
  const iNum = req.body.iNum;
  if (!_id || !iNum) {
    console.log(_id + "  " + iNum);
    return next(
      new ErrorHandler(400, "Student Id and Student Index No. is Required")
    );
  } else {
    await student
      .findById(_id)
      .then((result) => {
        if (result == null) {
          return next(
            new ErrorHandler(404, "Student Registration Form Does Not Exist")
          );
        } else {
          if (result.admitted === true) {
            return next(
              new ErrorHandler(
                200,
                "You Have been Already Taken This Student Admission"
              )
            );
          } else {
            let regNum = iNum;
            let psw = passwordGenerator(6);
            bcrypt
              .hash(psw, 9)
              .then((password) => {
                student
                  .findByIdAndUpdate(
                    _id,
                    {
                      $set: {
                        admitted: true,
                        regNum: regNum,
                        password: password,
                      },
                    },
                    { new: true }
                  )
                  .then(async (data) => {
                    const title = `New User Admission: DIIT`;
                    const message = `
                    <div style="background-color: #e0f7fa; padding: 20px; border-radius: 8px;">
                        <p>Dear ${data.name},</p>
                        <p>Welcome to the Drishtee Institute of Information Technology (DIIT). <br />
                        Here are your login details:</p>
                        <p>Registration Number : &nbsp; ${data.regNum} <br />
                         Password :&nbsp; ${psw}</p>
                        <p>Feel free to reach out if you have any questions. We wish you a successful journey with us!</p>
                        </div>
                `;

                    await sendMail(data.email, title, message)
                      .then((result) => {
                        if (result) {
                          return res.status(201).json({
                            message:
                              "Student Admitted and Id Password sent Their email",
                          });
                        } else {
                          return next(
                            new ErrorHandler(
                              500,
                              "Student Admission success but Some Internal Error occured while sending Email"
                            )
                          );
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                        return next(
                          new ErrorHandler(
                            500,
                            "Student Admission success but Some Internal Error occured while sending Email"
                          )
                        );
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    return next(error);
                  });
              })
              .catch((error) => {
                return next(error);
              });
          }
        }
      })
      .catch((error) => {
        return res.json({
          message: "Student Registration Form Does Not Exist",
          mError: error,
        });
      });
  }
});

const deleteStudentRegistrationForm = catchAsyncError(
  async (req, res, next) => {
    const _id = req.params._id;
    if (!_id) {
      return next(new ErrorHandler(400, "please select the student"));
    } else {
      await student
        .findOneAndDelete({ _id: _id, admitted: false })
        .then((result) => {
          if (result == null) {
            return next(
              new ErrorHandler(
                400,
                "Student Registration Form Does Not Exist Or You have been taken Student Admission"
              )
            );
          } else {
            return res.json({ ackbool: 1, message: "Deleted" });
          }
        })
        .catch((error) => {
          return next(error);
        });
    }
  }
);
//for toggle status
const toggleStatus = catchAsyncError(async(req, res, next)=>{
  let {student_id} = req.params;
  let {activeStatus} = req.body;
  if(!student_id) return res.status(400).json({ackbool:0, message:"Please Select Valid Student"});
    // Convert string to boolean if needed
  if (typeof activeStatus === "string") {
    activeStatus = activeStatus === "true";
  }
  student_id = new mongoose.Types.ObjectId(student_id);
  const data = await student.findByIdAndUpdate(student_id,{
    $set:{
      activeStatus:activeStatus
    }
  },{$new:true});
  if(!data._id)return res.status(400).json({ackbool:0, message:"Some Error Occured"});
  return res.status(200).json({
  ackbool: 1,
  message: activeStatus? "Activated" : "Deactivated"
});
})
// Student Certificate Controllers
const generateCertificate = catchAsyncError(async (req, res, next) => {
  const { _id, percentage, issueDate } = req.body;
  if (!_id || !percentage || !issueDate) {
    return next(
      new ErrorHandler(400, "Student Id and Percentage boath are Required")
    );
  } else {
    const data = await student
      .findOne({ _id: _id, admitted: true })
      .select("regNum");
    if (data == null) {
      return next(new ErrorHandler(404, "Please select valid student"));
    } else {
      const newCertificate = new certificate({
        student: _id,
        completationDate: issueDate,
        percentage: percentage,
        regNum: data.regNum,
      });
      await newCertificate
        .save()
        .then(async (data) => {
          await student.findByIdAndUpdate(_id, { gnCertificate: "1" });
          return res.status(200).json({
            ackbool: 1,
            message: "Certificate Generated Successfully",
          });
        })
        .catch((error) => {
          return next(error);
        });
    }
  }
});
const verifyCertificate = catchAsyncError(async (req, res, next) => {
  const { regNum } = req.body;
  if (!regNum) {
    return next(new ErrorHandler(400, "Registration Number is required"));
  }
  await certificate
    .findOne({ regNum: regNum })
    .populate("student")
    .then(async (data) => {
      if (!data) {
        return next(new ErrorHandler(404, "Certificate Not issued Yet"));
      }
      var details = {
        name: data.student.name,
        photo: data.student.photo,
        fatherName: data.student.fatherName,
        regNum: data.student.regNum,
        completationDate: data.completationDate,
        percentage: data.percentage,
        course: data.student.course,
      };
      await course
        .findOne({ name: details.course })
        .then((crs) => {
          if (!crs) {
            return next(new ErrorHandler(404, "Course not found"));
          } else {
            details.description = crs.description;
            details.duration = crs.duration;
            details.subjects = [crs.subjects];
            return res.status(200).json({ ackbool: 1, message: details });
          }
        })
        .catch((error) => {
          return next(error);
        });
    });
});

// Admin Controller
const addAdmin = catchAsyncError(async (req, res, next) => {
  const {
    name,
    email,
    profilePic,
    dob,
    mobileNumber,
    address,
    profession,
    about,
    aadhaarNumber,
    password,
  } = req.body;
  if (
    !name ||
    !email ||
    !profilePic ||
    !dob ||
    !mobileNumber ||
    !address ||
    !profession ||
    !about ||
    !aadhaarNumber ||
    !password
  ) {
    return next(new ErrorHandler(400, "Please Add All Fields"));
  } else {
    bcrypt
      .hash(password, 9)
      .then(async (hashedPassword) => {
        const adminData = new admin({
          name,
          email,
          profilePic,
          dob,
          mobileNumber,
          address,
          profession,
          about,
          aadhaarNumber,
          password: hashedPassword,
        });
        await adminData
          .save()
          .then((data) => {
            return res.json({ ackbool: 1, message: "Account Created" });
          })
          .catch((error) => {
            return next(error);
          });
      })
      .catch((error) => {
        return next(error);
      });
  }
});
const loginAdmin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorHandler(400, "Please fill the email and password field")
    );
  } else {
    const adminData = await admin.findOne({ email });
    if (adminData) {
      bcrypt
        .compare(password, adminData.password)
        .then((result) => {
          if (result) {
            const token = jwt.sign({ _id: adminData._id }, JWTKEYS);
            const { _id, name, email, profilePic, dob, mobileNumber } =
              adminData;
            return res.json({
              ackbool: 1,
              message: { _id, name, email, profilePic, dob, mobileNumber },
              token: token,
            });
          } else {
            return next(
              new ErrorHandler(401, "Please Enter Valid userName and password")
            );
          }
        })
        .catch((error) => {
          return next(
            new ErrorHandler(401, "Please Enter Valid userName and password")
          );
        });
    } else {
      return next(new ErrorHandler(401, "Please Enter Valid Email"));
    }
  }
});
const sendOtpForRPsd = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorHandler(400, "please enter email id"));
  }
  const adDtl = await admin.findOne({ email: email }, { email: 1 });
  if (adDtl == null) {
    return next(new ErrorHandler(404, "Enter Valid Credential"));
  }
  const otpValue = await generateOtp();
  const message = getHtmlEmailpage(otpValue);
  setOtp = new otp({
    email: adDtl.email,
    otp: otpValue,
    user: "admin",
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
  const ack = await otp.findOne({ email: email, otp: tOtp, user: "admin" });
  if (ack == null) {
    return next(new ErrorHandler(401, "Invalid Otp"));
  }
  bcrypt
    .hash(password, 9)
    .then(async (hsPsd) => {
      const aDtls = await admin.findOneAndUpdate(
        { email: email },
        { $set: { password: hsPsd } }
      );
      if (aDtls) {
        return res
          .status(201)
          .json({ ackbool: 1, message: "Password Change Succussfully" });
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(500, error));
    });
});
const adminProfile = catchAsyncError(async (req, res, next) => {
  await admin
    .findById(req.user._id)
    .select("-password")
    .then((data) => {
      if (!data) {
        return next(new ErrorHandler(404, "Admin Data Not Found"));
      } else {
        return res.status(200).json({ ackbool: 1, message: data });
      }
    });
});
const getAdminList = catchAsyncError(async (req, res, next) => {
  if (req.user.root == true) {
    await admin
      .find()
      .select("-password")
      .then((admins) => {
        return res.status(200).json({ ackbool: 1, message: admins });
      })
      .catch((error) => {
        return next(new ErrorHandler(400, error));
      });
  } else {
    return next(new ErrorHandler(403, "Not authorized"));
  }
});
const deleteAdmin = catchAsyncError(async (req, res, next) => {
  const _id = req.params._id;
  if (!_id) {
    return next(new ErrorHandler(400, "Please select sub admin"));
  } else {
    await admin
      .findOneAndDelete({ _id: _id, root: false })
      .then((result) => {
        if (result == null) {
          return next(new ErrorHandler(304, "Can't delete Super Admin"));
        } else {
          return res.status(200).json({
            ackbool: 1,
            message: "Admin Account deleted successfully",
          });
        }
      })
      .catch((error) => {
        return next(
          new ErrorHandler(404, "selected sub admin Data not available")
        );
      });
  }
});
// Course Controller
const pushANewCourse = catchAsyncError(async (req, res, next) => {
  const { name, description, duration, subjects, prerequisites } = req.body;
  if (!name || !description || !duration || !subjects) {
    return next(
      new ErrorHandler(
        400,
        "Please fill all the fields :- name, description, duration, subjects, prerequisites (optional)"
      )
    );
  } else {
    const courseData = new course({
      name,
      description,
      duration,
      subjects,
      prerequisites,
    });
    await courseData
      .save()
      .then(() => {
        return res
          .status(201)
          .json({ ackbool: 1, message: `${name} course has Been Pushed` });
      })
      .catch((error) => {
        return next(error);
      });
  }
});
const getCourseList = catchAsyncError(async (req, res, next) => {
  const courseList = await course.find();
  if (courseList) {
    return res.status(200).json({ ackbool: 1, message: courseList });
  } else {
    return next(new ErrorHandler(404, "Coursee not found"));
  }
});
const deleteCourse = catchAsyncError(async (req, res, next) => {
  const _id = req.params._id;
  if (!_id) {
    return next(new ErrorHandler(400, "Please Select Course"));
  } else {
    await course
      .findByIdAndDelete(_id)
      .then((data) => {
        return res.status(200).json({ ackbool: 1, message: "Deleted" });
      })
      .catch((error) => {
        return next(error);
      });
  }
});

// Exam Controller
const issueExamForm = catchAsyncError(async (req, res, next) => {
  const { courseName, examDate, duration, reportingTime, from, to } = req.body;
  if (courseName && examDate && duration && reportingTime && from && to) {
    await course.findOne({ name: courseName }).then(async (data) => {
      if (data == null || undefined || "") {
        return next(new ErrorHandler(404, "Course not found"));
      } else {
        const Exam = new exam({
          courseName,
          examDate,
          duration,
          reportingTime,
          from,
          to,
        });
        await Exam.save()
          .then(() => {
            return res
              .status(201)
              .json({ ackbool: 1, message: "Exam Form Issued" });
          })
          .catch((error) => {
            return next(error);
          });
      }
    });
  } else {
    return next(
      new ErrorHandler(
        400,
        "Required courseName, examDate, duration, reportingTime, from, to field"
      )
    );
  }
});

const getExams = catchAsyncError(async (req, res, next) => {
  const { completed, locked } = req.params;
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
  }
  await exam
    .find(query)
    .then((data) => {
      if (data.length > 0) {
        return res.status(200).json({ ackbool: 1, message: data });
      } else {
        return next(new ErrorHandler(404, "Reord Not Available"));
      }
    })
    .catch((error) => {
      return next(error);
    });
});
const examFormList = catchAsyncError(async (req, res, next) => {
  const { completed, course } = req.query;
  const filter = {
    completed: completed,
    course: course,
  };
  const query = {};
  if (completed === "true" || completed === "false") {
    query.completed = completed === "true";
  }

  if (
    course &&
    typeof course == "string" &&
    !course === "null" &&
    !course === "undefined"
  ) {
    query.courseName = course;
  }
  await exam
    .find(query, { students: 1, _id: 0 })
    .sort({ name: 1 })
    .then((data) => {
      if (data.length == 0) {
        return next(new ErrorHandler(404, "Records not available"));
      }
      data = data.map((item) => item.students).flat();
      return res.status(200).json({ ackbool: 1, message: data });
    })
    .catch((error) => {
      return next(error);
    });
});
const verifyExamForm = catchAsyncError(async (req, res, next) => {
  const { formIds } = req.body;
  if (formIds !== null || undefined || "" || true || false) {
    // check is student existt on not
    console.log(formIds);
    exam
      .updateMany(
        { completed: false, "students.id": formIds },
        { $set: { "students.$.verified": true } }
      )
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          return res
            .status(201)
            .json({ ackbool: 1, message: "Verification Succussfull" });
        } else {
          return next(
            new ErrorHandler(
              404,
              "Can not Modiefied Because student Exam Form Not found"
            )
          );
        }
      })
      .catch((error) => {
        return next(error);
      });
  } else {
    return next(
      new ErrorHandler(400, "Without Tick Mark student will not be verified")
    );
  }
});
const lockExam = catchAsyncError(async (req, res, next) => {
  const { examIds, locked } = req.body;
  if ((examIds && locked == true) || locked == false) {
    await exam
      .updateMany({ _id: { $in: examIds } }, { $set: { locked: locked } })
      .then(() => {
        return res.status(201).json({ ackbool: 1, message: "updated" });
      })
      .catch((error) => {
        return next(error);
      });
  } else {
    return next(new ErrorHandler(400, "Please Tick the Exam for examId "));
  }
});

// Question Paper Controller
const pushQuestionPaper = catchAsyncError(async (req, res, next) => {
  const { maxMarks, totalQuestions, examId } = req.body;
  console.log(typeof maxMarks);
  if (
    (typeof maxMarks === "number" &&
      typeof totalQuestions === "number" &&
      examId) == false
  ) {
    return next(
      new ErrorHandler(
        400,
        "Please fill up all fields :- maxMarks, totalQuestions, examId "
      )
    );
  }
  const examDetails = await exam.findOne(
    { _id: examId },
    { courseName: 1, examDate: 1 }
  );
  if (examDetails) {
    const { name, email } = req.user;
    const data = await questionPaper.findOne(
      {
        course: examDetails.courseName,
        date: examDetails.examDate,
      },
      { _id: 1 }
    );
    if (data) {
      return next(
        new ErrorHandler(
          200,
          `question Paper for ${examDetails.courseName} for on the ${examDetails.examDate} is already Available`
        )
      );
    }
    const paper = new questionPaper({
      course: examDetails.courseName,
      date: examDetails.examDate,
      maxMarks: maxMarks,
      totalQuestions: totalQuestions,
      postedBy: {
        name: name,
        email: email,
      },
    });
    await paper
      .save()
      .then(async (data) => {
        await exam.findByIdAndUpdate(
          { _id: examId },
          { $set: { paper: data._id } }
        );
        return res.status(201).json({ ackbool: 1, message: "Saved" });
      })
      .catch((error) => {
        return next(error);
      });
  } else {
    return next(new ErrorHandler(400, "Exam data not exist"));
  }
});
const pushQuestions = catchAsyncError(async (req, res, next) => {
  const { questions, qPId } = req.body;
  const data = await questionPaper.updateOne(
    { _id: qPId },
    { $addToSet: { questions: { $each: questions } } }
  );
  if (data.modifiedCount > 0) {
    return res.status(201).json({ ackbool: 1, message: "Saved" });
  } else {
    return next(
      new ErrorHandler(
        400,
        "Question Paper Not Available or duplicity of question"
      )
    );
  }
});
const getQuetionPaperList = catchAsyncError(async (req, res, next) => {
  await questionPaper
    .find({})
    .select("-questions")
    .then((data) => {
      if (data.length > 0) {
        return res.status(200).json({ ackbool: 1, message: data });
      } else {
        return next(new ErrorHandler(404, "No Question Paper exist"));
      }
    })
    .catch((error) => {
      return next(error);
    });
});
const deleteQuestionPaper = catchAsyncError(async (req, res, next) => {
  const _id = req.params._id;
  if (!_id) {
    return next(new ErrorHandler(400, "Please Select Question Paper"));
  }
  const data = await exam.findOne({ paper: _id });
  if (data == null) {
    return next(
      new ErrorHandler(
        203,
        "Can not delete Because this Question Paper is Linked From Any Exam"
      )
    );
  } else {
    await questionPaper
      .deleteOne({ _id: _id })
      .then((data) => {
        if (data.deletedCount == 0) {
          return next(
            new ErrorHandler(404, "Requested Question Paper doest not exists")
          );
        }
        return res.status(200).json({ ackbool: 1, message: "Deleted" });
      })
      .catch((error) => {
        return next(error);
      });
  }
});
const getQuestions = catchAsyncError(async (req, res, next) => {
  let { paperId } = req.query;
  if (!paperId) {
    return next(new ErrorHandler(400, "Please Select Question Paper"));
  }
  const data = await questionPaper.findOne({ _id: paperId }, { questions: 1 });
  return res.status(200).json({ ackbool: 1, message: data.questions });
});

// Notice Controllerpanpaint
const pushNotice = catchAsyncError(async (req, res, next) => {
  const { title, nMessage } = req.body;
  if (!title || !nMessage) {
    return next(
      new ErrorHandler(
        400,
        '"Please Fill All The Fields :- title and nMessage '
      )
    );
  } else {
    const noticeData = new notice({
      title,
      nMessage,
    });
    await noticeData
      .save()
      .then(() => {
        res.status(201).json({ ackbool: 1, message: "Notice Has Been Pushed" });
      })
      .catch((error) => {
        return next(error);
      });
  }
});
const getAllNotice = catchAsyncError(async (req, res, next) => {
  let allNotice = await notice.find().select("title nMessage");
  if (allNotice) {
    return res.status(200).json({ ackbool: 1, message: allNotice });
  } else {
    return next(new ErrorHandler(404, "Notices not Exist"));
  }
});
const updateNotice = catchAsyncError(async (req, res, next) => {
  const { _id, title, nMessage } = req.body;

  if (!_id) {
    return next(new ErrorHandler(404, "Requested Notice does not exist"));
  } else {
    console.table([_id, title, nMessage]);
    await notice
      .updateOne({ _id: _id }, { $set: { title, nMessage } })
      .then((updatedNotice) => {
        if (!updatedNotice) {
          return next(new ErrorHandler(404, "Notice not found or not updated"));
        }
        return res.status(201).json({
          ackbool: 1,
          message: "Notice updated successfully",
          updatedNotice,
        });
      })
      .catch((error) => {
        return next(new ErrorHandler(500, error));
      });
  }
});

const deleteNotice = catchAsyncError(async (req, res, next) => {
  const _id = req.params._id;
  if (!_id) {
    return next(new ErrorHandler(400, "please select notice"));
  } else {
    await notice
      .findByIdAndDelete({ _id: _id })
      .then((result) => {
        if (result == null) {
          return next(new ErrorHandler(404, "Requested Notices not Exist"));
        } else {
          return res
            .status(200)
            .json({ ackbool: 1, message: "Notice Has Been Deleted" });
        }
      })
      .catch((error) => {
        return next(error);
      });
  }
});

// Query Controller
const getAllQuery = catchAsyncError(async (req, res, next) => {
  const allQuery = await enquiry.find();
  if (allQuery) {
    return res.status(200).json({ ackbool: 1, message: allQuery });
  } else {
    return next(new ErrorHandler(404, "Query not exists"));
  }
});
const updateQueryStatus = catchAsyncError(async (req, res, next) => {
  const _id = req.body;
  if (!_id) {
    return next(new ErrorHandler(400, "Please select Query :- _id"));
  } else {
    const query = await enquiry.findByIdAndUpdate(
      _id,
      { $set: { iSolveStatus: true } },
      { new: true }
    );
    return res.status(200).json({ ackbool: 1, message: query });
  }
});
const deleteQuery = catchAsyncError(async (req, res, next) => {
  const _id = req.params._id;
  if (!_id) {
    return next(new ErrorHandler(400, "Please select Query :- _id"));
  } else {
    await enquiry
      .findByIdAndDelete({ _id: _id })
      .then((result) => {
        if (result == null) {
          return next(new ErrorHandler(404, "Requested Query Not found"));
        } else {
          return next(new ErrorHandler(200, "Query Has Been Deleted"));
        }
      })
      .catch((error) => {
        return next(error);
      });
  }
});
// Gallery Controller
const pushPhoto = catchAsyncError(async (req, res, next) => {
  const { name, url, category } = req.body;
  if (!name || !url || !category) {
    return next(
      new ErrorHandler(400, "Pleas fill all field :- Name, url, categor")
    );
  } else {
    const newPhoto = new gallery({
      name: name,
      category: category,
      url: url,
    });
    await newPhoto.save();
    return res.status(201).json({ ackbool: 1, message: "Picture Inserted" });
  }
});
const getPhotos = catchAsyncError(async (req, res, next) => {
  const category = req.params.category;
  let query = {};
  if (category == "undefined") {
    query = {};
  } else if (category !== undefined || category !== null || category !== "") {
    query.category = { $regex: new RegExp(category, "i") };
  }
  await gallery.find(query).then((photos) => {
    if (photos.length < 1) {
      return next(new ErrorHandler(404, "No Photos Available"));
    } else {
      return res.status(200).json({ ackbool: 1, message: photos });
    }
  });
});
const deletePhotos = catchAsyncError(async (req, res, next) => {
  const _id = req.params._id;
  if (!_id) {
    return next(new ErrorHandler(400, "please select photos :- _id"));
  } else {
    await gallery
      .findByIdAndDelete(_id)
      .then((data) => {
        return data == null
          ? next(new ErrorHandler(404, "Photo not available"))
          : res.status(200).json({ ackbool: 1, message: "Deleted" });
      })
      .catch((error) => {
        return next(error);
      });
  }
});
module.exports = {
  // Admin Controller
  addAdmin,
  loginAdmin,
  sendOtpForRPsd,
  verifyOtpAndUpdatePsd,
  adminProfile,
  getAdminList,
  deleteAdmin,
  // Course Controller
  pushANewCourse,
  getCourseList,
  deleteCourse,

  //   Exam Controller
  issueExamForm,
  getExams,
  examFormList,
  verifyExamForm,
  lockExam,

  // Question Paper Controller
  pushQuestionPaper,
  pushQuestions,
  getQuetionPaperList,
  deleteQuestionPaper,
  getQuestions,

  // Student Controller
  studentList,
  takeNewAdmission,
  deleteStudentRegistrationForm,
  toggleStatus,

  // Certificate Controller
  generateCertificate,
  verifyCertificate,
  // Notice Controller
  pushNotice,
  getAllNotice,
  updateNotice,
  deleteNotice,
  // Query Controller
  getAllQuery,
  updateQueryStatus,
  deleteQuery,
  // Gallery Controller
  pushPhoto,
  getPhotos,
  deletePhotos,
};
