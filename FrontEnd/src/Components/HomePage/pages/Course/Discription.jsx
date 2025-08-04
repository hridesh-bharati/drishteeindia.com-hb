import React from "react";
import { Link } from "react-router-dom";

// Reusable term items
const terms = [
    { icon: "fa-check-circle", color: "bg-success", text: "This official website of Drishtee Institute of Information Technology has been developed to provide information to the general public." },
    { icon: "fa-check-circle", color: "bg-success", text: "The website is designed and developed by students and maintained by Drishtee's internal departments. The documents and information are for reference only and not legal documents." },
    { icon: "fa-gavel", color: "bg-danger", text: "These terms will be governed by Indian laws. Any disputes should be directed to the institute via email or official communication channels." },
    { icon: "fa-lock", color: "bg-primary", text: "User data privacy is respected. We do not collect personal information unless you voluntarily provide it for admission, contact, or course inquiries." },
    { icon: "fa-info-circle", color: "bg-secondary", text: "While we strive to keep information accurate and up-to-date, Drishtee does not guarantee the completeness or reliability of the content displayed." },
    { icon: "fa-user-shield", color: "bg-warning", text: "Users are responsible for any actions taken based on the content of this site. Verify critical details with the institute before proceeding." },
    { icon: "fa-refresh", color: "bg-info", text: "Drishtee reserves the right to update or modify terms, content, or services on this website without prior notice." },
    { icon: "fa-globe", color: "bg-success", text: "This website may include links to external sites. Drishtee is not responsible for their content or privacy policies." },
    { icon: "fa-ban", color: "bg-danger", text: "Unauthorized attempts to upload or alter content, or to damage this website, are strictly prohibited and punishable under cyber laws." },
    { icon: "fa-universal-access", color: "bg-primary", text: "We aim to make this site accessible to all users, including those with disabilities. Contact us if you face accessibility issues." },
    { icon: "fa-copyright", color: "bg-dark", text: "All content on this site is the property of Drishtee Institute of Information Technology unless otherwise stated. Do not reproduce without permission." },
    { icon: "fa-envelope", color: "bg-success", text: "For any queries, suggestions, or complaints, please reach out to us through our contact page or official email address." },
];

// Term Card Component
const TermCard = ({ icon, color, text }) => (
    <div className="col-md-6 mb-4">
        <div className="card h-100 shadow-sm border-0 hoverTermCard about-card">
            <div className="card-body d-flex">
                <div className={`rounded-circle d-flex align-items-center justify-content-center text-white me-3 ${color}`} style={{ width: 40, height: 40 }}>
                    <i className={`fa ${icon} px-3`}></i>
                </div>
                <p className="mb-0 text-muted small">{text}</p>
            </div>
        </div>
    </div>
);

export default function Discription() {
    return (
        <div className="container-fluid p-0 mt-5 " id="termsPage">
            {/* Header Section */}
            <div className="text-center bg-white py-4 shadow-sm border-bottom about-card">
                <h1 className="fw-bold text-dark"><span className="text-danger">TERMS</span> OF USE</h1>
                <div className="small text-secondary d-flex justify-content-center align-items-center gap-2">
                    <Link to="/" className="text-primary text-decoration-none"><i className="fa fa-home"></i></Link>
                    / <span className="text-dark">Terms & Conditions</span>
                </div>
            </div>

            {/* Notice */}
            <div className="bg-light p-3 text-center border-bottom about-card">
                <p className="mb-0 text-muted fw-medium">
                    Please read the following terms carefully before using the Drishtee Institute of Information Technology website.
                </p>
            </div>

            {/* Terms Cards */}
            <div className="container py-5">
                <h3 className="text-uppercase fw-bold text-warning border-bottom pb-2 mb-4">
                    <i className="fa fa-clipboard-list me-2 text-warning"></i>
                    Terms & Conditions
                </h3>
                <div className="row">
                    {terms.map((term, index) => (
                        <TermCard key={index} {...term} />
                    ))}
                </div>
            </div>

            {/* Styles */}
            <style>
                {`
          .hoverTermCard {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .hoverTermCard:hover {
            transform: translateY(-4px);
            box-shadow: 0 0 12px rgba(0,0,0,0.1);
          }
        `}
            </style>
        </div>
    );
}
