
import React, { useEffect, useState } from 'react';
import ListOfDoctors from '../../components/listOfDoctors';
import { SearchBar } from '../../components/SearchBarDoc';
import FilterDoctors from '../../components/FilterDoctors';

//import  DoctorFiltered  from '../components/DoctorFiltered';


const PatientPage: React.FC = () => {
  const [showPatients, setshowPatients] = useState(false);

  
  const handleViewPatients = () => {
    setshowPatients(true);
    // Implement logic to show the medicines list when the button is clicked.
  };
 
  return (
    <div>
      <h1>Patient Page</h1>
      <button onClick={handleViewPatients}>View Doctors List</button>
      {showPatients&& <ListOfDoctors /> }{" "}
      <SearchBar />
      <FilterDoctors />
      
    </div>
  );
};

export default PatientPage;





