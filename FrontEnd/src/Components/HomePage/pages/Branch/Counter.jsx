import React, { useRef, useEffect } from "react";

// Customizable background style
const backgroundStyle = {
  background: `linear-gradient(rgba(0, 23, 61, 0.85), rgba(0, 23, 61, 0.85)),
               url('/images/campus-bg.jpg') center/cover no-repeat`,
  borderRadius: "24px",
  padding: "3rem 1.5rem",
  margin: "2rem 0",
  boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
  overflow: "hidden"
};

const statsData = [
  { value: 1500, suffix: "+", label: "Students Trained", color: "text-warning", delay: 100 },
  { value: 95, suffix: "%", label: "Placement Rate", color: "text-success", delay: 200 },
  { value: 20, suffix: "+", label: "Industry Partners", color: "text-info", delay: 300 },
  { value: 15, suffix: "+", label: "Certified Courses", color: "text-danger", delay: 400 },
  { value: 10, suffix: "+", label: "Experienced Faculties", color: "text-primary", delay: 500 },
  { value: 4.9, suffix: "★", label: "Student Rating", color: "text-secondary", delay: 600, isFloat: true }
];

function useCountUp(target, isFloat, inView, duration = 1200) {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = Number(target);
    const increment = end / (duration / 16);
    let rafId;

    const animate = () => {
      start += increment;
      if (start >= end) {
        setCount(end);
        return;
      }
      setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start));
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafId);
  }, [target, isFloat, inView, duration]);

  return isFloat ? count.toFixed(1) : count;
}

// Animation hook for fade/slide-in
function useInView(ref, threshold = 0.5) {
  const [inView, setInView] = React.useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}

const Counter = () => {
  return (
    <div className="container-fluid" style={backgroundStyle}>
      <div className="row justify-content-center align-items-center g-3">
        {statsData.map((stat, i) => {
          const ref = useRef();
          const inView = useInView(ref, 0.5);
          const count = useCountUp(stat.value, stat.isFloat, inView);

          // Animations: fade + slide on entry
          const animationStyle = {
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(50px)",
            transition: `all 0.8s cubic-bezier(.35,1.12,.36,.99) ${stat.delay}ms`
          };

          // Show the star in gold, if needed
          const showStar = stat.suffix === "★";

          return (
            <div
              className="col-6 col-md-4 col-lg-2 mb-4 d-flex flex-column align-items-center"
              key={stat.label}
              ref={ref}
              style={animationStyle}
            >
              <div
                className="shadow rounded-circle bg-white d-flex justify-content-center align-items-center mb-2"
                style={{
                  width: "120px",
                  height: "120px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.16)",
                  border: "3px solid #fff",
                  willChange: "transform,opacity"
                }}
              >
                <h3
                  className={`${stat.color} mb-0 fw-bold`}
                  style={{
                    fontSize: showStar ? "2rem" : "2.4rem",
                    letterSpacing: "1px",
                    userSelect: "none"
                  }}
                >
                  {count}
                  <span style={showStar ? { color: "#FFD700", marginLeft: 2 } : {}}>
                    {stat.suffix}
                  </span>
                </h3>
              </div>
              <p className="mb-0 text-light" style={{ fontWeight: 500 }}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Counter;