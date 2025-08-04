import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const cardData = [
  {
    imageUrl: "images/icon/projector.png",
    title: "Live Projects",
    text: "To work on real-time projects.",
    duration: 300,
    id: 'liveA',
  },
  {
    imageUrl: "images/icon/trainers.png",
    title: "Expert Trainers",
    text: "Learn from certified & experienced trainers.",
    duration: 600,
    id: 'liveB',
  },
  {
    imageUrl: "images/icon/course2.png",
    title: "Globally Recognized Certificates",
    text: "Our Certificates are valued by top corporates.",
    duration: 900,
    id: 'liveC',
  },
  {
    imageUrl: "images/icon/practical.gif",
    title: "Hands on Training",
    text: "100% Practical based training model.",
    duration: 1200,
    id: 'liveD',
  }
];

const descriptions = [
  {
    description: "Our live projects allow you to apply what you’ve learned in a practical, real-world context.",
    icon: <i className="bi bi-lightbulb-fill" style={{ color: '#ff9800', fontSize: '2rem' }}></i>
  },
  {
    description: "Learn from professionals with real industry experience.",
    icon: <i className="bi bi-person-fill" style={{ color: '#3b82f6', fontSize: '2rem' }}></i>
  },
  {
    description: "Our certificates hold value across major companies worldwide.",
    icon: <i className="bi bi-award-fill" style={{ color: '#4caf50', fontSize: '2rem' }}></i>
  },
  {
    description: "Gain hands-on training to be career-ready from day one.",
    icon: <i className="bi bi-hand-thumbs-up-fill" style={{ color: '#f44336', fontSize: '2rem' }}></i>
  }
];

export default function LiveCards() {
  return (
    <div className="container-fluid py-5" id="liveCards">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark" data-aos="fade-right" data-aos-duration="1000">
          WHY CHOOSE <span className="text-primary">DRISHTEE</span>
        </h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }} data-aos="fade-left" data-aos-duration="1000">
          We are a modern and inviting institute perfectly suited for students, providing all educational materials here.
        </p>
        <hr />
      </div>
      <div className="row g-4 justify-content-center">
        {cardData.map((card) => (
          <div key={card.id} className="col-12 col-sm-6 col-lg-3" data-aos="fade-up" data-aos-duration={card.duration}>
            <div className="card text-center  myshadowCard p-2 h-100">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="card-img-top rounded-1 mx-auto"
                style={{ width: '70px', height: '70px', objectFit: 'contain' }}
              />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text text-secondary">{card.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mt-4 justify-content-center">
        {descriptions.map((data, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="card myshadowCard h-100 text-center p-3">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                {data.icon}
                <p className="mt-3 text-muted">{data.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
