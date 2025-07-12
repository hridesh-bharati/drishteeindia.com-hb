import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobleSearchBox = ({ routes = [] }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filteredRoutes = routes
    .filter(route => route.searchable !== false)
    .filter(route => route.label?.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path) => {
    setQuery('');
    navigate(path);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredRoutes.length > 0) {
      handleSelect(filteredRoutes[0].path);
    }
  };

  return (
    <div className="position-relative m-2" style={{ zIndex: 1050 }}>
      <div className="position-relative">
        <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y text-muted ms-2" style={{ fontSize: '0.8rem' }} />
        <input
          type="search"
          className="form-control form-control-sm ps-4 pe-2 py-1 me-3 rounded-pill"
          placeholder="Search your queries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            // width: '190px',
            fontSize: '0.78rem',
            height: '30px',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #dee2e6',
            transition: 'all 0.3s',
          }}
        />
      </div>


      <style>{`
        .search-suggestion-box {
          animation: fadeIn 0.2s ease-in-out;
          font-size: 0.8rem;
        }
        .search-suggestion-box .dropdown-item {
          transition: all 0.2s ease;
          border-radius: 4px;
        }
        .search-suggestion-box .dropdown-item:hover {
          background-color: #f8f9fa;
          font-weight: 500;
          color: #212529;
        }
        .search-suggestion-box .dropdown-item.text-muted {
          background: none;
          color: #999;
          text-align: center;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {query && (
        <div
          className="position-absolute top-100 mt-1 start-0 w-100 border rounded-3 shadow search-suggestion-box"
          style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            maxHeight: '250px',
            overflowY: 'auto',
          }}
        >
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route, idx) => {
              const matchIndex = route.label
                .toLowerCase()
                .indexOf(query.toLowerCase());

              const before = route.label.slice(0, matchIndex);
              const match = route.label.slice(
                matchIndex,
                matchIndex + query.length
              );
              const after = route.label.slice(matchIndex + query.length);

              return (
                <button
                  key={idx}
                  className="dropdown-item text-start py-2 px-3"
                  onClick={() => handleSelect(route.path)}
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {before}
                  <strong className="text-primary">{match}</strong>
                  {after}
                </button>
              );
            })
          ) : (
            <div className="dropdown-item text-muted small py-2">No match found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobleSearchBox;
