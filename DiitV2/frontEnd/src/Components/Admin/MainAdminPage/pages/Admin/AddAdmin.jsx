import { useState } from "react";
import { addAdmin } from "../../../../../api/adminApi/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddAdmin.css";
const fields = [
  { name: "name", type: "text", placeholder: "Full Name" },
  { name: "nDob", type: "date", placeholder: "Date of Birth" },
  { name: "aadhaar", type: "text", placeholder: "Aadhaar Number", maxLength: 12 },
  { name: "mobile", type: "number", placeholder: "Mobile Number" },
  { name: "email", type: "email", placeholder: "Email" },
  { name: "address", type: "text", placeholder: "Address" },
  { name: "profession", type: "text", placeholder: "Profession" },
  { name: "about", type: "textarea", placeholder: "About" },
  { name: "password", type: "password", placeholder: "Password" },
  { name: "rPassword", type: "password", placeholder: "Repeat Password" },
];
const fieldsPerStep = 2;

export default function AddAdmin() {
  const [formData, setFormData] = useState(
    fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), { image: null })
  );
  const [photo, setPhoto] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [step, setStep] = useState(0);

  const totalSteps = Math.ceil(fields.length / fieldsPerStep);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.[0]) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setPhoto(URL.createObjectURL(files[0]));
      setUploadStatus(false);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadPhoto = async () => {
    if (!formData.image) return toast.error("Select an image first");
    const data = new FormData();
    data.append("file", formData.image);
    data.append("upload_preset", "hridesh99!");
    data.append("cloud_name", "draowpiml");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/draowpiml/image/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result?.url) {
        setPhoto(result.url);
        setUploadStatus(true);
        toast.success("Image uploaded!");
      } else {
        throw new Error("Upload failed");
      }
    } catch {
      toast.error("Image upload failed.");
    }
  };

  const RegisterAccount = async () => {
    if (!uploadStatus || !photo) return toast.error("Please upload a profile picture.");
    if (formData.password !== formData.rPassword) return toast.error("Passwords do not match.");

    const {
      name,
      nDob,
      mobile,
      address,
      aadhaar,
      profession,
      email,
      password,
      about,
    } = formData;

    try {
      const res = await addAdmin({
        name,
        email,
        profilePic: photo,
        dob: nDob,
        mobileNumber: mobile,
        address,
        aadhaarNumber: aadhaar,
        profession,
        about,
        password,
      });

      if (res?.ackbool === 1) {
        toast.success(res.message);
      } else {
        toast.error(res?.message || "Failed to create account");
      }
    } catch {
      toast.error("Failed to create account");
    }
  };

  const startIndex = step * fieldsPerStep;
  const endIndex = startIndex + fieldsPerStep;
  const fieldsToShow = fields.slice(startIndex, endIndex);

  return (
    <div className="signup-bg">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>

        <div className="signup-avatar-wrapper">
          <label htmlFor="imgUpload" className="signup-avatar-label">
            {photo ? (
              <img src={photo} alt="Profile" className="signup-avatar-image" />
            ) : (
              <div className="signup-avatar-placeholder">
                <i className="fa fa-camera"></i>
              </div>
            )}
            <input
              id="imgUpload"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              hidden
            />
            <div className="signup-avatar-overlay">
              Tap to {photo ? "change" : "add"}
            </div>
          </label>
          <button
            onClick={uploadPhoto}
            disabled={uploadStatus}
            className={`mx-2 signup-upload-btn${uploadStatus ? " uploaded" : ""}`}
          >
            {uploadStatus ? "Uploaded ✓" : "Upload Photo"}
          </button>
        </div>

        {/* Progress indicator */}
        <p style={{ textAlign: "center", marginBottom: "1rem", color: "#1976d2", fontWeight: "600" }}>
          Step {step + 1} of {totalSteps}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            RegisterAccount();
          }}
        >
          <div
            className="signup-fields-grid"
            style={{ gridTemplateColumns: "1fr", gap: "1rem" }}
          >
            {fieldsToShow.map(({ name, type, ...rest }) => (
              <div key={name} style={{ display: "flex", alignItems: "center" }}>
                {type === "textarea" ? (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    className="signup-textarea"
                    placeholder={rest.placeholder}
                  />
                ) : (
                  <input
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    className="signup-input"
                    type={type}
                    {...rest}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: step === 0 ? "flex-end" : "space-between",
              marginTop: 20,
              gap: "10px",
            }}
          >
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="signup-submit-btn"
                style={{ width: "48%", backgroundColor: "#bbb" }}
              >
                Previous
              </button>
            )}

            {step < totalSteps - 1 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="signup-submit-btn"
                style={{ width: step > 0 ? "48%" : "100%" }}
              >
                Next
              </button>
            )}

            {step === totalSteps - 1 && (
              <button type="submit" className="signup-submit-btn" style={{ width: "48%" }}>
                Register
              </button>
            )}
          </div>

          <div className="signup-footer-links">
            <Link to="#" className="signup-link">
              Already have an account? Login!
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}