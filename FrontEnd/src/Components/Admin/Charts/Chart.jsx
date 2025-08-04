import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { getAllQuery, deleteQuery } from '../../../api/adminApi/api';
import { Link } from 'react-router-dom';

const StudentChart = ({ std = [], Tcourse = 0, TOffer = 0 }) => {
  const [query, setQuery] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchAllQuery();
  }, []);

  const fetchAllQuery = async () => {
    try {
      const res = await getAllQuery();
      setQuery(res?.message || []);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const deleteQueryVia = async (_id) => {
    try {
      await deleteQuery(_id);
      fetchAllQuery();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // 📊 Pie Chart Data
  const categories = ["Students", "Courses", "Offers", "Messages"];
  const values = [std.length, Tcourse, TOffer, query.length];
  const chartData = categories.map((name, i) => ({ name, value: values[i] }));

  // 📅 Dynamic year list from student data
  const allYears = [...new Set(std.map(s => new Date(s.createdAt).getFullYear()))].sort((a, b) => b - a);

  // 📅 Monthly counts for selected year
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyCounts = Array(12).fill(0);
  std.forEach(student => {
    const date = new Date(student.createdAt);
    if (date.getFullYear() === selectedYear) {
      monthlyCounts[date.getMonth()]++;
    }
  });

  // 🥧 Pie Chart
  const pieOption = {
    title: {
      text: '📊 Dashboard Summary',
      left: 'center',
      top: 10,
      textStyle: { fontSize: 18, fontWeight: 'bold' }
    },
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { bottom: 0, left: 'center' },
    series: [{
      name: 'Overview',
      type: 'pie',
      radius: ['30%', '65%'],
      label: { formatter: '{b} {c}', fontSize: 12 },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2,
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.2)'
      },
      data: chartData
    }]
  };

  // 📊 Bar Chart
  const barOption = {
    title: {
      text: `📅 Monthly Admissions - ${selectedYear}`,
      left: 'center',
      top: 7,
      textStyle: { fontSize: 18, fontWeight: 'bold' }
    },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: { type: 'category', data: monthLabels },
    yAxis: { type: 'value', name: 'Students', minInterval: 1 },
    series: [{
      data: monthlyCounts,
      type: 'bar',
      barWidth: '50%',
      itemStyle: { color: '#00bcd4', borderRadius: [4, 4, 0, 0] },
      label: { show: true, position: 'top', fontSize: 12 }
    }],
    grid: { top: 60, bottom: 60, left: 40, right: 20 }
  };

  const cardStyle = "card shadow-sm border-0 rounded-4 h-100";
  const chartStyle = { height: '300px' };

  return (
    <div className="container-fluid p-0 py-3">
      <div className="row g-3">
        {/* 📥 Latest Messages */}
        <div className="col-12 col-lg-6">
          <div className={`${cardStyle} bg-light`}>
            <div className="card-header d-flex justify-content-between align-items-center text-white border-0 rounded-top-4 px-4 py-3"
              style={{ background: "linear-gradient(90deg, #007bff, #00bcd4)" }}>
              <h6 className="mb-0 fw-bold">📥 Latest Messages</h6>
              <Link to="StudentQuery" className="btn btn-sm">
                <button className="btn btn-sm btn-light position-relative rounded-pill px-3 shadow-sm">
                  Inbox
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {query.length}
                  </span>
                </button>
              </Link>
            </div>

            <div className="card-body px-4 py-3 bg-white about-card rounded-bottom-4">
              <div className="table-responsive">
                <table className="table table-hover align-middle table-borderless mb-0">
                  <thead className="table-light text-center border rounded">
                    <tr>
                      <th className="text-start  dark-bg fw-semibold">👤 Name</th>
                      <th className="text-start  dark-bg fw-semibold">📞 Mobile</th>
                      <th className="text-center dark-bg  fw-semibold">⚙️ Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {query.slice(0, 3).map((q, i) => (
                      <tr key={q._id || i} className="border-bottom">
                        <td className="text-start about-card text-dark">{q.fullName}</td>
                        <td className="text-start about-card text-dark">{q.mobile}</td>
                        <td className="text-center about-card">
                          <button className="btn btn-sm btn-outline-danger rounded-circle"
                            onClick={() => deleteQueryVia(q._id)} title="Delete">
                            <i className="bi bi-trash3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {query.length === 0 && (
                      <tr>
                        <td colSpan="3" className="text-center text-muted py-3">
                          No messages found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {query.length > 3 && (
                <div className="text-center mt-3">
                  <Link to="StudentQuery" className="btn btn-sm btn-outline-primary shadow-sm rounded-pill px-4">
                    <i className="bi bi-chat-dots me-2"></i> View All Messages
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 📊 Pie Chart */}
        <div className="col-12 col-lg-6">
          <div className={cardStyle}>
            <div className="card-body p-3">
              <ReactECharts option={pieOption} style={chartStyle} />
            </div>
          </div>
        </div>

        {/* 📅 Bar Chart (Year Selector + Full Width) */}
        <div className="col-12">
          <div className={cardStyle}>
            <div className="card-body p-3">
              <div className="d-flex justify-content-end mb-2">
                <select
                  className="form-select w-auto"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                  {allYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <ReactECharts option={barOption} style={{ height: '350px', width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentChart;
