import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const CountdownTimer = () => {
    const statisticsData = [
        { number: "50K+", text: "Books Collection" },
        { number: "10K+", text: "E-Resources" },
        { number: "24/7", text: "Digital Access" },
        { number: "500+", text: "Study Spaces" },
    ];

    const [statistics, setStatistics] = useState(
        statisticsData.map((stat) => ({ ...stat, current: 0 }))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setStatistics((prevStats) =>
                prevStats.map((stat) => {
                    const targetValue = parseInt(stat.number.replace(/\D/g, "")) || 0;
                    return {
                        ...stat,
                        current: Math.min(stat.current + Math.ceil(targetValue / 100), targetValue),
                    };
                })
            );
        }, 200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="py-5 mb-5">
            <div className="container about-card">
                <div className="row text-center g-4">
                    {statistics.map((stat, index) => (
                        <div key={index} className="col-6 col-md-3 p-3">
                            <h1 className="display-6 text-primary fw-bold">
                                {stat.current === parseInt(stat.number.replace(/\D/g, "")) ? stat.number : stat.current}
                            </h1>
                            <h5 className="mt-2 text-muted">{stat.text}</h5>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;