import React from 'react';
import Footer from '../../../Footer/Footer';
import CountdownTimer from './Counter';
import LibraryFeatures from './LibraryFeatures';
import ScrollUp from '../../../HelperCmp/Scroller/ScrollUp';
import QueryForm from '../QueryFrom';
import { Link } from 'react-router-dom';

// Colors moved to the top
const colors = [
    'linear-gradient(135deg, #5f72bd, #9b23ea)',
    'linear-gradient(135deg, #11998e, #38ef7d)',
    'linear-gradient(135deg, #f7971e, #ffd200)',
    'linear-gradient(135deg, #56ccf2, #2f80ed)',
];

function LibraryStats() {
    const stats = [
        { icon: "bi-book", label: "Books", value: "50,000+", aos: "fade-left", color: colors[0], delay: 100 },
        { icon: "bi-person", label: "Members", value: "2,300+", aos: "fade-right", color: colors[1], delay: 120 },
        { icon: "bi-clock-history", label: "Open Hours", value: "24/7", aos: "fade-left", color: colors[2], delay: 140 },
        { icon: "bi-globe", label: "Online Resources", value: "12,000+", aos: "fade-right", color: colors[3], delay: 160 },
    ];

    return (
        <section className="py-5 my-2">
            <div className="container">
                <div className="row g-3 justify-content-center text-center">
                    {stats.map((s, i) => (
                        <div className="col-6 col-sm-6 col-md-3" key={i}>
                            <div
                                className="p-4 rounded-3 shadow-lg transition-all hover:shadow-2xl"
                                style={{
                                    color: "white",
                                    background: s.color,
                                    minHeight: "140px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                data-aos={s.aos}
                                data-aos-delay={s.delay} 
                            >
                                <i className={`bi ${s.icon} fs-1 mb-2`}></i>
                                <h4 className="fw-bold mb-0">{s.value}</h4>
                                <small className="mt-2">{s.label}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function Library() {
    const libraryFeatures = [
        [
            { icon: "bi-book-half", title: "Digital Resources", text: "Access to over 50,000 e-books, academic journals, research papers, and digital learning materials." },
            { icon: "bi-wifi", title: "High-Speed WiFi", text: "Seamless high-speed internet connectivity throughout the library for uninterrupted learning." },
            { icon: "bi-laptop", title: "Computer Lab", text: "State-of-the-art computer facilities equipped with the latest software and hardware for research and learning." },
            { icon: "bi-people", title: "Study Groups", text: "Spacious collaborative zones and discussion rooms for group studies and academic interactions." },
        ],
        [
            { icon: "bi-calendar-check", title: "24/7 Access", text: "Round-the-clock access to digital resources and extended hours during examination periods." },
            { icon: "bi-lightning-charge", title: "Inverter Backup", text: "Uninterrupted power supply with inverter backup during outages." },
            { icon: "bi-snow", title: "Air Conditioning", text: "Fully air-conditioned environment for comfortable reading and research." },
            { icon: "bi-camera-video", title: "CCTV Surveillance", text: "24/7 security with CCTV monitoring for a safe and secure environment." },
        ]
    ];

    const generalRules = [
        "Maintain silence in the library premises",
        "Library cards are non-transferable",
        "Keep mobile phones in silent mode",
        "Handle books and equipment with care",
        "No food or drinks allowed inside",
        "Keep your belongings safely"
    ];

    const borrowingRules = [
        "Maximum 3 books can be issued at a time",
        "Books are issued for 14 days",
        "Late fee applies after due date",
        "Lost books must be replaced or compensated",
        "Reference books for in-library use only",
        "Return books in good condition"
    ];

    return (
        <div className="mx-0 px-0 pt-4 about-section bg-white">
            <div className="container-fluid mx-0 px-0 pt-2 mt-35 about-section">
                {/* --- HERO SECTION WITH CAROUSEL --- */}
                <div className="position-relative">
                    <div id="libraryCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner ratio ratio-16x9" data-aos="fade-up">
                            <div className="carousel-item active">
                                <img
                                    src="images/library/library.webp"
                                    alt="DIIT Library"
                                    className="w-100 h-100 animate-img"
                                    style={{ objectFit: "cover", objectPosition: "center" }}
                                />
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="images/vender/homepic.webp"
                                    alt="DIIT Library"
                                    className="w-100 h-100 animate-img"
                                    style={{ objectFit: "cover", objectPosition: "center" }}
                                />
                            </div>
                        </div>
                        {/* Carousel Controls */}
                        <button className="carousel-control-prev" type="button" data-bs-target="#libraryCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#libraryCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                    {/* Overlayed Hero Text (Visible only on large screens) */}
                    <div className="position-absolute top-50 start-50 translate-middle text-center d-none d-lg-block diitLibrary about-card w-75" data-aos="fade-down">
                        <div
                            className="card border-0 about-card shadow-lg p-4 animate-fadeIn"
                        >
                            <div className="card-body" data-aos="fade-down" data-aos-delay="200">
                                <h1 className="display-3 fw-bold text-primary mb-3">DRISHTEE LIBRARY</h1>
                                <p className="text-dark mb-4 fs-5">
                                    Welcome to DIIT's state-of-the-art library – your gateway to knowledge and academic excellence.
                                    Our modern facility combines traditional resources with cutting-edge digital technology to provide an optimal learning environment for students and faculty alike.
                                </p>
                                <a className="btn btn-primary btn-lg shadow-lg px-4" href="#features">
                                    Explore Resources <i className="bi bi-arrow-down"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- QUICK STATS --- */}
                <LibraryStats />

                {/* --- Library Features Section --- */}
                <LibraryFeatures />

                {/* --- FEATURES --- */}
                <div className="bg-primary-subtle dark-bg">
                    <div id="features" className="py-5">
                        <div className="container my-5">
                            <h2 className="text-center mb-5 fw-bolder text-primary animate-fadeUp">Our Library Features</h2>
                            <div className="row g-4">
                                {libraryFeatures.flat().map(({ icon, title, text }, idx) => (
                                    <div key={idx} className="col-12 col-md-6 col-lg-3">
                                        <div className="card h-100 border-0 shadow-sm p-3 bg-white rounded-4 text-center hover-shadow">
                                            <div className="card-body">
                                                <i className={`bi ${icon} text-primary fs-1 mb-3`}></i>
                                                <h5 className="card-title fw-bolder">{title}</h5>
                                                <p className="card-text">{text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <section className="py-5">
                    <div className="container text-center" data-aos="fade-up">
                        <h2 className="fw-bold text-primary mb-5">Library Rules</h2>
                        <div className="row justify-content-center g-4">
                            <div className="col-md-5" data-aos="fade-right">
                                <div className="p-4 rounded-4 border bg-light h-100 shadow-sm">
                                    <h4 className="text-primary mb-3 fw-bold">General Rules</h4>
                                    <ul className="list-group list-group-flush text-start">
                                        {generalRules.map((rule, i) => (
                                            <li key={i} className="list-group-item border-0 ps-0 bg-light">
                                                <i className="bi bi-check-circle-fill text-success me-2"></i> {rule}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-5" data-aos="fade-left">
                                <div className="p-4 rounded-4 border bg-light h-100 shadow-sm">
                                    <h4 className="text-primary mb-3 fw-bold">Borrowing Rules</h4>
                                    <ul className="list-group list-group-flush text-start">
                                        {borrowingRules.map((rule, i) => (
                                            <li key={i} className="list-group-item border-0 ps-0 bg-light">
                                                <i className="bi bi-check-circle-fill text-success me-2"></i> {rule}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- COUNTDOWN TIMER --- */}
                <CountdownTimer />

                {/* --- CONTACT & EVENTS --- */}
                <div className="container my-5 px-3">
                    <div className="row g-4">
                        {/* Contact Info */}
                        <div className="col-md-6">
                            <div className="p-4 border rounded-4 bg-light h-100 shadow-sm">
                                <h4 className="text-primary fw-bolder mb-3">Contact Details</h4>
                                <p className="mb-2"><i className="bi bi-telephone-fill me-2 text-primary"></i>9918151032 &nbsp; <i className="bi bi-telephone-fill me-2 text-primary"></i>7267995307</p>
                                <p className="mb-2"><i className="bi bi-envelope-fill me-2 text-success"></i>ajtiwari45@gmail.com <br /> <i className="bi bi-envelope-fill me-2 text-success"></i>hridesh027@gmail.com </p>
                                <p><i className="bi bi-geo-alt-fill me-2 text-danger"></i>Paragpur Road near sunshine school, Nichlaul, Maharajganj<br />Uttar Pradesh, India</p>
                                <div className="mt-4">
                                    <h6 className="text-dark">Connect With Us:</h6>
                                    <div className="d-flex gap-3 mt-2">
                                        <Link to="#" className="text-decoration-none text-primary fs-4"><i className="bi bi-facebook"></i></Link>
                                        <Link to="#" className="text-decoration-none text-info fs-4"><i className="bi bi-twitter"></i></Link>
                                        <Link to="#" className="text-decoration-none text-danger fs-4"><i className="bi bi-instagram"></i></Link>
                                        <Link to="#" className="text-decoration-none text-primary fs-4"><i className="bi bi-linkedin"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Opening Hours */}
                        <div className="col-md-6">
                            <div className="p-4 border rounded-4 bg-light h-100 shadow-sm">
                                <h4 className="text-primary fw-bolder mb-3">Opening Hours</h4>
                                <p className="mb-2"><i className="bi bi-clock-fill me-2 text-danger"></i>Monday - sunday</p>
                                <p className="mb-2">6:00 AM - 10:00 PM</p>
                                <div className="mt-4">
                                    <h6 className="text-dark">Upcoming Events:</h6>
                                    <ul className="list-unstyled mt-2">
                                        <li className="mb-2">
                                            <i className="bi bi-calendar-event me-2 text-primary"></i>
                                            Tech Workshop - June 15, 2026
                                        </li>
                                        <li>
                                            <i className="bi bi-calendar-event me-2 text-primary"></i>
                                            Coding Competition - July 1, 2026
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CTA --- */}
                {/* --- CTA --- */}
                <div
                    className="container-fluid text-white py-5"
                    style={{ background: "linear-gradient(135deg, #0052D4, #4364F7, rgb(84, 164, 255))" }}
                    data-aos="zoom-in"
                >
                    <div className="container text-center">
                        <h2 className="mb-4 fw-bold" data-aos="fade-up">Ready to Start Your Tech Journey?</h2>
                        <p className="lead mb-4" data-aos="fade-up" data-aos-delay="100">
                            Join hundreds of successful students who launched their careers with <strong>Drishtee</strong>
                        </p>
                        <div
                            className="d-flex justify-content-center gap-3 flex-wrap"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <a
                                href="tel:+919918151032"
                                className="btn btn-warning btn-lg px-4 text-dark fw-semibold shadow"
                            >
                                <i className="bi bi-telephone-fill me-2"></i> Call Now
                            </a>
                            <a
                                href="https://wa.me/919918151032"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-success btn-lg px-4 fw-semibold shadow"
                            >
                                <i className="bi bi-whatsapp me-2"></i> WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>


                {/* --- Map & Query Form --- */}
                <div className="container-fluid py-5">
                    <h2 className="text-center mt-4 mb-4 fw-bold text-primary">Locate Us</h2>
                    <div className="row align-items-center g-4">
                        <div className="col-md-6 mb-md-0">
                            <div className="rounded-4 overflow-hidden shadow-sm">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221.54797399460082!2d83.72486270964144!3d27.320461487836297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399419806e859715%3A0x542e82fbb42e0941!2sDRISHTEE%20COMPUTER%20CENTER%20NICHLAUL!5e0!3m2!1sen!2sin!4v1752075044710!5m2!1sen!2sin "
                                    width="100%"
                                    height="500"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Drishtee Map"
                                ></iframe>


                            </div>

                        </div>
                        <div className="col-md-6 p-0 m-0">
                            <QueryForm />
                        </div>
                    </div>
                </div>
                <style>
                    {`
                    .carousel-control-prev-icon,
                    .carousel-control-next-icon {
                    width: 1px;
                    height: 1px;
                    background-size: 100% 100%;
                    }
                `}
                </style>
                <Footer />
                <ScrollUp />
            </div>
        </div>
    );
}
