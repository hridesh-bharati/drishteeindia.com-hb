import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const baseTitle = "Drishtee Computer Center";

const makeMeta = (titlePart, description) => ({
  title: `${titlePart} - ${baseTitle}`,
  description,
});

const metaData = {
  "/": {
    title: `${baseTitle} | Home`,
    description: "Welcome to Drishtee Computer Center. Learn IT skills from experts.",
  },
  "/About": makeMeta("About Us", "Discover our mission, team, and journey in IT education."),
  "/OurCourses": makeMeta("Courses", "Explore web development, networking, and other computer courses."),
  "/Branch": makeMeta("Branches", "Find our various branch locations and contact details."),
  "/Gallery": makeMeta("Gallery", "Take a look at our campus and student activities."),
  "/AdmissionForm": makeMeta("Admission Form", "Apply now for professional IT training."),
  "/Download-Certificate": makeMeta("Download Certificate", "Check and download your course completion certificates."),
  "/Contact-us": makeMeta("Contact Us", "Reach out for inquiries, support, or feedback."),
  "/Offers": makeMeta("Special Offers", "Check out current offers and discounts on our courses."),
  "/CRepairing": makeMeta("Computer Repairing Course", "Learn professional computer repairing skills."),
  "/Certificate": makeMeta("Certificate", "Information about certificates provided on course completion."),
  "/ComputerLanguage": makeMeta("Computer Languages", "Learn programming languages and computer fundamentals."),
  "/Designing": makeMeta("Designing Courses", "Explore graphic and web designing courses."),
  "/WebDev": makeMeta("Web Development", "Master front-end and back-end web development skills."),
  "/Nielet": makeMeta("Nielet", "Courses and information related to Nielet training."),
  "/Banking": makeMeta("Banking Courses", "Professional courses focused on banking and finance."),
  "/Discription": makeMeta("Description", "Detailed descriptions of our courses and services."),
  "/Library": makeMeta("Library", "Access to study materials, books, and resources."),
  "/Student-Portal/*": makeMeta("Student Portal", "Access your student dashboard and resources."),
  "/Greating": makeMeta("Greeting", "Welcome messages and updates from Drishtee Computer Center."),
  "/Exam": makeMeta("Exam", "Information about exams and assessments."),
  "/Default": makeMeta("Default Page", "Default page for Drishtee Computer Center."),
  "/Admin-Panel/*": makeMeta("Admin Panel", "Administrative dashboard and management tools."), // corrected spelling
  "/Admin-Pannel/*": makeMeta("Admin Panel", "Administrative dashboard and management tools."), // legacy typo, just in case
  "*": {
    title: `Page Not Found - ${baseTitle}`,
    description: "Oops! This page doesn't exist.",
  },
};

// Helper to match dynamic routes (like /Admin-Panel/xyz)
function getMeta(pathname) {
  // Exact match first
  if (metaData[pathname]) return metaData[pathname];
  // Wildcard segment match (e.g. "/Admin-Panel/*")
  for (const key of Object.keys(metaData)) {
    if (key.endsWith("/*")) {
      const base = key.replace("/*", "");
      if (pathname === base || pathname.startsWith(base + "/")) {
        return metaData[key];
      }
    }
  }
  // Fallback
  return metaData["*"];
}

const HelmetManager = ({ children }) => {
  const { pathname } = useLocation();
  const meta = getMeta(pathname);

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        {meta.description && <meta name="description" content={meta.description} />}
      </Helmet>
      {children}
    </>
  );
};

export default HelmetManager;