import { useEffect, useState } from "react";
import { adminProfile } from "../../../../../api/adminApi/api";

export default function AdminPic() {
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    adminProfile()
      .then(({ ackbool, message }) => {
        if (ackbool && message?.profilePic) {
          setProfilePic(message.profilePic);
        }
      })
      .catch(console.error);
  }, []);

  // if (!profilePic) return <p className="text-center my-5">Loading...</p>;

  return (
    <div className="text-center">
      <img
        src={profilePic}
        alt="Admin"
        className="rounded-circle border border-white shadow-sm p-0 m-0"
        style={{
          width: 27,
          height: 27,
          objectFit: "cover",
          background: "#ccc",
        }}
      />
    </div>
  );
}
