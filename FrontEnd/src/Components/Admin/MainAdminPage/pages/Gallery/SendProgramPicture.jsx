import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { pushPhoto } from "../../../../../api/adminApi/api";

export default function SendProgramPicture() {
  const [form, setForm] = useState({ name: "", category: "", url: "" });
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState({ img: false, save: false });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const onText = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onFile = (e) => {
    const f = e.target.files[0];
    f && (setImg(f), setPreview(URL.createObjectURL(f)));
  };

  const uploadImg = async () => {
    if (!img) return toast.error("Pick an image");
    setLoading((p) => ({ ...p, img: true }));
    try {
      const fd = new FormData();
      fd.append("file", img);
      fd.append("upload_preset", "hridesh99!");
      fd.append("cloud_name", "draowpiml");
      const r = await fetch(
        "https://api.cloudinary.com/v1_1/draowpiml/image/upload",
        { method: "POST", body: fd }
      );
      const d = await r.json();
      if (!r.ok) throw new Error(d.error?.message);
      setForm((p) => ({ ...p, url: d.url }));
      toast.success("Uploaded!");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading((p) => ({ ...p, img: false }));
    }
  };

  const savePost = async () => {
    const { name, category, url } = form;
    if (!name || !category || !url) return toast.error("Fill all fields");
    setLoading((p) => ({ ...p, save: true }));
    try {
      const r = await pushPhoto(name, category, url);
      if (r.ackbool) toast.success(r.message);
      setForm({ name: "", category: "", url: "" });
      setImg(null);
      setPreview(null);
    } catch {
      toast.error("Server error");
    } finally {
      setLoading((p) => ({ ...p, save: false }));
    }
  };

  return (
    <div
      className="position-fixed dark-bg top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "var(--bs-body-bg)" }}
    >
      <div
        className="p-4 mx-2 rounded-4 about-card myshadow w-100 overflow-auto"
        style={{
          maxWidth: 420,
          maxHeight: "95vh",
          background: "rgba(255,255,255,.85)",
          backdropFilter: "blur(14px)",
        }}
      >
        <h5 className="text-center text-primary fw-bolder mb-4">Create a post publicly.</h5>

        {preview && (
          <div className="mb-3 position-relative text-center">
            <img
              src={preview}
              className="img-fluid rounded-2 shadow"
              style={{ maxHeight: 200, objectFit: "cover" }}
            />
            <button
              className="btn btn-sm btn-light position-absolute top-0 end-0 m-1 rounded-circle p-0 border"
              style={{ width: 28, height: 28 }}
              onClick={() => (setImg(null), setPreview(null))}
            >
              <i className="bi bi-trash text-danger" />
            </button>
          </div>
        )}

        <div className="d-flex">
          <input
            type="file"
            accept="image/*"
            className="form-control mb-3 mx-1 w-75 rounded-4 border-light"
            onChange={onFile}
          />
          <button
            className="btn btn-success w-50 mx-1 mb-3 rounded-4 fw-semibold"
            disabled={loading.img}
            onClick={uploadImg}
          >
            {loading.img ? "Posting..." : "Upload"}
          </button>
        </div>

        {["name", "category"].map((n) => (
          <input
            key={n}
            name={n}
            placeholder={n === "name" ? "Title..." : "Say something..."}
            className="form-control rounded-4 shadow-sm px-3 py-2 mb-3"
            value={form[n]}
            onChange={onText}
          />
        ))}

        <button
          className="btn btn-primary w-100 rounded-4 fw-semibold"
          disabled={loading.save}
          onClick={savePost}
        >
          {loading.save ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
