import { useState, useEffect, memo } from 'react';
import { getAdminList, deleteAdmin } from '../../../../../api/adminApi/api';
import { toast } from 'react-toastify';

// Reusable info display component
const AdminInfo = memo(({ icon, label, value, color }) => (
  <p className="mb-1">
    <i className={`fas ${icon} me-2${color ? ` text-${color}` : ''}`}></i>
    <strong>{label}:</strong> <span className="text-muted">{value}</span>
  </p>
));

// Info fields to render dynamically
const adminInfoFields = [
  { icon: 'fa-envelope', label: 'Email', key: 'email', color: 'info' },
  { icon: 'fa-phone', label: 'Phone', key: 'mobileNumber', color: 'success' },
  { icon: 'fa-id-card', label: 'UIDAI', key: 'aadhaarNumber', color: 'warning' },
  { icon: 'fa-briefcase', label: 'Profession', key: 'profession', color: 'primary' },
  { icon: 'fa-map-marker-alt', label: 'Address', key: 'address', color: 'danger' },
];

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    getAdminList().then(({ ackbool, message }) => {
      if (ackbool === 1) setAdmins(message);
    });
  }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;
    const { ackbool, message } = await deleteAdmin(deleteId);
    if (ackbool === 1) {
      toast.success(message);
      setAdmins(prev => prev.filter(({ _id }) => _id !== deleteId));
    } else {
      toast.error('Failed to delete admin.');
    }
    setDeleteId(null);
  };

  const formatDate = d => new Date(d).toLocaleDateString('en-GB');

  return (
    <div className="container py-4" id="AdminList" style={{ maxWidth: 1000 }}>
      <h2 className="text-center mb-4 fw-bold text-primary">
        <i className="fas fa-users-cog me-2"></i>Admin Management Dashboard
      </h2>

      {admins.length ? admins.map(admin => (
        <div className="card border-0 shadow-lg mb-4" key={admin._id}>
          <div className="card-body">
            {/* Header row */}
            <div className="row align-items-center mb-3">
              <div className="col-auto">
                <img
                  src={admin.profilePic || "https://via.placeholder.com/90"}
                  alt={admin.name}
                  className="rounded-circle border border-3"
                  style={{ width: 90, height: 90, objectFit: 'cover' }}
                />
              </div>
              <div className="col">
                <h5 className="mb-1 text-dark fw-bold">
                  <i className="fas fa-user me-2 text-primary"></i>{admin.name}
                </h5>
                <small className="text-secondary">
                  <i className="fas fa-calendar-alt me-1"></i>Joined on {formatDate(admin.createdAt)}
                </small>
                {admin.root && (
                  <span className="badge bg-warning text-dark ms-2" title="Superadmin">
                    🛡️ Superadmin
                  </span>
                )}
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => setDeleteId(admin._id)}
                  title="Delete Admin"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>

            <hr />

            {/* Info fields */}
            <div className="row">
              {[0, 1].map(colIdx => (
                <div className="col-md-6 mb-2" key={colIdx}>
                  {adminInfoFields
                    .slice(colIdx * 3, colIdx * 3 + 3)
                    .map(({ icon, label, key, color }) => (
                      <AdminInfo
                        key={key}
                        icon={icon}
                        label={label}
                        value={admin[key]}
                        color={color}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )) : (
        <div className="text-center text-muted">
          <i className="fas fa-users-slash fa-2x mb-2 d-block"></i>No admins found.
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                Are you sure you want to delete this admin?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
