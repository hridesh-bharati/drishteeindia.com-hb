import { useState, useEffect } from "react";
import { getAllNotice } from "../../api/adminApi/api";

export default function Offers() {
  const [notice, setNotice] = useState([]);

  const fetchNotice = async () => {
    try {
      const rspns = await getAllNotice();
      if (rspns.ackbool === 1) {
        setNotice(rspns.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotice();
  }, []);

  return (
    <div className="mt-5 px-md-4 about-card">
      <div className="offer-section-light rounded-4 shadow-sm border-primary-subtle p-4 p-md-5">
        <h4 className="vlColor text-dark fw-bold mb-2">
          📢 Institute Notices & Offers
        </h4>
        <small className="text-secondary d-block mb-4">
          Hello Everyone! Here you can see all offers & updates shared by the institute.
        </small>

        {notice.length === 0 && (
          <p className="text-muted">No notices available.</p>
        )}

        {notice.map((data) => (
          <div
            key={data._id}
            className="notice-box-light bg-glass-light rounded-4 p-3 px-md-4 mb-4"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <h6 className="text-primary fw-semibold mb-1">
              🔔 {data.title}
            </h6>
            <p className="text-muted small mb-0">{data.nMessage}</p>
          </div>
        ))}
      </div>

      <style>{`
        .offer-section-light {
          border: 1px solid #e0e0e0;
        }

        .bg-glass-light {
          border-left: 4px solid #0d6efd;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .bg-glass-light:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(13, 110, 253, 0.15);
        }

        @media (max-width: 576px) {
          .offer-section-light {
            padding: 2rem 1rem;
          }

          .notice-box-light {
            padding: 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
