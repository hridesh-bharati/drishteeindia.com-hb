import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Typed from 'typed.js';
import TopCourseList from "./TopCourseList";
import Features from "./Features";
import Team from "./Team";
import Testimonial from "./Testimonial";
import Footer from "../Footer/Footer";
import QueryForm from "./pages/QueryFrom";
import Offers from "./Offers";
import NoticeBoard from "../HelperCmp/FeaturesUpdate/NoticeBoard";
import TimeTable from "../HelperCmp/FeaturesUpdate/TimeTable";
import CardSlider from "./Cardslider";
import Desc from "./pages/Desc";
import ScrollUp from "../HelperCmp/Scroller/ScrollUp";

const homeItems = [
    {
        title: "Student-Centric Approach",
        content: "We prioritize the needs and aspirations of our students, providing a supportive learning environment.",
        aosDuration: 1000
    },
    {
        title: "Comprehensive Computer Courses",
        content: "We offer a wide range of courses, including programming, web development, networking, and software applications, designed to cater to all skill levels—from beginners to advanced learners.",
        aosDuration: 1500
    },
    {
        title: "Join the Drishtee Community",
        content: "At Drishtee Institute, we believe in creating a supportive community. Participate in workshops, seminars, and networking events that enhance your learning experience and connect you with peers and professionals in the field.",
        aosDuration: 1500
    }
];

const homeButtons = [
    { path: "/Download-Certificate", label: "Result", icon: "fas fa-file-lines", color: "bg-primary" },
    { path: "/Contact-us", label: "Enquiry", icon: "fas fa-headset", color: "bg-success" },
    { path: "/Student-Portal", label: "Students", icon: "fas fa-user-graduate", color: "bg-warning" },
    { path: "/AdmissionForm", label: "Admission", icon: "fas fa-user-plus", color: "bg-danger" },
    { path: "/Gallery", label: "Gallery", icon: "fas fa-images", color: "bg-info" },
    { path: "/Library", label: "Library", icon: "fas fa-book-open", color: "bg-primary" }
];

const sliderImages = [
    'images/mainSlider/slider1.webp',
    'images/mainSlider/slider2.png',
    'images/mainSlider/slider3.webp'
];

function Home() {
    const navigate = useNavigate();
    const aToken = localStorage.getItem('aToken');

    useEffect(() => {
        if (aToken) navigate('/Admin-Pannel');
    }, [aToken, navigate]);

    useEffect(() => {
        const typed1 = new Typed('#element', {
            strings: [
                `“<b style="color:red;">Drishtee </b> envisions a world where all communities are empowered to achieve shared prosperity.”`
            ],
            typeSpeed: 55,
            loop: true,
        });

        const typed2 = new Typed('#diit', {
            strings: [
                "Empowering Tomorrow's Tech Leaders!",
                "Unlocking Your Digital Potential!",
                "Coding Your Future, Today!",
                "Where Innovation Meets Education!",
                "Building Skills for the Digital Age!",
                "Transforming Learners into Developers!",
                "Your Gateway to the Tech World!",
                "Learn. Code. Succeed."
            ],
            typeSpeed: 55,
            loop: true,
        });

        const typed3 = new Typed('#admnow', {
            strings: ["Get your admission now"],
            typeSpeed: 55,
            loop: true,
        });

        return () => {
            typed1.destroy();
            typed2.destroy();
            typed3.destroy();
        };
    }, []);

    useEffect(() => {
        const welcomeText = "\u0928\u092e\u0938\u0915\u093e\u0930, \u0921\u0943\u0937\u094d\u091f\u0940 \u0915\u092e\u094d\u092a\u094d\u092f\u0942\u091f\u0930 \u0938\u0947\u0902\u091f\u0930 \u092e\u0947\u0902 \u0906\u092a\u0915\u093e \u0938\u094d\u0935\u093e\u0917\u0924 \u0939\u0948\u0964 \u0939\u092e \u0906\u092a\u0915\u0940 \u0909\u091c\u094d\u091c\u094d\u0935\u0932 \u092d\u0935\u093f\u0937\u094d\u092f \u0915\u0940 \u0915\u093e\u092e\u0928\u093e \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964";
        if ('speechSynthesis' in window) {
            const utterance = new window.SpeechSynthesisUtterance(welcomeText);
            utterance.lang = 'hi-IN';
            window.speechSynthesis.speak(utterance);
        }
    }, []);

    return (
        <div id="home">
            {/* Carousel */}
            <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="2000">
                <div className="carousel-inner MainCarousel">
                    {sliderImages.map((image, idx) => (
                        <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
                            <img src={image} loading={idx === 0 ? "eager" : "lazy"} width="1200" height="600" className="d-blocks w-100" alt={`Slide ${idx + 1}`} />
                        </div>
                    ))}
                </div>
                {['prev', 'next'].map(direction => (
                    <button
                        key={direction}
                        className={`carousel-control-${direction} `}
                        type="button"
                        data-bs-target="#carouselExampleAutoplaying"
                        data-bs-slide={direction}
                    >
                        <span
                            className={`carousel-control-${direction}-icon`}
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">
                            {direction === 'prev' ? 'Previous' : 'Next'}
                        </span>
                    </button>
                ))}

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

            </div>

            {/* About Section */}
            <div className="container-fluid py-2 about-section">
                <div className="card my-3 rounded-2 border-0 about-card" data-aos="fade-up" data-aos-duration="1000">
                    <div className="card-body">
                        <h5 className="fw-bold text-primary text-uppercase mb-2">Welcome to Drishtee Computer Center</h5>
                        <p className="lh-base text-dark mb-3">Drishtee Institute of Information Technology has been inaugurated at a new location: Paragpur Road, near Sunshine School, Nichlaul, Maharajganj.</p>
                        <h6 className="text-danger mt-3"><b>Drishtee</b> <span id="diit" style={{ color: '#001cff', fontWeight: '600', fontSize: "0.8rem" }}></span></h6>
                    </div>
                    <div className="col-md-2 ms-auto m-2 py-1">
                        <Link to="/Contact-us" className="btn fw-medium border-0 rounded-pill text-primary shadow-sm">Call To Action</Link>
                    </div>
                </div>
            </div>

            {/* Info Cards */}
            <div className="container-fluid my-1 py-4 about-section">
                <div className="row justify-content-center">
                    <div className="col-md-5 text-center">
                        <img src="images/vender/aboutBg.webp" className="img-fluid p-2 rounded shadow-sm" alt="About Drishtee" loading="lazy" />
                    </div>
                    <div className="col-md-7">
                        <div className="p-3">
                            <h2 className="text-primary fw-bold">Drishtee Institute of Information Technology</h2>
                            {homeItems.map((item, idx) => (
                                <div className="card my-3 border-0 shadow-sm border about-card" key={item.title} data-aos="fade-up" data-aos-duration={item.aosDuration}>
                                    <div className="card-body">
                                        <h5 className="text-primary">{item.title}</h5>
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            ))}
                            <Link to="/About" className="btn btn-outline-primary mt-3">View All</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Components */}
            <Desc />
   <div className="mb-4 pb-3" id='absirfdiitBg'>
                <div className="row d-flex align-items-center justify-content-center">
                    <div className='col-md-6 p-md-5 pt-5 px-3'>
                        <h4 className='fs-1 fw-bolder text-white text-center' data-aos="fade-right" data-aos-duration="1000">Join the Drishtee Community</h4>
                        <div className='cardShdow p-4 p-lg-5 rounded-4 text-white' data-aos="fade-up" data-aos-duration="1000">
                            <b className="text-success">Where Dreams come!</b> Drishtee Institute Of Information Technology aims to impart Government approved & recognized courses in the field of computer application.....DIIT is a modern educational Institute setup to inculcate in its students values & attitude that will help them to keep up global perspective and work towards achieving high career growth.
                        </div>
                        <Link to="/Contact-us">
                            <button className="btn btn-primary btn-lg p-3 px-5 mt-5 ms-1">Join Now <i className="bi bi-arrow-right"></i></button>
                        </Link>
                    </div>
                    <div className="col-md-6 position-relative" data-aos="fade-left">
                        <svg viewBox="0 0 581 596" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M161.37 12.301C221.003 -53.0048 563.794 156.411 579.671 299.209C595.548 442.007 237.88 668.171 135.305 571.868C46.2938 488.252 -0.524429 189.658 161.37 12.301Z" fill="url(#paint0_linear_227_946)"></path>
                            <path d="M289.511 579.243C203.626 594.241 -34.778 302.771 4.28926 182.908C43.3565 63.0458 313.639 12.301 483.973 114.853C666.745 224.904 435.092 553.933 289.511 579.243Z" fill="url(#paint1_linear_227_946)"></path>
                            <defs>
                                <linearGradient id="paint0_linear_227_946" x1="172.303" y1="27.9012" x2="521.418" y2="508.929" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#4F5DE4" stopOpacity="0"></stop>
                                    <stop offset="0.269374" stopColor="#9EA6F0" stopOpacity="0.550859"></stop>
                                    <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                                </linearGradient>
                                <linearGradient id="paint1_linear_227_946" x1="123.876" y1="84.092" x2="408.261" y2="553.853" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#FF7200"></stop>
                                    <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="d-flex text-center mPosition">
                            <div className="bg-white p-3 overflow-hidden pt-4 rounded-circle FounderCircle ">
                                <img src="images/vender/A.png" className="img-fluid pt-4" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
            <div className="container-fluid my-2" id="CourseContainer">
                <div className="d-flex align-items-center justify-content-between">
                    <h2 id="courseTitle" className="m-0" data-aos="fade-up" data-aos-duration="1000">
                        <span className="fw-bold text-danger fs-5 d-block">DRISHTEE</span>
                        <span className="fw-bold text-primary">TOP COURSE</span>
                    </h2>
                    <Link to="/AdmissionForm" className="btn btn-sm btn-success me-2 d-flex align-items-center">
                        Admission <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                </div>
                <TopCourseList />
            </div>
            <div className="container-fluid" id="mainCourseEle">
                <CardSlider />
            </div>
            <Features />
            <div className="container my-5">
                <h2 className="fw-bold text-center text-secondary mb-4">
                    <i className="bi bi-link-45deg me-2"></i>Important Links
                </h2>
                <div className="row g-3 justify-content-center">
                    {homeButtons.map((btn) => (
                        <div key={btn.label} className="col-6 col-md-4">
                            <Link to={btn.path} className="text-decoration-none">
                                <div className={`text-white text-center p-3 h-100 rounded-4 shadow-sm ${btn.color} hover-tile`}>
                                    <div className="fs-2 mb-2">
                                        <i className={btn.icon}></i>
                                    </div>
                                    <div className="fw-semibold">{btn.label}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div id="TestimonialParent">
                <Testimonial />
            </div>
            <div className="container-fluid m-1 mx-auto">
                <h2 className="py-2 text-primary text-center fw-bolder" data-aos="fade-right" data-aos-duration="1500">
                    Features And Updates
                </h2>
                <center className="pc-only fw-medium" id="FeatureTextOne" style={{ minHeight: "30px" }}>
                    <span id="element"></span>
                </center>
                <p className="mobile-only text-center" data-aos="fade-left" data-aos-duration="1000" id="FeatureTextTwo">
                    “<b style={{ color: 'red' }}>Drishtee</b> envisions a world where all communities are empowered to achieve shared prosperity.”
                </p>
                <div className="row p-2">
                    <TimeTable />
                    <NoticeBoard />
                </div>
            </div>
            <div id="team">
                <Team />
            </div>
            <div className="row m-auto">
                <div className="col-md-5 mx-auto my-1 offer-section">
                    <Offers />
                </div>
                <div className="col-md-6 mx-auto my-1 p-0" id="signUpNow">
                    <QueryForm />
                </div>
            </div>
            <div className="row myFlex3" style={{ background: "#6a41ed", padding: "40px 20px" }}>
                <div className="col-md-7 d-flex align-items-center" style={{ minHeight: "60px" }}>
                    <h1 className="text-white mb-0" style={{ minHeight: "48px", lineHeight: "48px" }}>
                        <span id="admnow"></span>
                    </h1>
                </div>
                <div className="col-md-5 d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
                    <Link to="/AdmissionForm">
                        <button className="btn btn-light rounded-pill" style={{ width: "200px", animation: "amt 1s infinite" }}>
                            Enroll
                        </button>
                    </Link>

                    <style>{`
    h1 {
      font-size: 48px;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 28px;
        text-align: center;
        width: 100%;
        min-height: 32px;
        line-height: 32px;
      }
    }

    @keyframes amt {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `}</style>
                </div>
            </div>
            <Footer />
            <ScrollUp />
        </div>
    );
}

export default Home;
