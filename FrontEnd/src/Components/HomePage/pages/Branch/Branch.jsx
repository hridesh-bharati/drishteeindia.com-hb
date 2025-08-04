import React, { useEffect } from 'react';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import Footer from '../../../Footer/Footer';
import QueryForm from '../QueryFrom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Counter from './Counter';
import ScrollUp from '../../../HelperCmp/Scroller/ScrollUp';

// Helper Components
const SectionTitle = ({ children, subtitle }) => (
    <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: "#00268f" }}>{children}</h2>
        {subtitle && <p className="lead">{subtitle}</p>}
    </div>
);

const FeatureCard = ({ icon, title, text, iconColor }) => (
    <div className="col-md-4 my-3" data-aos="fade-up">
        <div className="card border border-light shadow-sm h-100 hover-shadow-lg transition-all">
            <div className="card-body text-center px-4 py-5">
                <i className={`bi ${icon} fs-1 ${iconColor} mb-3`}></i>
                <h5 className="card-title mt-2 text-primary">{title}</h5>
                <p className="card-text">{text}</p>
            </div>
        </div>
    </div>
);

const ProgramCard = ({ program, index }) => (
    <div className="col-md-4 my-3" data-aos="fade-up">
        <div className="card shadow-sm border-0 hover-shadow-lg transition-all h-100">
            <div className="card-body px-4 py-5">
                <i className={`bi ${program.icon} fs-1 ${program.iconColor} mb-3`}></i>
                <h5 className="card-title mt-2 text-primary">{program.title}</h5>
                <p className="card-text">{program.text}</p>
                <div className="program-details mt-3">
                    <p><strong>Duration:</strong> {program.duration}</p>
                    <p><strong>Course Fee:</strong> {program.fee}</p>
                    <button className="btn btn-sm btn-outline-primary mt-2" data-bs-toggle="collapse" data-bs-target={`#programDetails${index}`}>
                        View Details
                    </button>
                    <div className="collapse mt-2" id={`programDetails${index}`}>
                        <div className="card card-body bg-light">
                            {program.details}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const MethodologyPoint = ({ point, index }) => (
    <div
        className="methodology-point mb-3"
        data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
        data-aos-delay={300 + index * 100}
    >
        <h5 className="text-primary">{point.title}</h5>
        <p>{point.description}</p>
    </div>
);

function Branch() {
    useEffect(() => {
        const typed = new Typed('#typingAmt', {
            strings: ['Growing.', 'Faster.', 'Bigger.'],
            typeSpeed: 50,
            loop: true,
        });
        return () => typed.destroy();
    }, []);

    useEffect(() => {
        AOS.init({ duration: 900, once: true });
    }, []);

    // Data
    const features = [
        {
            icon: 'bi-person-circle',
            title: 'Expert Guidance',
            text: 'Our experts provide tailored guidance to help students navigate the tech industry.',
            iconColor: 'text-primary',
        },
        {
            icon: 'bi-clock',
            title: 'Flexible Timings',
            text: 'Our flexible class timings are designed to fit into your busy schedule.',
            iconColor: 'text-danger',
        },
        {
            icon: 'bi-mortarboard',
            title: 'Certification Programs',
            text: 'We offer certification programs that give our students the edge they need in the job market.',
            iconColor: 'text-warning',
        },
    ];

    const programs = [
        {
            icon: 'bi-laptop',
            title: 'Web Development',
            text: 'Learn the latest technologies to build modern websites and web applications.',
            iconColor: 'text-primary',
            details: 'Our comprehensive web development program covers HTML5, CSS3, JavaScript, React, Node.js, and MongoDB. Students gain hands-on experience through real-world projects and build a professional portfolio.',
            duration: '6 Months',
            fee: '₹15,000'
        },
        {
            icon: 'bi-graph-up',
            title: 'Data Science',
            text: 'Master data analysis, machine learning, and AI technologies to solve real-world problems.',
            iconColor: 'text-warning',
            details: 'This intensive program teaches Python for data science, statistical analysis, machine learning algorithms, data visualization, and big data technologies. Perfect for aspiring data scientists and analysts.',
            duration: '8 Months',
            fee: '₹20,000'
        },
        {
            icon: 'bi-phone',
            title: 'Mobile App Development',
            text: 'Build powerful and responsive mobile applications for both Android and iOS.',
            iconColor: 'text-danger',
            details: 'Learn to develop cross-platform mobile applications using Flutter and React Native. Course includes UI/UX principles, API integration, and app publishing to Google Play and Apple App Store.',
            duration: '5 Months',
            fee: '₹18,000'
        },
    ];

    const methodologyPoints = [
        {
            title: "Project-Based Learning",
            description:
                "Students work on real-world projects throughout the course, building a professional portfolio that showcases their skills to potential employers.",
        },
        {
            title: "Industry Mentorship",
            description:
                "Our students receive guidance from industry professionals who provide insights into current trends and hiring expectations.",
        },
        {
            title: "Continuous Assessment",
            description:
                "Regular coding challenges, quizzes, and project reviews ensure students stay on track and master each concept before moving forward.",
        },
    ];

    const faqs = [
        {
            question: 'What are the admission requirements?',
            answer: 'We require basic computer knowledge and passion for technology. For advanced courses, we assess your current skill level to ensure proper placement.'
        },
        {
            question: 'Do you provide placement assistance?',
            answer: 'Yes, we have a dedicated placement cell that helps with resume building, interview preparation, and connecting students with our industry partners.'
        },
        {
            question: 'Are there any discounts available?',
            answer: 'We offer early bird discounts and scholarships for meritorious students. Please contact our admission office for current offers.'
        },
        {
            question: 'What is the class size?',
            answer: 'We maintain small batch sizes (15-20 students) to ensure personalized attention for each learner.'
        }
    ];

    const sections = [
        {
            title: 'Our Vision',
            content: 'Our vision is to be the leading institution that transforms the lives of students by providing them with the tools, knowledge, and networks needed to thrive in an ever-evolving tech industry. We aim to cultivate a generation of innovators, problem-solvers, and future leaders who will shape the digital landscape.',
        },
        {
            title: 'Student Support',
            content: "At Drishtee, we understand that education extends beyond the classroom. That's why we offer a variety of student support services to help you succeed. From career counseling to mental wellness programs, we are dedicated to helping you balance your academic, professional, and personal life.",
        },
        {
            title: 'Get Involved',
            content: "Drishtee is not just a place to learn—it's a community. We encourage our students to participate in clubs, events, and industry collaborations. Join our network of like-minded individuals who are passionate about technology and innovation. Get involved in our coding clubs, attend our workshops, and connect with alumni who are making a difference in the world.",
        },
    ];

    // Carousels
    const galleryImages = ["d1", "d2", "d3", "d4", "d5", "d6"];
    const heroCarousel = [
        { src: './images/library/d1.jpg', alt: 'DIIT' },
        { src: './images/library/d2.jpg', alt: 'DIIT' },
    ];
    const campusCarousel = [
        { src: './images/library/tdiit.webp', alt: 'DIIT' },
        { src: './images/library/teacher.webp', alt: 'DIIT' },
    ];

    return (
        <div>
            <div className="mx-sm-0 px-sm-0 pt-4">
                {/* Hero Carousel */}
                <div id="mainCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
                    <div className="carousel-inner shadow-sm overflow-hidden">
                        {[1, 2].map((n, i) => (
                            <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                                <img
                                    src={`images/library/d${n}.jpg`}
                                    className="d-block w-100 object-fit-cover carousel-img-mobile"
                                    alt={`Slide ${n}`}
                                />
                            </div>
                        ))}
                    </div>
                    {["prev", "next"].map(dir => (
                        <button
                            key={dir}
                            className={`carousel-control-${dir}`}
                            type="button"
                            data-bs-target="#mainCarousel"
                            data-bs-slide={dir}
                        >
                            <span className={`carousel-control-${dir}-icon`} aria-hidden="true" />
                            <span className="visually-hidden">{dir === "prev" ? "Previous" : "Next"}</span>
                        </button>
                    ))}
                </div>

                {/* Typed Text */}
                <div className="container text-center fs-4 fw-bold mb-4">
                    <div className="row">
                        <div className="col-12" id="BranchTypingText">
                            <small>
                                Drishtee Computer Center is{' '}
                                <span className="text-warning" id="typingAmt"></span>
                            </small>
                        </div>
                    </div>
                </div>

                {/* Hero Section with Info and Image Carousel */}
                <div className="container-fluid py-3 bg-white about-card">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 mb-4 mb-lg-0">
                                <div className="col-md-12 pt-4" data-aos="fade-right" data-aos-delay="200">
                                    <h3 className="fw-bold mb-3" style={{ color: "#00268f", fontSize: "2rem" }}>
                                        WELCOME TO <span style={{ color: "#ff6b00" }}>DRISHTEE COMPUTER CENTER</span>
                                    </h3>
                                    <span className='d-block mb-3 small fw-medium'>
                                        📍 Main Market Road ,Behind of pakli Mandi Thoothibari Maharajganj.
                                    </span>
                                </div>
                                <p className="text-dark" data-aos="fade-up" data-aos-delay="400" style={{ lineHeight: "1.8", fontSize: "1rem" }}>
                                    Drishtee Institute of Technology, founded in 2018, is recognized as one of the top technical computer institutes in the region. Our mission is to empower students with practical, job-ready skills through innovative teaching and an industry-aligned curriculum.
                                </p>
                                <p className="text-dark" data-aos="fade-up" data-aos-delay="600" style={{ lineHeight: "1.8", fontSize: "1rem" }}>
                                    Located in the heart of thoothibari, our center boasts modern computer labs, experienced faculty, and a nurturing learning environment that fosters talent and supports professional growth.
                                </p>
                            </div>
                            {/* Carousel */}
                            <div className="col-lg-6">
                                <div data-aos="zoom-in" data-aos-delay="300">
                                    <div id="heroCarousel" className="carousel slide carousel-fade rounded-4 overflow-hidden shadow" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            {heroCarousel.map((item, index) => (
                                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="2000">
                                                    <img src={item.src} className="d-block w-100 img-fluid" alt={item.alt} style={{ height: 350, objectFit: "cover" }} />
                                                </div>
                                            ))}
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Counter />
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="container py-5">
                    <SectionTitle>Why Choose Our Institute?</SectionTitle>
                    <div className="row text-center">
                        {features.map((feature, i) => <FeatureCard {...feature} key={i} />)}
                    </div>
                </div>

                {/* Programs */}
                <div className="container py-5">
                    <SectionTitle subtitle="Choose from our industry-relevant courses designed to launch your tech career">
                        Our Comprehensive Programs
                    </SectionTitle>
                    <div className="row">
                        {programs.map((program, i) => <ProgramCard program={program} index={i} key={i} />)}
                    </div>
                </div>

                {/* Methodology & Campus Carousel */}
                <div className="container-fluid bg-white about-card py-5">
                    <div className="container">
                        <div className="row align-items-center">
                            {/* Methodology */}
                            <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right" data-aos-delay="100">
                                <h2 className="fw-bold mb-4" data-aos="zoom-in" data-aos-delay="200">Our Unique Learning Approach</h2>
                                {methodologyPoints.map((point, i) => <MethodologyPoint point={point} index={i} key={i} />)}
                            </div>
                            {/* Carousel */}
                            <div className="col-lg-6" data-aos="flip-left" data-aos-delay="350">
                                <div id="campusCarousel" className="carousel slide carousel-fade rounded-4 shadow overflow-hidden" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {campusCarousel.map((item, i) => (
                                            <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`} data-bs-interval="2000">
                                                <img src={item.src} className="d-block w-100 img-fluid" alt={item.alt} style={{ height: 300, objectFit: "cover" }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="container py-5" data-aos="fade-up">
                    <SectionTitle>Our Campus Life</SectionTitle>
                    <p className="text-center mb-4">Explore moments from our vibrant learning community</p>
                    <div className="row g-4">
                        {galleryImages.map((num, i) => (
                            <div className="col-md-4 mb-4" key={i}>
                                <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                                    <img src={`images/library/${num}.jpg`} className="card-img-top object-fit-cover" alt={`Gallery ${num}`} style={{ height: 250, objectFit: "cover" }} loading="lazy" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sections */}
                <div className="container mb-5">
                    {sections.map((section, i) => (
                        <div key={i} className="mb-4">
                            <h3 className="mb-2 text-primary">{section.title}</h3>
                            <div>{section.content}</div>
                        </div>
                    ))}
                </div>

                {/* FAQ */}
                <div className="container py-5">
                    <SectionTitle>Frequently Asked Questions</SectionTitle>
                    <div className="row">
                        {faqs.map((faq, i) => (
                            <div className="col-md-6 my-3" key={i}>
                                <div className="card shadow-sm border-0 h-100 rounded-4">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">{faq.question}</h5>
                                        <p className="card-text">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact and Hours */}
                <div className="container my-5 px-3">
                    <div className="row g-4">
                        {/* Contact Info */}
                        <div className="col-md-6">
                            <div className="p-4 border rounded-4 bg-light h-100 shadow-sm">
                                <h4 className="text-primary mb-3">Contact Details</h4>
                                <p className="mb-2"><i className="bi bi-telephone-fill me-2 text-secondary"></i>+91 7398889347</p>
                                <p className="mb-2"><i className="bi bi-envelope-fill me-2 text-secondary"></i>chauhansantosh045@gmail.com</p>
                                <p><i className="bi bi-geo-alt-fill me-2 text-secondary"></i>Thoothibari, District Maharajganj<br />Uttar Pradesh, India</p>
                                <div className="mt-4">
                                    <h6 className="text-dark">Connect With Us:</h6>
                                    <div className="d-flex gap-3 mt-2">
                                        <a href="#" className="text-decoration-none text-primary fs-4"><i className="bi bi-facebook"></i></a>
                                        <a href="#" className="text-decoration-none text-info fs-4"><i className="bi bi-twitter"></i></a>
                                        <a href="#" className="text-decoration-none text-danger fs-4"><i className="bi bi-instagram"></i></a>
                                        <a href="#" className="text-decoration-none text-primary fs-4"><i className="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Opening Hours */}
                        <div className="col-md-6">
                            <div className="p-4 border rounded-4 bg-light h-100 shadow-sm">
                                <h4 className="text-primary mb-3">Opening Hours</h4>
                                <p className="mb-2"><i className="bi bi-clock-fill me-2 text-secondary"></i>Monday - Saturday</p>
                                <p className="mb-2">6:00 AM - 7:00 PM</p>
                                <p className="text-danger fw-semibold">Closed on Sundays</p>
                                <div className="mt-4">
                                    <h6 className="text-dark">Upcoming Events:</h6>
                                    <ul className="list-unstyled mt-2">
                                        <li className="mb-2">
                                            <i className="bi bi-calendar-event me-2 text-primary"></i>
                                            Tech Workshop - June 15, 2023
                                        </li>
                                        <li>
                                            <i className="bi bi-calendar-event me-2 text-primary"></i>
                                            Coding Competition - July 1, 2023
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="container-fluid text-white py-5" style={{ background: "linear-gradient(135deg, #0052D4, #4364F7, rgb(84, 164, 255))" }}>
                    <div className="container text-center">
                        <h2 className="mb-4 fw-bold">Ready to Start Your Tech Journey?</h2>
                        <p className="lead mb-4">Join hundreds of successful students who launched their careers with <strong>Drishtee</strong></p>
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            <a href="tel:+917398889347" className="btn btn-warning btn-lg px-4 text-dark fw-semibold shadow">
                                <i className="bi bi-telephone-fill me-2"></i> Call Now
                            </a>
                            <a href="https://wa.me/917398889347" target="_blank" rel="noopener noreferrer" className="btn btn-success btn-lg px-4 fw-semibold shadow">
                                <i className="bi bi-whatsapp me-2"></i> WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>

                {/* Map & Query Form */}
                <div className="container-fluid bg-light">
                    <h2 className="text-center mt-4 mb-4 fw-bold text-primary">Locate Us</h2>
                    <div className="row align-items-center g-4">
                        <div className="col-md-6 mb-md-0">
                            <div className="rounded-4 overflow-hidden shadow-sm">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.3484879661028!2d83.69061145032624!3d27.427248144117375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39942392249c9073%3A0x6b62ef81415149dd!2sDrishtee%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2sin!4v1696133570458!5m2!1sen!2sin"
                                    width="100%"
                                    height="350"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Drishtee Map"
                                ></iframe>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <QueryForm />
                        </div>
                    </div>
                </div>

                <Footer />
                <ScrollUp />
            </div>
        </div>
    );
}

export default Branch;