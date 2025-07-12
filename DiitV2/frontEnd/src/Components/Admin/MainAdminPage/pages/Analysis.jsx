import { useEffect, useState } from "react";
import {
  getStudentList,
  getAllQuery,
  getAllNotice,
  getCourseList,
} from "../../../../api/adminApi/api";
import StudentChart from "../../Charts/Chart";

// ✅ Reusable StatCard
const StatCard = ({ icon, label, value, bgColor, iconColor, cardBg }) => (
  <div className="card glass-card border-0 shadow-sm h-100" style={{ backgroundColor: cardBg }}>
    <div className="card-body p-2 d-flex align-items-center">
      <div
        className="rounded-circle me-3 border border-2 border-white d-flex justify-content-center align-items-center"
        style={{ width: 42, height: 42, backgroundColor: bgColor, color: iconColor }}
      >
        <i className={`${icon} fs-5`} />
      </div>
      <div>
        <p className="mb-1 fw-semibold small text-dark">{label}</p>
        <h5 className="mb-0 fw-bold text-dark">{value}</h5>
      </div>
    </div>
  </div>
);

const Analysis = () => {
  const [data, setData] = useState({
    students: [],
    queries: [],
    offers: [],
    courses: [],
  });

  const fetchAndSet = async (apiFn, key) => {
    try {
      const res = await apiFn();
      if (res.ackbool === 1) {
        setData(prev => ({ ...prev, [key]: Array.isArray(res.message) ? res.message : [] }));
      }
    } catch (err) {
      console.error(`Failed to fetch ${key}`, err);
    }
  };

  useEffect(() => {
    Promise.all([
      fetchAndSet(getStudentList, "students"),
      fetchAndSet(getAllQuery, "queries"),
      fetchAndSet(getAllNotice, "offers"),
      fetchAndSet(getCourseList, "courses"),
    ]);
  }, []);

  const stats = [
    {
      label: "Total Students",
      value: data.students.length,
      icon: "bi bi-people-fill",
      bgColor: "rgba(13, 110, 253, 0.1)",
      iconColor: "#0d6efd",
      cardBg: "rgb(170, 170, 255)",
    },
    {
      label: "Total Courses",
      value: data.courses.length,
      icon: "fa fa-graduation-cap",
      bgColor: "rgba(7, 65, 255, 0.03)",
      iconColor: "#f11fff",
      cardBg: "rgba(188, 17, 204, 0.29)",
    },
    {
      label: "Total Offers",
      value: data.offers.length,
      icon: "bi bi-award-fill",
      bgColor: "rgba(25, 135, 84, 0.15)",
      iconColor: "#198754",
      cardBg: "rgb(232, 255, 236)",
    },
    {
      label: "Messages",
      value: data.queries.length,
      icon: "fa fa-envelope",
      bgColor: "rgba(220, 53, 69, 0.15)",
      iconColor: "#dc3545",
      cardBg: "rgb(255, 235, 234)",
    },
  ];

  const isLoading = stats.every(stat => stat.value === 0);

  return (
    <div className="container-fluid analysiscard p-2">
      {isLoading ? (
        <p className="text-center text-muted my-5">Loading dashboard...</p>
      ) : (
        <>
          <div className="row g-1">
            {stats.map((stat, idx) => (
              <div key={idx} className="col-6 col-md-4 col-xl-3 px-1 mt-2">
                <StatCard {...stat} />
              </div>
            ))}
          </div>

          <div className="mt-2 mx-0">
            <StudentChart
              std={data.students}
              Tcourse={data.courses.length}
              TOffer={data.offers.length}
              TQuery={data.queries.length}
            />
          </div>
        </>
      )}

      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(15px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
          border-radius: 0.75rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default Analysis;
