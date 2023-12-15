import { Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import PatientAppBar from "../../components/patientBar/patientBar";
import HealthPackageComp from "../../components/healthPackageComp";
import El7a2niInfo from "../../components/El7a2ni-info";
import Background from '../../HealthPack.jpeg';
import Back from "../../components/backButton";

interface HealthPackage {
  name: string;
  feesPerYear: number;
  doctorDiscount: number;
  medicineDiscount: number;
  familysubscribtionDiscount: number;
}

// interface HealthPackagesProps {
//   healthPackages: HealthPackage[]; // Assuming HealthPackage is the type of healthPackages
// }

function HealthPackages() {
  const [healthPackages, sethealthPackages] = useState<HealthPackage[]>([]);
  const [subscribed, setSubscribed] = useState<HealthPackage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/routes/viewSubscribedPackages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubscribed(response.data.subscribedPackages); // Assuming the array of subscribed packages is within response.data.subscribedPackages
      } catch (error: any) {
        console.error("Error fetching Subscribed Health Packages:", error);
        setError(
          `Error fetching Subscribed Health Packages. Details: ${error.message}`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchHealthPackages = async () => {
      try {
        const response = await axios.get("/routes/patient/viewHealthPackage");
        console.log(response.data.healthPackages);
        sethealthPackages(response.data.healthPackages);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchHealthPackages();
  }, []);

  return (

      <>
        <PatientAppBar />
        <div
      style={{
        position: 'relative',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom: '100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Transparent overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>

      <Back />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1>
          <strong>HEALTH PACKAGES</strong>
        </h1>
      </div>
    </div>
        <Container style={{ marginTop: "120px" }}>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
          >
            {healthPackages &&
              healthPackages.map((healthPackage, index) => (
                <Box key={index} m={2} minWidth={300}>
                  <HealthPackageComp
                    healthPackage={healthPackage}
                    healthPackages={subscribed}
                  />
                </Box>
              ))}
          </Box>
        </Container>
        <El7a2niInfo />
      </>

  );
}

export default HealthPackages;
