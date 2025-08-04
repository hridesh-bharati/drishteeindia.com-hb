import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registrateStudent, uploadPhoto } from "../../../api/studentApi/api";
import { getCourseList } from "../../../api/adminApi/api";
import Time from "./Time";
import Marquee from "../Marquee";

const AdmissionForm = () => {
  const initialFormData = {
    name: "",
    fatherName: "",
    motherName: "",
    gender: "",
    aadhaar: "",
    email: "",
    address: "",
    mobileNumber: "",
    dob: "",
    course: "",
    category: "",
    otherCategory: "",
    photo: "",
    checkboxChecked: false,
    center: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [error, setError] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoLoading, setPhotoLoading] = useState(false);

  useEffect(() => {
    const fetchCourseList = async () => {
      const response = await getCourseList();
      if (response.ackbool === 1) {
        setCourseList(response.message);
      } else {
        toast.error("Failed to load course list");
      }
    };
    fetchCourseList();
  }, []);

  useEffect(() => {
    const {
      name,
      fatherName,
      motherName,
      gender,
      aadhaar,
      email,
      address,
      mobileNumber,
      dob,
      course,
      category,
      checkboxChecked,
      center
    } = formData;
    const isAadhaarValid = aadhaar.length === 12 && /^[0-9]{12}$/.test(aadhaar);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isMobileValid = /^[0-9]\d{9}$/.test(mobileNumber);

    setSubmitEnabled(
      name &&
      fatherName &&
      motherName &&
      gender &&
      isAadhaarValid &&
      isEmailValid &&
      isMobileValid &&
      address &&
      dob &&
      course &&
      category &&
      checkboxChecked &&
      center
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhotoChange = async (e) => {
    const image = e.target.files[0];
    if (image) {
      if (!/\.jpe?g$/i.test(image.name)) {
        toast.error('Please upload a valid JPEG/JPG image.');
        return;
      }
      if (image.size > 50 * 1024) {
        toast.error('Image size should not exceed 50 KB.');
        return;
      }

      setPhotoLoading(true); // ✅ Start loading

      try {
        const response = await uploadPhoto(image);
        if (response.url) {
          setPhotoUploaded(true);
          setPhotoPreview(response.url);
          setFormData(prevData => ({ ...prevData, photo: response.url }));
        }
      } catch (error) {
        toast.error('Failed to upload photo');
      } finally {
        setPhotoLoading(false); // ✅ Stop loading
      }
    } else {
      toast.error('Please select a profile photo');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await registrateStudent(formData);
      if (response.ackbool === 1) {
        toast.success(response.message);

        resetForm();
      } else {
        setError("Registration failed. Please check your details.");
      }
    } catch (error) {
      setError("Registration failed due to a server error.");
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setPhotoUploaded(false);
    setPhotoPreview("");
    setError("");
  };

  return (
    <>
      <style>{`
  .section-header {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.9px;
    padding: 10px 15px;
    border-radius: 5px;
    margin-bottom: 15px;
    color: white;
    background-color: #3949ab; /* Indigo Blue */
    border-bottom: 3px solid #3949ab;
    box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
  }

  label {
    font-weight: 600;
    color: #1a237e; /* dark blue */
  }

  input.form-control,
  select.form-select,
  textarea.form-control {
    border-radius: 0;
  }

  input.form-control:focus,
  select.form-select:focus,
  textarea.form-control:focus {
    border-color: #3949ab;
    box-shadow: none;
  }

  .btn-custom {
    background: #1a237e;
    color: white;
    border: none;
    font-weight: 700;
    letter-spacing: 0.8px;
    padding: 8px 24px;
    transition: background-color 0.3s ease;
  }

  .btn-custom:hover:not(:disabled) {
    background: #3949ab;
    color: #e3eafc;
  }

  .btn-custom:disabled {
    background: #8a99d6;
    cursor: not-allowed;
  }

  .error-text {
    color: #d32f2f;
    font-weight: 600;
    margin-top: 10px;
    text-align: center;
  }

  .photo-preview {
    max-width: 100px;
    max-height: 110px;
    border: 1.5px solid rgb(242, 241, 241);
    margin-top: 8px;
    object-fit: contain;
    display: block;
    border-radius: 3px;
  }

  .checkbox-label {
    font-weight: 600;
    color: #1a237e;
  }


    .admission-header {
  background-color: #e8eaf6;
  padding: 1rem;
  border-radius: 5px;
  border-left: 5px solid #1a237e;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.main-heading {
  color: #1a237e;
  font-weight: 700;
  font-size: 2.5rem;
  margin-bottom: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sub-heading {
  color: #3949ab;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0;
}

.announcement-box {
  background-color: #c5cae9;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
}

.marquee-text {
  font-size: 0.85rem;
  font-weight: 400;
  color: #1a237e;
  white-space: nowrap;
  overflow: hidden;
}
  @media (max-width: 576px) {
    .form-label {
      font-size: 14px;
    }
  }
  @media (max-width: 768px) {
    .main-heading {
  font-size: 1.8rem;
}

.sub-heading {
  font-size: 0.9rem;
}
  .section-A, .section-B,.section-C, .section-D,.section-E{
  font-size:0.9rem;
  }
  }

`}</style>


      <div className="container my-4 p-4 border rounded shadow-sm bg-white">
        <form onSubmit={handleSubmit} noValidate>
          <div className="admission-header text-center mt-35 mb-4">
            <h2 className="main-heading mb-1">Admission Form</h2>
            <p className="sub-heading">Session 2025–26 / सत्र 2025–26</p>
            <div className="announcement-box mt-3 d-flex align-items-center justify-content-center">
              <Time />
              <Marquee className="marquee-text ms-3">
                Apply online now and start your IT journey.
              </Marquee>
            </div>
          </div>

          {/* Section 0*/}
          <h5 className="section-header section-A">A. Branch Section</h5>

          <div className="row mb-3">
            <label htmlFor="center" className="col-md-4 col-form-label form-label">
              1: Choose Branch
            </label>
            <div className="col-md-8">
              <select
                id="center"
                className="form-select"
                name="center"
                value={formData.center}
                onChange={handleChange}
                required
              >
                <option value="">Select Branch</option>
                <option value="nichlaul">Nichlaul</option>
                <option value="thoothibari">Toothibari</option>
              </select>
            </div>
          </div>

          {/* Section A */}
          <h5 className="section-header section-A">B. Student's Personal Details</h5>

          <div className="row mb-3">
            <label htmlFor="name" className="col-md-4 col-form-label form-label">
              1: Student's Name / छात्र का नाम *
            </label>
            <div className="col-md-8">
              <input
                id="name"
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="fatherName" className="col-md-4 col-form-label form-label">
              2: Father's Name / पिता का नाम *
            </label>
            <div className="col-md-8">
              <input
                id="fatherName"
                type="text"
                className="form-control"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="motherName" className="col-md-4 col-form-label form-label">
              3: Mother's Name / माता का नाम *
            </label>
            <div className="col-md-8">
              <input
                id="motherName"
                type="text"
                className="form-control"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="dob" className="col-md-4 col-form-label form-label">
              4: Date of Birth / जन्म तिथि *
            </label>
            <div className="col-md-8">
              <input
                id="dob"
                type="date"
                className="form-control"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="gender" className="col-md-4 col-form-label form-label">
              5: Gender / लिंग *
            </label>
            <div className="col-md-8">
              <select
                id="gender"
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male / पुरुष</option>
                <option value="female">Female / महिला</option>
                <option value="other">Other / अन्य</option>
              </select>
            </div>
          </div>

          {/* Section B */}
          <h4 className="section-header section-B">C. Contact Details</h4>

          <div className="row mb-3">
            <label htmlFor="mobileNumber" className="col-md-4 col-form-label form-label">
              1: Mobile Number / मोबाइल नंबर *
            </label>
            <div className="col-md-8">
              <input
                id="mobileNumber"
                type="text"
                className="form-control"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                maxLength={10}
                required
              />
              <span className="badge bg-light text-success d-flex align-items-center gap-1" style={{ fontSize: "0.7rem" }}>
                <i className="bi bi-shield-check"></i>Must be verified with Aadhaar
              </span>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="email" className="col-md-4 col-form-label form-label">
              2: Email / ईमेल *
            </label>
            <div className="col-md-8">
              <input
                id="email"
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Section C */}
          <h4 className="section-header section-C">D. Course for Student's</h4>

          <div className="row mb-3">
            <label htmlFor="course" className="col-md-4 col-form-label form-label">
              1: Course / कोर्स *
            </label>
            <div className="col-md-8">
              <select
                id="course"
                className="form-select"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>
                {courseList.map((course) => (
                  <option key={course._id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section D */}
          <h4 className="section-header section-D">E. Identification Details</h4>

          <div className="row mb-3">
            <label htmlFor="aadhaar" className="col-md-4 col-form-label form-label">
              1: Aadhar Card Number / आधार कार्ड संख्या *
            </label>
            <div className="col-md-8">
              <input
                id="aadhaar"
                type="text"
                className="form-control"
                name="aadhaar"
                maxLength={12}
                value={formData.aadhaar}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="category" className="col-md-4 col-form-label form-label">
              2: Category / वर्ग *
            </label>
            <div className="col-md-8">
              <select
                id="category"
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC/ST">SC/ST</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="address" className="col-md-4 col-form-label form-label">
              3: Address / पता *
            </label>
            <div className="col-md-8">
              <textarea
                id="address"
                name="address"
                rows={3}
                className="form-control"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row align-items-start mb-3">
            <label className="col-md-4 form-label form-label">
              4: Upload Photo / फोटो अपलोड करें * <br />
              <small className="text-muted">Only JPEG/JPG, Max 50KB</small>
              <input
                type="file"
                accept=".jpeg,.jpg"
                onChange={handlePhotoChange}
                className="form-control mt-2"
                required={!photoUploaded}
              />
            </label>
            <div className="col-md-8">
              {photoLoading ? (
                <div className="text-primary d-flex align-items-center gap-2">
                  <div className="spinner-border spinner-border-sm" role="status"></div>
                  Uploading...
                </div>
              ) : photoUploaded ? (
                <img
                  src={photoPreview}
                  alt="Uploaded"
                  className="photo-preview"
                />
              ) : (
                <small className="text-muted">No photo uploaded yet</small>
              )}
            </div>

          </div>

          {/* Section E */}
          <h4 className="section-header section-E">F. Declaration</h4>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="declaration"
              name="checkboxChecked"
              checked={formData.checkboxChecked}
              onChange={handleChange}
              required
            />
            <label className="form-check-label checkbox-label" htmlFor="declaration">
              I hereby declare that all the above information provided by me is true and
              correct to the best of my knowledge.
            </label>
          </div>

          {error && <div className="error-text">{error}</div>}

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              type="button"
              className="btn btn-outline-primary btn-custom"
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-custom"
              disabled={!submitEnabled}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdmissionForm;
