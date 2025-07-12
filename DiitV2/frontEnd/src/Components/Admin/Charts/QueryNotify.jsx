import React, { useEffect, useState, useMemo } from 'react';
import { getAllQuery } from '../../../api/adminApi/api';

export default function QueryNotify() {
  const [query, setQuery] = useState([]);

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { message = [] } = await getAllQuery();
        setQuery(message);
      } catch (err) {
        console.error("Failed to fetch queries", err);
      }
    };

    fetchQuery(); 
  }, []);

  const unsolvedCount = useMemo(() => {
    const count = query.filter(q => !q.iSolveStatus).length;
    return count > 99 ? '99+' : count;
  }, [query]);

  if (unsolvedCount === 0) return null;

  return (
    <span className="position-absolute top-0 start-50 translate-middle mt-1 ms-2 badge rounded-pill bg-danger text-white fw-semibold" style={{ fontSize: "0.7rem" }}>
      {unsolvedCount}
    </span>
  );
}
