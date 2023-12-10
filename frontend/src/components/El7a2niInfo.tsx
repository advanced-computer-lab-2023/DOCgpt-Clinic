// Footer.tsx
import React from "react";
import logo from "../logo.jpeg";

const El7a2niInfo: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#333",
        color: "#fff",
        padding: "50px",
        marginTop: "100px",
        width: "100%", // Set the width to 100%
        boxSizing: "border-box", // Include padding and border in the total width
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "left",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <img
          src={logo}
          alt="Clinic Logo"
          style={{ width: "300px", height: "100px", marginRight: "20px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <h2>EL7A2NI</h2>
          <p>Phone: 16888</p>
          <p>Email: DOCgpt@gmail.com</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "right",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <h2>Our services</h2>
          <p>Reserve Appointments</p>
          <p>Online chat with doctor</p>
          <p>Buy online medicines</p>
        </div>
      </div>
    </div>
  );
};

export default El7a2niInfo;
