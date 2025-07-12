import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import './Desc.css';

const FeaturedCourse = () => {
  return (
    <div className="row my-1 mx-auto py-5" id="featuredCourseBg">
      {/* Text Content */}
      <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
        <div className="p-4 bg-white shadow-sm rounded h-100 d-flex flex-column justify-content-between featured-course-card">
          <div className="d-flex justify-content-between mb-3">
            <span className="text-danger fw-bold">Featured</span>
            <span className="text-muted">
              Price: <span className="text-dark fw-semibold">₹ 00</span>
            </span>
          </div>

          <h3 className="mb-3">
            <Link to="/OurCourses" className="text-decoration-none text-primary">
              CCC Free 1-Year Course <br />
              & Other Long-Term Programs
            </Link>
          </h3>

          <p className="text-secondary">
            Drishtee Computer Center offers a completely free 1-year CCC course designed for rural students, similar to ADCA and other foundational digital programs.
            Our goal is to equip learners with essential computer skills that open doors to employment, self-employment, and higher education.
            Enroll today and take the first step toward a digitally empowered future.
          </p>

          <div className="d-flex align-items-center mt-4">
            <span className="text-muted">
              By <span className="text-dark">Drishtee Computer Center</span>
            </span>
            <span className="ms-auto text-muted"><strong>1,024</strong> Enrolled</span>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="col-lg-6" data-aos="fade-left">
        <div
          className="rounded shadow-sm featured-course-img"
          style={{
            background: 'url(images/vender/featured.jpg) center/cover no-repeat',
            minHeight: "350px",
            height: '100%'
          }}
        />
      </div>
    </div>
  );
};

const Desc = () => {
  const leftCourses = [
    'Computer Fundamentals',
    'Office Productivity Tools',
    'Internet & Email',
    'Digital Literacy (PMGDISHA)',
    'Graphic Designing',
    'Web Development',
    'Typing & Data Entry Skills',
  ];

  const rightCourses = [
    'Tally & Accounting Software',
    'Digital Marketing',
    'Cyber Security',
    'Mobile App Usage & Services',
    'E-Governance & Online Services',
    'Spoken English / Soft Skills',
    'Entrepreneurship / Freelancing Skills',
  ];

  return (
    <section className="courses-area section-gap bg-light" id="descCoursesBg">

      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-4 px-4 mb-lg-0" data-aos="fade-up">
            <h2 className="section-title mb-3 fw-bolder">
              Empowering Rural <br /> India Through Digital Learning
            </h2>
            <p className="section-description mb-4">
              Drishtee Computer Center is dedicated to bridging the digital divide by providing affordable, high-quality computer education to rural communities.
              Our courses are designed to equip learners with the digital skills necessary for employment, entrepreneurship, and continued learning.
              Join us to build a self-reliant, digitally empowered India.
            </p>
            <Link to="/OurCourses" className="primary-btn white">
              Explore Courses
            </Link>
          </div>

          <div className="col-lg-7">
            <div className="courses-right bg-white p-4 rounded shadow-sm">
              <div className="row">
                {[leftCourses, rightCourses].map((column, colIndex) => (
                  <div className="col-md-6" key={colIndex}>
                    <ul className="courses-list">
                      {column.map((course, index) => (
                        <li
                          key={index}
                          data-aos={colIndex === 0 ? 'fade-left' : 'fade-right'}
                          data-aos-delay={100 + index * 100}
                          className='darkbg'
                        >
                          <span><i className="fa fa-book me-2"></i>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const FeaturedAndCourses = () => {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    AOS.init({
      duration: isMobile ? 500 : 1000,
      once: true,
      easing: 'ease-out-cubic',
      mirror: false,
    });

    const handleResize = () => AOS.refresh();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Desc />
      <FeaturedCourse />
    </div>
  );
};

export default FeaturedAndCourses;