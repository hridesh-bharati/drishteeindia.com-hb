import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { deletePhoto, getPhotos } from "../../../../../api/adminApi/api";

// Offcanvas component for image details
const Offcanvas = ({ show, image, onClose, onDelete, loadingId, showDelete }) => (
    <div
        className={`offcanvas offcanvas-bottom p-3 pb-5 ${show ? "show" : ""}`}
        tabIndex={-1}
        style={{
            visibility: show ? "visible" : "hidden",
            backgroundColor: "white",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            boxShadow: "0 -3px 10px rgba(0,0,0,0.2)",
            maxHeight: "45vh",
            height: "45vh",
            overflowY: "auto",
            transition: "transform 0.3s ease-in-out",
        }}
        onClick={e => e.stopPropagation()}
    >
        <div className="offcanvas-header d-flex align-items-center">
            <h5 className="offcanvas-title me-auto">{image?.name || "No Name"}</h5>
            <button type="button" className="btn-close text-reset" onClick={onClose} aria-label="Close" />
        </div>
        <div className="offcanvas-body">
            <div className="mb-3">
                <strong>Description:</strong>
                <p className="small text-muted">{image?.category || "No description available."}</p>
                <strong>Uploaded On:</strong>{" "}
                <span className="small text-muted">
                    {image?.createdAt
                        ? new Date(image.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })
                        : "Unknown"}
                </span>
                <div className="py-2 d-block">
                    <strong>Likes:</strong> {image?.likes || 0}
                </div>
            </div>
            {showDelete && (
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-link text-danger p-0"
                        onClick={() => onDelete(image._id)}
                        disabled={loadingId === image?._id}
                        style={{ textDecoration: "none", fontWeight: 500 }}
                    >
                        {loadingId === image?._id
                            ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                            : "Delete"}
                    </button>
                </div>
            )}
        </div>
    </div>
);

const AdminGallery = ({ showDelete = false }) => {
    const [images, setImages] = useState([]);
    const [loadingId, setLoadingId] = useState(null);
    const [offcanvas, setOffcanvas] = useState({ show: false, image: null });
    const [shareMenuId, setShareMenuId] = useState(null);

    const fetchImages = useCallback(async () => {
        try {
            const res = await getPhotos("undefined");
            setImages(res.message);
        } catch {
            toast.error("Error fetching images.");
        }
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const deleteImage = async (id) => {
        try {
            setLoadingId(id);
            const res = await deletePhoto(id);
            if (res.ackbool === 1) {
                setImages(imgs => imgs.filter(img => img._id !== id));
                if (offcanvas.image?._id === id) setOffcanvas({ show: false, image: null });
            } else toast.error("Failed to delete.");
        } catch {
            toast.error("Delete error.");
        } finally {
            setLoadingId(null);
        }
    };

    const openOffcanvas = (image) => setOffcanvas({ show: true, image });
    const closeOffcanvas = () => setOffcanvas({ show: false, image: null });

    const handleCopyLink = async (url) => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(url);
                toast.success("Link copied to clipboard!");
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = url;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                toast.success("Link copied to clipboard!");
            }
        } catch {
            toast.error("Failed to copy the link.");
        }
    };

    const handleShare = (image) => {
        setShareMenuId(prev => prev === image._id ? null : image._id); // Toggle share menu
    };

    return (
        <div>
            <header className="py-4 mt-35 text-center text-uppercase fw-bold h3 text-white" style={{ backgroundColor: "#012C5F" }}>
                Gallery Images
            </header>
            <main className="container py-5">
                {images.length === 0 ? (
                    <p className="text-center text-muted">No images available.</p>
                ) : (
                    <div className="row g-4">
                        {images.map(image => (
                            <div className="col-sm-6 col-md-4 col-lg-3" key={image._id}>
                                <div className="card shadow-sm border-0 rounded-3 overflow-hidden position-relative">
                                    <div className="card-img d-flex justify-content-center align-items-center">
                                        <img
                                            src={image.url}
                                            className="card-img-top"
                                            alt={image.name || "Gallery"}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="position-absolute top-0 end-0 m-2">
                                        <button
                                            className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                            style={{ width: 32, height: 32 }}
                                            onClick={() => openOffcanvas(image)}
                                            title="Info"
                                        >
                                            <i className="bi bi-three-dots-vertical" />
                                        </button>
                                    </div>
                                    <div className="position-absolute bottom-0 start-0 m-2 d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-primary rounded-circle"
                                            onClick={() => handleShare(image)}
                                            title="Share"
                                        >
                                            <i className="bi bi-share-fill" />
                                        </button>
                                        {shareMenuId === image._id && (
                                            <div className="position-absolute bottom-100 start-0 bg-white border rounded shadow-sm p-3" style={{ zIndex: 10 }}>
                                                <button
                                                    className="dropdown-item small text-truncate"
                                                    onClick={() => handleCopyLink(image.url)}
                                                >
                                                    <i className="bi bi-link me-2" /> Copy Link
                                                </button>
                                                <a
                                                    className="dropdown-item small"
                                                    href={`https://wa.me/?text=${encodeURIComponent(image.url)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <i className="bi bi-whatsapp me-2 text-success" /> WhatsApp
                                                </a>
                                                <a
                                                    className="dropdown-item small"
                                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(image.url)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <i className="bi bi-facebook me-2 text-primary" /> Facebook
                                                </a>
                                                <a
                                                    className="dropdown-item small"
                                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(image.url)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <i className="bi bi-twitter me-2 text-info" /> Twitter
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Offcanvas
                show={offcanvas.show}
                image={offcanvas.image}
                onClose={closeOffcanvas}
                onDelete={deleteImage}
                loadingId={loadingId}
                showDelete={showDelete}
            />
            {offcanvas.show && (
                <div className="offcanvas-backdrop fade show" onClick={closeOffcanvas} style={{ cursor: "pointer" }} />
            )}
        </div>
    );
};

export default AdminGallery;
