import React from "react";
import logo from "../Logoo.png";
import { useNavigate } from "react-router-dom";

const El7a2niPatientInfo = () => {
  const navigate = useNavigate();

  const handleDocClick = () => {
    navigate("/register/doctor");
  };

  const handleHomeClick = () => {
    navigate("/");
  };
  // const handlePharmPlatform = () => {
  //      navigate("/signupPharmacist"); // Replace with the path of your join platform page
  //     };

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
          style={{ width: "300px", height: "150", marginRight: "20px" }}
          />
      </div>
      <div style={{ flex: 1, textAlign: "left" }}>
        <h2>More Information</h2>
        <p>Address: 123 Health Street, City</p>
        <p>Phone: (456) 789-0123</p>
        <p>Email: medicalcenter@example.com</p>
        <p>Delivery: 01236654852</p>
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
            onClick={handleDocClick}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.borderBottom = "1px solid #fff")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.borderBottom =
                "1px solid transparent")
            }
          >
            Apply As A Doctor
          </span>
        </p>
        {/* <p>
          <span
            style={{
              color: "#fff",
              cursor: "pointer",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              transition: "border-bottom 0.3s",
            }}
            onClick={handlePharmPlatform}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.borderBottom = "1px solid #fff")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.borderBottom =
                "1px solid transparent")
            }
          >
            Apply As A Pharmacist
          </span>
          
        </p> */}
        {/* <p>Your privacy is important to us. Read our <a href="/privacy-policy">Privacy Policy</a>.</p> */}
      </div>
      <div style={{ flex: 1, textAlign: "left" }}>
        <h2>Connect with Us</h2>
        <div>
          <p>
            <a
              href="https://www.instagram.com/_docgpt/"
              style={{
                color: "#fff",
                textDecoration: "none",
                borderBottom: "1px solid transparent",
                transition: "border-bottom 0.3s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.borderBottom =
                  "1px solid #fff")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.borderBottom =
                  "1px solid transparent")
              }
            >
              Instagram
            </a>{" "}
          </p>
          <p>
            <a
              href="https://www.facebook.com"
              style={{
                color: "#fff",
                textDecoration: "none",
                marginRight: "10px",
                borderBottom: "1px solid transparent",
                transition: "border-bottom 0.3s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.borderBottom =
                  "1px solid #fff")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.borderBottom =
                  "1px solid transparent")
              }
            >
              Facebook
            </a>{" "}
          </p>
          <p>
            <a
              href="https://www.linkedin.com/"
              style={{
                color: "#fff",
                textDecoration: "none",
                marginRight: "10px",
                borderBottom: "1px solid transparent",
                transition: "border-bottom 0.3s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.borderBottom =
                  "1px solid #fff")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.borderBottom =
                  "1px solid transparent")
              }
            >
              LinkedIn
            </a>{" "}
          </p>
        </div>
      </div>
      <div
        style={{ textAlign: "center", marginTop: "20px", flexBasis: "100%" }}
      >
        <h2>&copy;El7a2ni </h2>
        <p>Your privacy is important to us. Read our privacy policy.</p>

      </div>
    </div>
  );
};

export default El7a2niPatientInfo;
