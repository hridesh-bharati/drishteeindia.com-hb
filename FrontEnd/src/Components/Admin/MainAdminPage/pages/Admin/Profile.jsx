import { useEffect, useState } from "react";
import { adminProfile } from "../../../../../api/adminApi/api";
const format = {
  date: (val) => (isNaN(new Date(val)) ? "-" : new Date(val).toLocaleDateString("en-GB")),
  text: (val) => val || "-",
}; const InfoItem = ({ label, value }) => (
  <div className="col-sm-6">
    <div className="bg-light about-card p-2 rounded small">
      <strong>{label}</strong>
      <div>{value}</div>
    </div>
  </div>
);

export default function Profile() {
  const [admin, setAdmin] = useState(null); useEffect(() => {
    adminProfile()
      .then(({ ackbool, message }) => ackbool && setAdmin(message))
      .catch(console.error);
  }, []); if (!admin) return <p className="text-center my-5">Loading...</p>;

  const info = [
    ["📧 Email", format.text(admin.email)],
    ["📱 Mobile", format.text(admin.mobileNumber)],
    ["🆔 Aadhaar", format.text(admin.aadhaarNumber)],
    ["💼 Profession", format.text(admin.profession)],
    ["🎂 Birthday", format.date(admin.dob)],
    ["🏠 Address", format.text(admin.address)],
  ];
  return (
    <div className="container my-4" id="AdminProfile">
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        {/* Cover Banner + Profile Image */}
        <div className="position-relative" style={{ height: 100, background: "linear-gradient(45deg, #3b5998, #8b9dc3)" }}>
          <div className="position-absolute top-100 start-50 translate-middle" style={{ width: 120, height: 120 }}>
            <img
              src={admin.profilePic || ""}
              alt={admin.name}
              className="rounded-circle border border-white shadow-sm"
              style={{ width: "100%", height: "100%", objectFit: "cover", background: "#ccc" }}
            />
          </div>
        </div>
        <div className="text-center mt-5 pt-3 px-3">
          <h5 className="fw-bold mb-1">
            {format.text(admin.name)}
            {admin.root && (
              <span className="badge bg-warning text-dark ms-2" title="Superadmin">
                🛡️ Superadmin
              </span>
            )}
          </h5>
          <p className="small">{format.text(admin.profession)}</p>
        </div>
        <div className="px-4 pb-3">
          <div className="row g-3">
            {info.map(([label, value], i) => (
              <InfoItem key={i} label={label} value={value} />
            ))}
          </div>
        </div>
        <div className="px-4 py-3 border-top">
          <h6 className="fw-bold text-primary mb-1">About Me</h6>
          <p className="small mb-0">{format.text(admin.about)}</p>
        </div>
      </div>
    </div>
  );
}
