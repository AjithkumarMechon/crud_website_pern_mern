"use client";
import Cookies from "js-cookie";
import Styles from "@/utils/styles/dashboard.module.scss";

const page: React.FC = () => {
  const token = Cookies.get("token");
  if (token) {
    try {
      const [headerEncoded, payloadEncoded, signatureEncoded] =
        token.split(".");
      const header = JSON.parse(atob(headerEncoded));
      const payload = JSON.parse(atob(payloadEncoded));
      const decoded = {
        header,
        payload,
        signature: signatureEncoded, // Signature remains base64 encoded
      };
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.log("No token found");
  }

  return (
    <div className={Styles.bg_image_horse}>
      <h1>Dashboard</h1>
    </div>
  );
};

export default page;
