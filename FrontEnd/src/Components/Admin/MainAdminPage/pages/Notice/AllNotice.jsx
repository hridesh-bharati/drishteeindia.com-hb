import React, { useState, useEffect } from 'react';
import { getAllNotice, deleteNotice, updateNotice } from '../../../../../api/adminApi/api';
import { toast } from 'react-toastify';

export default function AllNotice() {
  const [notices, setNotices] = useState([]);
  const [edit, setEdit] = useState({ show: false, id: '', title: '', message: '' });

  useEffect(() => {
    getAllNotice().then(r => r.ackbool && setNotices(r.message));
  }, []);

  const refreshNotices = () => getAllNotice().then(r => r.ackbool && setNotices(r.message));

  const handleDelete = async (_id) => {
    const r = await deleteNotice(_id);
    if (r.ackbool) toast.success(r.message), refreshNotices();
  };

const handleUpdate = async () => {
  const r = await updateNotice(edit.id, edit.title, edit.message);
  if (r.ackbool) {
    toast.success(r.message);
    setEdit({ show: false, id: '', title: '', message: '' });
    refreshNotices();
  }
};


  return (
    <div className="container py-3 mt-3">
      <h5 className="text-primary fw-bold mb-3 text-center">📢 All Notices</h5>
      <div className="row g-3">
        {notices.length ? notices.map(n => (
          <div className="col-12" key={n._id}>
            <div className="card shadow-sm rounded-3 border-0">
              <div className="card-body">
                <h6 className="fw-bold text-dark">
                  <i className="bi bi-megaphone-fill text-warning me-2"></i>{n.title}
                </h6>
                <p className="text-muted small">{n.nMessage}</p>
                <div className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => setEdit({ show: true, id: n._id, title: n.title, message: n.nMessage })}>
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(n._id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center text-muted py-5">
            <i className="bi bi-inbox fs-1 d-block mb-2"></i>
            No notices found.
          </div>
        )}
      </div>

      {edit.show && (
        <div className=" bg-light shadow mt-3 p-3">
          <div className="fw-bold text-primary mb-2">✏️ Edit Notice</div>
          <input
            className="form-control mb-2"
            value={edit.title}
            onChange={e => setEdit({ ...edit, title: e.target.value })}
            placeholder="Notice Title"
          />
          <textarea
            className="form-control mb-2"
            rows={3}
            value={edit.message}
            onChange={e => setEdit({ ...edit, message: e.target.value })}
            placeholder="Notice Description"
          />
          <div className="text-end">
            <button className="btn btn-sm btn-primary me-2" onClick={handleUpdate}>Save</button>
            <button className="btn btn-sm btn-secondary" onClick={() => setEdit({ show: false, id: '', title: '', message: '' })}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
