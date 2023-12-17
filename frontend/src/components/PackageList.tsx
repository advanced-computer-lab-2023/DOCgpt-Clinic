import { Typography } from '@mui/material';
import React, { useState, ChangeEvent } from 'react';

interface Package {
  _id: string;
  name: string;
  feesPerYear: number;
  doctorDiscount: number;
  medicineDiscount: number;
  familysubscribtionDiscount: number;
}

const PackageList: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [error, setError] = useState<string | null>();

  // State to store the edited values
  const [editedPackages, setEditedPackages] = useState<Package[]>([]);

  const handleViewPackages = async () => {
    try {
      const response = await fetch('/routes/getpack');
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error retrieving packages');
      }
      const data = await response.json();
      setPackages(data.packages);
      // Initialize the editedPackages state with the initial package data
      setEditedPackages(data.packages);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Internal server error');
    }
  };

  const handleUpdatePackage = async (index: number, packageName: string) => {
    try {console.log('Updating package:', packageName);
      const updatedPackage = editedPackages[index];

      console.log('Sending update request with name:', packageName);

      const response = await fetch('/routes/updatePackage', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...updatedPackage, name: packageName }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Error updating package');
      } else {
        setError(null);
        // Refresh the package list
        handleViewPackages();
      }
    } catch (error) {
      setError('Internal server error');
    }
  };

  const handleEditChange = (index: number, attribute: string, value: string) => {
    // Create a copy of the edited packages and update the specific attribute
    const editedCopy = [...editedPackages];
    editedCopy[index] = {
      ...editedCopy[index],
      [attribute]: value,
    };
    setEditedPackages(editedCopy);
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
      <h2>Package List</h2>
      <button onClick={handleViewPackages}>View Packages</button>
      {error ? (
        <div>Error: {error}</div>
      ) : packages.length > 0 ? (
        <ul>
          {packages.map((pkg, index) => (
            <li key={pkg._id}>
              <h3>{pkg.name}</h3>
              <p>
                Fees Per Year:{' '}
                <input
                  type="text"
                  value={editedPackages[index].feesPerYear}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleEditChange(index, 'feesPerYear', e.target.value)
                  }
                />
              </p>
              <p>
                Doctor Discount:{' '}
                <input
                  type="text"
                  value={editedPackages[index].doctorDiscount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleEditChange(index, 'doctorDiscount', e.target.value)
                  }
                />
              </p>
              <p>
                Medicine Discount:{' '}
                <input
                  type="text"
                  value={editedPackages[index].medicineDiscount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleEditChange(index, 'medicineDiscount', e.target.value)
                  }
                />
              </p>
              <p>
                Family Subscription Discount:{' '}
                <input
                  type="text"
                  value={editedPackages[index].familysubscribtionDiscount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleEditChange(index, 'familysubscribtionDiscount', e.target.value)
                  }
                />
              </p>
              <button onClick={() => handleUpdatePackage(index, pkg.name)}>Update</button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default PackageList;
