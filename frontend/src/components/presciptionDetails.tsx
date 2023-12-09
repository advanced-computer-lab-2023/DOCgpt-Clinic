import React, { useState, useEffect } from "react";
import axios from "axios";

const PrescriptionDetailsPage: React.FC = () => {
  const [prescriptionData, setPrescriptionData] = useState<any | null>(null);

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      try {
        // Replace the URL with the actual URL of your Express.js server
        const response = await axios.get(`/callViewMedNames/${prescriptionId}`);
        setPrescriptionData(response.data);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };

    // Replace 'prescriptionId' with the actual prescription ID you want to fetch
    const prescriptionId = "123"; // Replace with the actual prescription ID
    fetchPrescriptionData();
  }, []);

  return (
    <div>
      <h1>Prescription Details</h1>
      {prescriptionData ? (
        <div>
          <h2>Prescription ID: {prescriptionData.prescriptionId}</h2>
          <h3>Medicine Name: {prescriptionData.medicineName}</h3>
          <p>Dosage: {prescriptionData.dosage}</p>
          <p>Quantity: {prescriptionData.quantity}</p>
          {/* Display other prescription details as needed */}
        </div>
      ) : (
        <p>Loading prescription data...</p>
      )}
    </div>
  );
};

export default PrescriptionDetailsPage;
