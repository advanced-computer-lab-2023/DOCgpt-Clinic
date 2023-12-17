import React from "react";
import logo from "../Logoo.png";
import { useNavigate } from "react-router-dom";

const El7a2niAdminInfo = () => {
  const navigate = useNavigate();

  const handleAdminsClick = () => {
    navigate("/AdminPage");
  };

  const handleDoctorsClick = () => {
    navigate("/alldoc");
  };

  const handlePatientsClick = () => {
    navigate("/allpat");
  };

  const handleHomeClick = () => {
    navigate("/admin/home");
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#333",
        color: "#fff",
        padding: "50px",
        marginTop: "150px",
        justifyContent: "space-between", // Adjusted for better alignment
        alignItems: "stretch", // Stretch items vertically to the same height
        flexWrap: "wrap", // Allow items to wrap to the next line if needed
      }}
    >
      <div>
        <img
          src={logo}
          alt="Clinic Logo"
          style={{ width: "300px", height: "100px", marginRight: "20px" }}
        />
      </div>
      <div style={{ flex: 1, textAlign: "left" }}>
        <h2>Office Information</h2>
        <p>Address: 123 Main Street, City</p>
        <p>Phone: (123) 456-7890</p>
        <p>Email: info@example.com</p>
        <p>IT Contact: 0123658741</p>

      </div>
      <div style={{ flex: 1, textAlign: "left" }}>
        <h2>Quick Links</h2>
        <p>
          <span
            style={{
              color: "#fff",
              cursor: "pointer",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              transition: "border-bottom 0.3s",
            }}
            onClick={handleHomeClick}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.borderBottom = "1px solid #fff")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.borderBottom =
                "1px solid transparent")
            }
          >
            Home
          </span>
        </p>
        <p>
          <span
            style={{
              color: "#fff",
              cursor: "pointer",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              transition: "border-bottom 0.3s",
            }}
            onClick={handleAdminsClick}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.borderBottom = "1px solid #fff")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.borderBottom =
                "1px solid transparent")
            }
          >
            {" "}
            Manage Admins
          </span>
        </p>
        <p>
          <span
            style={{
              color: "#fff",
              cursor: "pointer",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              transition: "border-bottom 0.3s",
            }}
            onClick={handleDoctorsClick}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.borderBottom = "1px solid #fff")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.borderBottom =
                "1px solid transparent")
            }
          >
            {" "}
            Manage Doctors
          </span>
        </p>
        <p>
          <span
            style={{
              color: "#fff",
              cursor: "pointer",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              transition: "border-bottom 0.3s",
            }}
            onClick={handlePatientsClick}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.borderBottom = "1px solid #fff")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.borderBottom =
                "1px solid transparent")
            }
          >
            {" "}
            Manage Patients
          </span>
        </p>
        {/* <p>Your privacy is important to us. Read our <a href="/privacy-policy">Privacy Policy</a>.</p> */}
      </div>

      <div
        style={{ textAlign: "center", marginTop: "20px", flexBasis: "100%" }}
      >
        <h2>&copy; El7a2ni </h2>
        <p>Your privacy is important to us. Read our privacy policy.</p>

      </div>
    </div>
  );
};

export default El7a2niAdminInfo;
