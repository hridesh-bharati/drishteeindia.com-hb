import React, { useState } from "react";
import { pushNotice } from "../../../../../api/adminApi/api";
import { toast } from "react-toastify";

export default function NoticeForm() {
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    const rspns = await pushNotice(caption.trim(), message.trim());
    if (rspns.ackbool === 1) {
      toast.success(rspns.message);
      setCaption("");
      setMessage("");
    } else {
      toast.error(rspns.message || "Failed to push notice.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light p-3">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow"
        style={{ maxWidth: 480, width: "100%" }}
        noValidate
      >
        <h1 className="h4 text-center mb-4 text-primary">Notice Form</h1>

        <input
          type="text"
          placeholder="Caption of message... *"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
          autoFocus
          className="form-control mb-3"
        />

        <textarea
          placeholder="Type notice message..."
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="form-control mb-4"
        />

        <button type="submit" className="btn btn-primary w-100 fw-bold">
          Push
        </button>
      </form>
    </div>
  );
}
