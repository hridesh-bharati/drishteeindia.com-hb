const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    center:{
        type: String, 
        required: true,
    },
    photo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    aadhaar:{
        type:String,
        required:true,
        trim:true
    },
    dob: {
        type: Date,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['General','OBC','SC/ST','Other'],
        required: true
    },
    admitted:{
        type:Boolean,
        required:true,
        default:0
    },
    activeStatus:{
        type: Boolean,
        required:true,
        default:false
    },
    regNum:{
        type:String,
        unique:true,
        sparse:true,
    },
    gnCertificate:{
        type:Boolean,
        default:0,
        required:true,
    },
    examFormApplied:{
        type:Boolean,
    },
    password:{
        type:String
    }
},{timestamps:true});
const enquirySchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        trim: true,
        // Validate Indian mobile number format using a regular expression
        validate: {
            validator: function (value) {
                const mobileNumberRegex =/^[6-9]\d{9}$/
                return mobileNumberRegex.test(value);
            },
            message: 'Invalid Indian mobile number format',
        },
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
            message: 'Invalid email format',
        },
    },
    title: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    },
    iSolveStatus:{
        type:Boolean,
        default:false,
        required:true
    }
}, { timestamps: true });
const certificateSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'student',
    },
    completationDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    percentage:{
        type:Number,
        required:true
    },
     regNum:{
        type:String,
        unique:true,
        required:true,
    }
})
const student = mongoose.model('student', studentSchema);
const enquiry = mongoose.model('enquiry', enquirySchema);
const certificate = mongoose.model('certificate',certificateSchema);
module.exports = {
    student,
    enquiry,
    certificate
}