import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Team = () => {
  const tpath = "images/team/team";

  const [hrideshData, setHrideshData] = useState({
    name: "Hridesh Rao",
    bio: "Frontend & MERN Stack Developer",
    image: "",
    repos: 0,
  });

  useEffect(() => {
    fetch("https://api.github.com/users/hridesh-bharati")
      .then((res) => res.json())
      .then((data) => {
        setHrideshData({
          name: data.name || "Hridesh Rao",
          bio: data.bio || "Frontend & MERN Stack Developer",
          image: data.avatar_url || "",
          repos: data.public_repos || 0,
        });
      })
      .catch((err) => console.error("GitHub fetch error:", err));
  }, []);

  const expertData = [
    {
      name: "Mr. Ajay Tiwari",
      role: "Director",
      bio: "Founder of DIIT with 20+ years of experience in IT and education. Leading with vision and passion.",
      image: `${tpath}1.png`,
      badges: ["🎓 Education Expert", "🥇 Top Mentor"],
      socialLinks: {
        phone: "tel:+919918151032",
        whatsapp: "https://wa.me/919918151032",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Santosh Chauhan",
      role: "Center Head",
      bio: "Handles administrative operations, student support, and strategic decisions with utmost dedication.",
      image: `${tpath}2.png`,
      badges: ["🎯 Management Pro"],
      socialLinks: {
        phone: "tel:+917398889347",
        whatsapp: "https://wa.me/917398889347",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Manjesh Vishwakarma",
      role: "Senior Accounts Executive",
      bio: "Specialist in digital finance, business accounting, and official documentation with a strong focus on accuracy and compliance.",
      image: `${tpath}3.png`,
      badges: ["📈 Financial Compliance"],
      socialLinks: {
        phone: "tel:+919621444858",
        whatsapp: "https://wa.me/919621444858",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: hrideshData.name,
      role: "Technical Instructor & Lab Coordinator",
      bio: hrideshData.bio,
      image: hrideshData.image,
      repoCount: hrideshData.repos,
      badges: [
        "🚀 MERN Specialist",
        ...(hrideshData.repos >= 100
          ? ["🏆 GitHub Legend"]
          : hrideshData.repos >= 50
            ? ["🌟 GitHub Master"]
            : hrideshData.repos >= 20
              ? ["⭐ Star Developer"]
              : []),
      ],
      socialLinks: {
        phone: "tel:+917267995307",
        whatsapp: "https://wa.me/917267995307",
        linkedin: "https://www.linkedin.com/in/hridesh-bharati-95867425b/",
        github: "https://github.com/hridesh-bharati",
      },
    },
  ];

  const socialIcons = {
    phone: "bi-telephone-fill",
    whatsapp: "bi-whatsapp",
    linkedin: "bi-linkedin",
    github: "bi-github",
  };

  return (
    <>

      <section className="py-4" id="team">
        <div className="container-fluid">
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Meet Our <span className="text-gradient">Expert Team</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: 600, margin: "auto" }}>
              Passionate educators and professionals shaping the future of tech and business education.
            </p>
          </div>

          <div className="row g-4 my-1">
            {expertData.map(({ name, role, bio, image, socialLinks, repoCount, badges }) => (
              <div className="col-12 col-sm-6 col-lg-3 my-5" key={name}>
                <div className="expert-card">
                  <div className="expert-avatar-wrapper">
                    <img src={image} alt={name} className="expert-avatar" loading="lazy" />
                  </div>

                  <div className="expert-name">{name}</div>
                  <div className="expert-role">{role}</div>

                  {badges?.length > 0 && (
                    <div className="d-flex flex-wrap justify-content-center mb-2">
                      {badges.map((badge, idx) => (
                        <span key={idx} className="badge-tag">{badge}</span>
                      ))}
                    </div>
                  )}

                  <div className="expert-bio">{bio}</div>

                  {typeof repoCount === "number" && (
                    <div className="expert-repos">
                      <span className="badge bg-dark">
                        <i className="bi bi-journal-code me-1" />
                        {repoCount} Public GitHub Repos
                      </span>
                    </div>
                  )}

                  <div className="expert-social mt-3">
                    {["phone", "whatsapp", "linkedin", "github"].map((key) => {
                      const url = socialLinks[key];
                      if (!url) return null;
                      const isPhone = key === "phone";
                      return (
                        <a
                          key={key}
                          href={url}
                          target={isPhone ? undefined : "_blank"}
                          rel={isPhone ? undefined : "noopener noreferrer"}
                          className="m-2 fs-4"
                          title={key.charAt(0).toUpperCase() + key.slice(1)}
                        >
                          <i className={`bi ${socialIcons[key]}`}></i>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
