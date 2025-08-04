import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const certificates = [
  {
    title: 'Drishtee Educational & Welfare Society.',
    image: 'images/thumbnails/Certificate3.png',
    description: 'Certified by SIO :- 9001 - 2008',
  },
  {
    title: 'NIELET',
    image: 'images/thumbnails/Certificate2.png',
    description: 'National Institute of Electronics & Information Technology',
  },
  {
    title: 'Society Registration.',
    image: 'images/thumbnails/Certificate1.png',
    description: 'Reg no:- 72/2013-2014',
  },
  {
    title: 'Algol universal trus.',
    image: 'images/thumbnails/Certificate4.png',
    description: 'KSOU/AUT/980-A',
  },
];

const Certificate = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalImg, setModalImg] = useState('');

  return (
    <div className="dark-bg py-5 px-3" style={{ background: 'linear-gradient(to bottom right, #d8eaff, #f0f4ff)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="d-inline-flex bg-white shadow-sm p-3 rounded-circle mb-3">
            <i className="bi bi-patch-check-fill text-primary fs-2"></i>
          </div>
          <h2 className="fw-bold text-primary" style={{ fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif" }}>Affiliations & Recognitions</h2>
          <p className="text-muted">Govt. recognized & globally accepted authorizations for trusted learning.</p>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {certificates.map((cert, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-4">
              <div className="rounded-4 bg-white bg-opacity-75 shadow-sm p-2 h-100 border border-white border-opacity-50"
                style={{ backdropFilter: 'blur(12px)', transition: 'transform 0.3s ease' }}>
                <div className="d-flex align-items-center">
                  <div
                    className="me-3 d-flex justify-content-center align-items-center rounded-4 bg-light"
                    style={{
                      width: '110px',
                      height: '110px',
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #cce5ff, #e6f0ff)',
                      cursor: 'zoom-in',
                    }}
                    onClick={() => {
                      setModalImg(cert.image);
                      setModalShow(true);
                    }}
                    title="Click to view full image"
                  >
                    <img src={cert.image} alt={cert.title} className="img-fluid rounded" style={{ objectFit: 'contain' }} />
                  </div>
                  <div>
                    <h6 className="fw-semibold mb-1" style={{ fontSize: '1rem', color: 'rgb(104, 0, 76)' }}>{cert.title}</h6>
                    <p className="small fw-medium mb-0" style={{ color: 'rgb(24, 67, 154)' }}>{cert.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Panel */}
        <div className="mt-5 text-center p-4 rounded-4 shadow"
          style={{
            background: 'linear-gradient(135deg, #007bff,rgba(103, 16, 242, 0.46))',
            backdropFilter: 'blur(12px)',
            color: "white"
          }}
        >
          <h5 className="fw-bold mb-2">Why Certifications Matter?</h5>
          <p className="small mb-0">They build trust, verify quality, and help students pursue jobs and learning across the globe.</p>
        </div>
      </div>

      {/* Modal */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered size="sm">
        <Modal.Body className="p-0">
          <img src={modalImg} alt="Certificate Full View" className="w-100 h-auto rounded" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Certificate;
