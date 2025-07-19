import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import AOS from 'aos';
import 'aos/dist/aos.css';

// Constants for facilities and amenities
const facilities = [
  {
    title: 'Meeting Rooms',
    img: 'images/vender/meeting-room.jpg',
    description: 'Well-equipped spaces for group discussions, online interviews, and collaborative project work with privacy and comfort.',
    icon: 'fas fa-users',
  },
  {
    title: 'Reading Hall',
    img: 'images/vender/reading-hall.jpg',
    description: 'A quiet, spacious, and well-lit area dedicated to uninterrupted self-study and reading. Ideal for students preparing for exams.',
    icon: 'fas fa-book-reader',
  },
  {
    title: 'Cafeteria',
    img: 'images/vender/cefeteria.jpg',
    description: 'Hygienic and affordable meals, snacks, and beverages served fresh. Perfect for a quick break between classes.',
    icon: 'fas fa-utensils',
  },
  {
    title: 'Digital Library',
    img: 'images/vender/onlineclass.jpg',
    description: 'Access a vast collection of e-books, video lectures, tutorials, and research materials from leading platforms.',
    icon: 'fas fa-laptop-code',
  },

];

const amenities = [
  'High-speed internet and Wi-Fi connection',
  'Fully air-conditioned environment',
  'Safe and secure with high-tech CCTV surveillance',
  'Uninterrupted power backup',
  'Ergonomic chairs for long study sessions',
  'Relaxation rooms for breaks',
  'Separate dining area',
  'Secure lockers',
  'Free RO water',
  'Stationery supplies (notebooks, pens, etc.)',
  'Clean western bathrooms (separate for boys and girls)',
  'Complimentary newspapers',
  'Ample parking',
  'Modern pantry with microwave, refrigerator, and OTG',
];

const FacilityCard = ({ title, img, description, icon, index }) => (
  <div className="col-12 col-md-6 col-lg-6 px-0" data-aos="zoom-in" data-aos-delay={index * 150}>
    <div className="card h-100 border-0 rounded-0 overflow-hidden shadow-sm transition-all hover:shadow-xl m-1">
      <img
        src={img}
        className="img-fluid"
        alt={title}
        style={{ height: '250px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <i className={`${icon} text-info`} style={{ fontSize: '2rem', marginRight: '10px' }}></i>
          <h5 className="card-title text-info mb-0">{title}</h5>
        </div>
        <p className="card-text">{description}</p>
        <Link to="#!" className="btn btn-primary w-100">Read More</Link>
      </div>
    </div>
  </div>
);

const LibraryFeatures = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-out-back',
    });
  }, []);

  return (
    <div className="container-fluid py-5 m-0 bg-white dark-bg">
      {/* Hero Section */}
      <div className="hero-section text-white text-center bg-primary py-5 m-0 px-0">
        <div className="position-relative z-index-2">
          <h1 className="fw-bolder display-4" data-aos="fade-up">Welcome to Drishtee Computer Center</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="300">Empowering your learning with modern facilities and a comfortable environment.</p>
          <Link to="#facilities" className="btn btn-light btn-lg mt-3" data-aos="zoom-in">Explore Our Facilities</Link>
        </div>
      </div>

      {/* Facilities Section */}
      <div id="facilities" className="container-fluid my-3 p-sm-5">
        <div className="row g-4">
          {facilities.map((facility, index) => (
            <FacilityCard key={index} {...facility} index={index} />
          ))}
        </div>
        <div className="text-center mt-5" data-aos="fade-up">
          <Link to="#!" className="btn btn-primary px-4 py-2">More Services</Link> 
        </div>
      </div>

      {/* Amenities Section */}
      <div className="container py-5 px-md-5 px-0">
        <div className="row align-items-center g-5">
          <div className="col-lg-5" data-aos="fade-right">
            <img
              src="images/vender/librarypic2.jpg"
              className="img-fluid"
              alt="Library Interior"
              style={{ objectFit: 'cover', height: '100%' }}
            />
          </div>
          <div className="col-lg-7" data-aos="fade-left">
            <h2 className="text-primary mb-4 fw-bolder">Premium Study Lounge with Top-Notch Amenities</h2>
            <ul className="list-unstyled">
              {amenities.map((item, index) => (
                <li key={index} className="mb-2" data-aos="fade-up" data-aos-delay={index * 50}>
                  <i className="fas fa-check-circle text-primary me-2"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryFeatures;
