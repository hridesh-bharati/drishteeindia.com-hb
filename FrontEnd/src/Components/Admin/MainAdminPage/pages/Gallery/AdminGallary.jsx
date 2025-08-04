import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { deletePhoto, getPhotos } from "../../../../../api/adminApi/api";

// Offcanvas component for image details
const Offcanvas = ({ show, image, onClose, onDelete, loadingId, showDelete }) => (
  <div
    className={`offcanvas offcanvas-bottom p-3 ${show ? "show" : ""}`}
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
            {loadingId === image?._id ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      )}
    </div>
  </div>
);

// ✅ Fixed download function
const downloadImage = async (url, filename) => {
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error("Network response was not ok");

    // Get the Content-Type from the response to determine file type
    const contentType = res.headers.get("Content-Type");

    // Extract the file extension from the content type
    let extension = "jpg"; // Default to jpg if no content type is available
    if (contentType.includes("image/png")) {
      extension = "png";
    } else if (contentType.includes("image/gif")) {
      extension = "gif";
    } else if (contentType.includes("image/webp")) {
      extension = "webp";
    }

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${filename || "photo"}.${extension}`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed:", err);
    toast.error("Download failed. Try saving the image manually.");
  }
};


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
        setImages((imgs) => imgs.filter((img) => img._id !== id));
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
        const textarea = document.createElement("textarea");
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        toast.success("Link copied to clipboard!");
      }
    } catch {
      toast.error("Failed to copy the link.");
    }
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
            {images.map((image) => (
              <div className="col-sm-6 col-md-4" key={image._id}>
                <div className="card shadow-sm border-secondary rounded-3 position-relative">
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
                  <div className="card-body p-3">
                    <p className="mb-1 fw-semibold text-truncate">{image.name || "No Title"}</p>
                    <p className="mb-1 small text-truncate">
                      {image?.category || "No description available."}
                    </p>
                    <div className="d-flex justify-content-between align-items-center small mb-2">
                      <span>
                        Uploaded On:{" "}
                        {image?.createdAt
                          ? new Date(image.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                          : "Unknown"}
                      </span>
                      <span>
                        <strong>Likes:</strong> {image?.likes || 0}
                      </span>
                    </div>

                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-danger btn-sm" onClick={() => toast.info("This feature is coming soon!")}>
                        <i className="bi bi-heart" /> Like
                      </button>


                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setShareMenuId((prev) => (prev === image._id ? null : image._id))}
                      >
                        <i className="bi bi-share-fill" /> Share
                      </button>

                      <button
                        className="btn btn-outline-success btn-sm"
                        title="Download"
                        onClick={() => downloadImage(image.url, `photo-${image._id}.jpg`)}
                      >
                        <i className="bi bi-download" /> Download
                      </button>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleCopyLink(image.url)}
                      >
                        <i className="bi bi-link" /> Copy Link
                      </button>
                    </div>

                    {shareMenuId === image._id && (
                      <div className="mt-3 d-flex flex-wrap gap-2">
                        <a
                          className="btn btn-sm bg-success text-white"
                          href={`https://wa.me/?text=${encodeURIComponent(image.url)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-whatsapp" /> WhatsApp
                        </a>
                        <a
                          className="btn btn-sm bg-primary text-white"
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(image.url)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-facebook" /> Facebook
                        </a>
                        <a
                          className="btn btn-sm bg-info text-white"
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(image.url)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-twitter" /> Twitter
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
