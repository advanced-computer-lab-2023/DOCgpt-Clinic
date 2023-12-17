import { Typography } from "@mui/material";
import React, { useState } from "react";

// Define the attributes that can be updated
const attributes = [
 
  "name",
  "feesPerYear",
  "doctorDiscount",
  "medicineDiscount",
  "familysubscribtionDiscount",
];

const PackageUpdateForm: React.FC = () => {
  const [packageName, setPackageName] = useState<string>("");
  const [selectedAttribute, setSelectedAttribute] = useState<string>("");
  const [newValue, setNewValue] = useState<string>("");

  const handlePackageNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPackageName(event.target.value);
  };

  const handleAttributeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedAttribute(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(event.target.value);
  };

  const handleUpdate = () => {
    // Make an API call to update the Package with PackageName, selectedAttribute, and newValue
    // You may want to add validation and error handling here

    // Example API call (replace with your actual API endpoint)
    fetch("/routes/updatePackage", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: packageName,
        [selectedAttribute]: newValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Package updated:", data);
      })
      .catch((error) => {
        console.error("Error updating Package:", error);
      });
  };
  const token = localStorage.getItem("authToken");
  if (!token) {
    return (
      <div>
        <Typography component="h1" variant="h5">
          access denied
        </Typography>
      </div>
    );
  }
  return (
    <div>
      <label>Package Name:</label>
      <input
        type="text"
        value={packageName}
        onChange={handlePackageNameChange}
      />

      <label>Select Attribute to Update:</label>
      <select onChange={handleAttributeChange}>
        <option value="">Select an Attribute</option>
        {attributes.map((attribute) => (
          <option key={attribute} value={attribute}>
            {attribute}
          </option>
        ))}
      </select>

      {selectedAttribute && (
        <div>
          <label>Enter New Value:</label>
          <input type="text" value={newValue} onChange={handleValueChange} />
          <button onClick={handleUpdate}>Update Package</button>
        </div>
      )}
    </div>
  );
};

export default PackageUpdateForm;

