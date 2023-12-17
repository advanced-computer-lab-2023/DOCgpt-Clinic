import React, { useState } from 'react';

const AddPackage = () => {
  const [name, setName] = useState('');
  const [feesPerYear, setFeesPerYear] = useState(0);
  const [doctorDiscount, setDoctorDiscount] = useState(0);
  const [medicineDiscount, setMedicineDiscount] = useState(0);
  const [familysubscribtionDiscount, setFamilysubscribtionDiscount] = useState(0);
  const [message, setMessage] = useState('');

  const handleAddPackage = async () => {
    try {
      const response = await fetch('/routes/addPackage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          feesPerYear,
          doctorDiscount,
          medicineDiscount,
          familysubscribtionDiscount,
        }),
      });

      if (response.ok) {
        setMessage('Package added successfully');
      } else {
        const data = await response.json();
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('Internal server error');
    }
  };
  const token = localStorage.getItem("authToken");
 
  return (
    <div>
      <h2>Add Package</h2>
      <div>
        <label htmlFor="name">Package Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="feesPerYear">Fees Per Year:</label>
        <input
          type="number"
          id="feesPerYear"
          value={feesPerYear}
          onChange={(e) => setFeesPerYear(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="doctorDiscount">Doctor Discount:</label>
        <input
          type="number"
          id="doctorDiscount"
          value={doctorDiscount}
          onChange={(e) => setDoctorDiscount(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="medicineDiscount">Medicine Discount:</label>
        <input
          type="number"
          id="medicineDiscount"
          value={medicineDiscount}
          onChange={(e) => setMedicineDiscount(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="familysubscribtionDiscount">Family Subscribtion Discount:</label>
        <input
          type="number"
          id="familysubscribtionDiscount"
          value={familysubscribtionDiscount}
          onChange={(e) => setFamilysubscribtionDiscount(Number(e.target.value))}
        />
      </div>
      <button onClick={handleAddPackage}>Add Package</button>
      <div>{message}</div>
    </div>
  );
};















export default AddPackage;
