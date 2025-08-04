import React, { useEffect, useState } from 'react';
import { getStudentList } from '../../../../../api/adminApi/api';

export default function AdmNotify() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentList({});
        const list = Array.isArray(res.message) ? res.message : [];
        const pending = list.filter(s => !s.regNum).length;
        setCount(pending);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {count > 0 && (
        <span
          className="position-absolute top-0 start-50 ms-2 translate-middle badge rounded-pill bg-danger"
          style={{ fontSize: "0.7rem" }}
        >
          {count}
        </span>
      )}
    </div>
  );
}
