const StudentIDCard = ({ student }) => {
  if (!student) {
    return <p>No student data available</p>;
  }
  const cardStyle = {
    width: 300,
    height: 500,
    borderRadius: 20,
    background: 'linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflow: 'hidden',
  };

  const circleStyle = {
    width: 64,
    height: 64,
    borderRadius: '50%',
    backgroundColor: '#fff',
    color: '#0D47A1',
    fontWeight: '700',
    fontSize: 28,
    boxShadow: '0 0 10px rgba(255,255,255,0.6)',
    userSelect: 'none',
  };

  const photoWrapperStyle = {
    width: 120,
    height: 120,
    borderRadius: '50%',
    padding: 4,
    background: 'linear-gradient(45deg, rgb(142, 181, 255), rgb(43, 135, 255))',
    boxShadow: '0 4px 15px rgba(94, 192, 248, 0.7)',
  };

  const infoTextStyle = { fontSize: 16 };
  const labelStyle = { color: '#bbdefb' };

  const footerStyle = {
    bottom: 20,
    width: '90%',
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 6,
    boxShadow: '0 0 6px rgba(0,0,0,0.3)',
    fontSize: 12,
    color: '#0D47A1',
    userSelect: 'none',
    fontWeight: '500',
  };

  return (
    <div className="d-flex flex-wrap gap-1 justify-content-center">
      <div
        className="card text-white p-4 d-flex flex-column align-items-center position-relative"
        style={cardStyle}
      >
        <div className="d-flex justify-content-center align-items-center mb-3" style={circleStyle}>
          DIIT
        </div>

        <h5 className="mb-4 text-center fw-bold small" style={{ letterSpacing: '2px' }}>
          Drishtee Computer Center
        </h5>

        <div className="mb-4 d-flex justify-content-center align-items-center" style={photoWrapperStyle}>
          <img
            src={student.photo}
            alt={student.name}
            className="rounded-circle border border-white"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderWidth: 4 }}
          />
        </div>

        <div className="w-100 text-center">
          {[
            ['ID', student.regNum],
            ['Name', student.name],
            ['Course', student.course],
            ['Contact', student.mobileNumber],
          ].map(([label, value], i) => (
            <div key={i} className="d-flex justify-content-start ps-3 py-1" style={{ textAlign: 'left' }}>
              <div className="fw-semibold me-3" style={{ minWidth: '80px' }}>{label}:</div>
              <div>{value}</div>
            </div>
          ))}
        </div>


        <div className="position-absolute d-flex justify-content-center align-items-center" style={footerStyle}>
          Paragpur road, near sunshine school, Nichlaul
        </div>
      </div>
    </div>
  );
};

export default StudentIDCard;
