import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import NetworkDot from "./NetworkDot";
import StudentIDCard from "./StudentIDCard";

export default function StudentFooter() {
  const navigate = useNavigate();
  const details = useSelector((state) => state.studentProfileDetails);

  const [offcanvasScreen, setOffcanvasScreen] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const savedBg = localStorage.getItem("profileBgImage");
    if (savedBg) setBgImage(savedBg);
  }, []);

  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setBgImage(base64);
      localStorage.setItem("profileBgImage", base64);
      // toast.success("Background image updated!");
    };
    reader.readAsDataURL(file);
  };

  const removeBgImage = () => {
    setBgImage(null);
    localStorage.removeItem("profileBgImage");
    // toast.info("Background image removed.");
  };

  const handleLogout = () => {
    localStorage.removeItem("sToken");
    // toast.success("Logout successful!");
    navigate("/");
  };

  if (!details.name) return null;

  const ListItem = ({ children, onClick, danger = false }) => (
    <li
      className={`list-group-item list-group-item-action d-flex align-items-center ${danger ? "text-danger" : "text-dark"}`}
      style={{ cursor: "pointer", gap: "0.75rem" }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      {children}
    </li>
  );

  const renderScreenWithBack = (title, children) => (
    <>
      <div className="d-flex align-items-center p-3 border-bottom">
        <button
          type="button"
          className="btn btn-link p-0 me-3"
          onClick={() => setOffcanvasScreen(null)}
          aria-label="Back"
          style={{ fontSize: "1.5rem", color: "#128C7E" }}
        >
          ←
        </button>
        <h5 className="mb-0" style={{ color: "#128C7E" }}>{title}</h5>
      </div>
      <div className="p-3">{children}</div>
    </>
  );

  const renderMenuList = () => (
    <ul className="list-group list-group-flush">
      <ListItem onClick={() => setOffcanvasScreen("profile")}>
        <div className="profile-bg" style={{ backgroundImage: bgImage ? `url(${bgImage})` : "none" }}>
          <img src={details.photo} alt="Profile" className="rounded-circle" width={40} height={40} style={{ objectFit: "cover" }} />
        </div>
        <NetworkDot />
        <div>
          <div className="fw-bold">{details.name}</div>
          <small className="text-muted">{details.mobileNumber}</small>
        </div>
      </ListItem>

      <ListItem onClick={() => setOffcanvasScreen("about")}>
        <i className="fa fa-info-circle me-2 text-secondary" />
        About
      </ListItem>

      <ListItem onClick={() => setOffcanvasScreen("notifications")}>
        <i className="fa fa-bell me-2 text-secondary" />
        Notifications
      </ListItem>

      <ListItem onClick={() => setOffcanvasScreen("std")}>
        <i className="bi bi-person-vcard-fill me-2 text-secondary"></i>
        Student Card
      </ListItem>

      <ListItem onClick={() => setOffcanvasScreen("help")}>
        <i className="fa fa-question-circle me-2 text-secondary" />
        Help & Support
      </ListItem>

      <ListItem onClick={handleLogout} danger>
        <i className="fa fa-sign-out me-2" />
        Log Out
      </ListItem>
    </ul>
  );

  return (
    <>
      {/* Bottom Navbar */}
      <nav className="navbar fixed-bottom d-flex justify-content-around align-items-center" style={{
        height: "60px",
        backgroundColor: "#fff",
        borderTop: "1px solid #ddd",
        boxShadow: "0 -1px 5px rgba(0,0,0,0.1)",
        zIndex: 1030,
      }}>
        <Link to="/Student-Portal" className="d-flex flex-column align-items-center text-decoration-none text-secondary" style={{ fontSize: "0.75rem" }}>
          <i className="fa fa-home" style={{ fontSize: "1.5rem", color: "#128C7E" }} />
          Home
        </Link>

        <button className="btn d-flex flex-column align-items-center text-secondary border-0 bg-transparent" style={{ fontSize: "0.75rem" }}
          onClick={() => setOffcanvasScreen("search")} aria-label="Search">
          <i className="fa fa-search" style={{ fontSize: "1.5rem", color: "#128C7E" }} />
          Search
        </button>

        <Link to="/Exam" className="d-flex flex-column align-items-center text-decoration-none text-secondary" style={{ fontSize: "0.75rem" }}>
          <i className="fa fa-file-alt" style={{ fontSize: "1.5rem", color: "#128C7E" }} />
          Exam
        </Link>

        <button className="btn d-flex flex-column align-items-center p-0 border-0 bg-transparent"
          data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight" aria-label="Profile"
          onClick={() => setOffcanvasScreen(null)} style={{ fontSize: "0.75rem" }}>
          <img src={details.photo} alt="Profile" className="rounded-circle"
            width={36} height={36} style={{ border: "2px solid #25D366", objectFit: "cover" }} />
          Profile
        </button>
      </nav>

      {/* Offcanvas Panel */}
      <div className="offcanvas mt-35 offcanvas-end" tabIndex="-1" id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel" style={{ width: "400px" }}>
        <div className="offcanvas-header pt-4 pb-3 mt-4" style={{ backgroundColor: "#25D366" }}>
          <h5 className="offcanvas-title text-white" id="offcanvasRightLabel">Menu</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0" style={{ overflowY: "auto", height: "calc(100vh - 56px)" }}>
          {offcanvasScreen === null && renderMenuList()}

          {offcanvasScreen === "profile" && renderScreenWithBack("Profile", (
            <>
              <div className="profile-bg-large rounded" style={{
                backgroundImage: bgImage ? `url(${bgImage})` : "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                height: "180px", position: "relative", marginBottom: "1rem",
              }}>
                <img src={details.photo} alt="Student" width={110} height={110}
                  className="rounded-circle border border-3 border-white shadow"
                  style={{
                    objectFit: "cover", position: "absolute", bottom: "-30px",
                    left: "17%", transform: "translateX(-50%)", zIndex: 9, background: "#fff"
                  }} />
                <div className="position-absolute" style={{ bottom: "10px", right: "15px", display: "flex", gap: "0.5rem", zIndex: 3 }}>
                  <button className="btn btn-sm btn-light" onClick={() => fileInputRef.current.click()} aria-label="Change Background Image">
                    <i className="bi bi-pencil"></i>
                  </button>
                  {bgImage && (
                    <button className="btn btn-sm btn-danger" onClick={removeBgImage} aria-label="Remove Background Image">
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </div>
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleBgImageChange} />
              </div>
              <div className="text-center mt-5 px-3 mb-3">
                <h4 className="d-flex justify-content-left my-2 align-items-center gap-2">
                  <i className="fa fa-user-circle text-success" />
                  {details.name}
                </h4>
                <p className="mb-1 d-flex justify-content-left my-2 align-items-center gap-2 text-muted">
                  <i className="fa fa-envelope text-secondary" />{details.email}
                </p>
                <p className="mb-1 d-flex justify-content-left my-2 align-items-center gap-2 text-muted">
                  <i className="fa fa-phone text-secondary" />{details.mobileNumber}
                </p>
              </div>
            </>
          ))}

          {offcanvasScreen === "about" && renderScreenWithBack("About", (
            <ul className="list-group list-group-flush" style={{
              fontSize: "0.95rem", color: "#303030", backgroundColor: "#f0f2f5",
              borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
            }}>
              {[
                { icon: "fa-user", label: "Name", value: details.name },
                { icon: "fa-id-card", label: "Registration Number", value: details.regNum },
                { icon: "fa-venus-mars", label: "Gender", value: details.gender },
                { icon: "fa-user-tie", label: "Father's Name", value: details.fatherName },
                { icon: "fa-female", label: "Mother's Name", value: details.motherName },
                { icon: "fa-calendar", label: "Date of Birth", value: new Date(details.dob).toLocaleDateString() },
                { icon: "fa-graduation-cap", label: "Course", value: details.course },
                { icon: "fa-building", label: "Center", value: details.center },
                { icon: "fa-tags", label: "Category", value: details.category },
                { icon: "fa-map-marker-alt", label: "Address", value: details.address },
                { icon: "fa-id-badge", label: "Aadhaar", value: details.aadhaar },
                { icon: "fa-phone", label: "Mobile", value: details.mobileNumber },
                { icon: "fa-envelope", label: "Email", value: details.email },
                { icon: "fa-calendar-plus", label: "Admission Date", value: new Date(details.createdAt).toLocaleDateString() },
                { icon: "fa-check-circle", label: "Admission Status", value: details.admitted ? "Admitted" : "Pending" },
                { icon: "fa-certificate", label: "Certificate Issued", value: details.gnCertificate ? "Yes" : "No" },
              ].map((item, idx) => (
                <li key={idx} className="list-group-item d-flex align-items-start" style={{
                  gap: "12px", padding: "12px 10px", backgroundColor: "#ffffff",
                  border: "none", borderBottom: "1px solid #eee",
                }}>
                  <i className={`fa ${item.icon}`} style={{
                    color: "#128C7E", fontSize: "1.2rem", minWidth: "24px", marginTop: "2px"
                  }} />
                  <div>
                    <div style={{ fontWeight: "600", color: "#075E54", textAlign: "left" }}>{item.label}</div>
                    <div style={{ color: "#555", marginTop: "3px", textAlign: "left" }}>{item.value}</div>
                  </div>
                </li>
              ))}
            </ul>
          ))}

          {offcanvasScreen === "notifications" && renderScreenWithBack("Notifications", (
            <div className="form-check form-switch px-4">
              <span>Enable Notifications</span>
            </div>
          ))}

          {offcanvasScreen === "std" && renderScreenWithBack("Student Card", (
            <StudentIDCard student={details} />
          ))}

          {offcanvasScreen === "help" && renderScreenWithBack("Help & Support", (
            <>
              <p className="px-3">If you need assistance, please contact support.</p>
              <Link to="/Contact-us" className="btn btn-link px-3">Go to Help & Support Page</Link>
            </>
          ))}

          {offcanvasScreen === "search" && renderScreenWithBack("Search", (
            <div className="px-3">
              <input type="search" className="form-control" placeholder="Search here..." autoFocus />
            </div>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
     
        .profile-bg {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          border: 2px solid #25D366;
          flex-shrink: 0;
        }
        .profile-bg-large {
          background-size: cover;
          background-position: center;
          border-radius: 0.5rem;
        }
        .btn-close {
          filter: invert(1);
        }
      `}</style>
    </>
  );
}
