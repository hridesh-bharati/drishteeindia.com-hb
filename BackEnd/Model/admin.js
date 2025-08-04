const mongoose = require("mongoose");
const { student } = require("./student");
const { ObjectId } = mongoose.Schema.Types;
const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    nMessage: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Invalid email format",
      },
      unique: true,
    },
    profilePic: {
      type: String,
      required: true,
      default: "Not Available",
    },
    dob: {
      type: Date,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      trim: true,
      // Validate Indian mobile number format using a regular expression
      validate: {
        validator: function (value) {
          const mobileNumberRegex = /^(?:\+91|91)?[6-9]\d{9}$/
          return mobileNumberRegex.test(value);
        },
        message: "Invalid Indian mobile number format",
      },
    },
    address: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    aadhaarNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    root: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);
const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true
  },
  otp: {
    type: Number,
    required: true
  },
  user: {
    type: String,
    enum: ['student', 'admin'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 10
  }
})
const computerCourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    subjects: [
      {
        name: { type: String, required: true },
      },
    ],
    prerequisites: {
      type: String,
      required: false,
      default: "no",
    },
  },
  { timestamps: true }
);
const examSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    examDate: {
      type: Date,
      required: true,
      unique: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    reportingTime: {
      type: Date,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    locked: {
      type: Boolean,
      required: true,
      default: false,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    students: [
      {
        id: {
          type: ObjectId,
          required: true,
        },
        regNum: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        photo: {
          type: String,
          required: true,
        },
        applyDate: {
          type: Date,
          required: true,
          default: Date.now,
        },
        verified: {
          type: Boolean,
          required: true,
          default: false,
        },
        tested: {
          type: Boolean,
          required: true,
          default: false
        },
      },
    ],
    paper: {
      type: ObjectId,
    },
  },
  { timestamps: true }
);
const questionPaperSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  maxMarks: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
      },
      options: {
        a: {
          type: String,
        },
        b: {
          type: String,
        },
        c: {
          type: String,
        },
        d: {
          type: String,
        },
      },
      answer: {
        type: String,
        enum: ["a", "b", "c", "d"],
      },
    },
  ],
  studentsRspns: [
    {
      regNum: {
        type: String
      },
      rspns: [{
        rsAns: {
          enum: ['a', 'b', 'c', 'd'],
          type: String
        }
      }]
    }
  ],
  postedBy: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
});
const gallerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const notice = mongoose.model("notice", noticeSchema);
const admin = mongoose.model("admin", adminSchema);
const otp = mongoose.model("otp", OtpSchema);
const course = mongoose.model("course", computerCourseSchema);
const exam = mongoose.model("exam", examSchema);
const questionPaper = mongoose.model("questionPapers", questionPaperSchema);
const gallery = mongoose.model("gallery", gallerySchema);
module.exports = {
  notice,
  admin,
  otp,
  course,
  exam,
  questionPaper,
  gallery,
};
