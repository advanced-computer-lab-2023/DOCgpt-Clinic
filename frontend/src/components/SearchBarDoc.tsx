import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, IconButton, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Doctor {
  _id: string;
  username: string;
  name: string;
  email: string;
//   password: string;
//   dateOfBirth: string;
   hourlyRate: number;
  affiliation: string;
  speciality: string;
  educationalBackground: string;
}

export const SearchBar: React.FC = () => {
  const [nameSearchTerm, setNameSearchTerm] = useState('');
  const [specialitySearchTerm, setSpecialitySearchTerm] = useState('');
  const [searchDoctors, setSearchDoctor] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  async function searchDocs() {
    try {
      const res = await axios.get(`/routes/doctors/search?name=${nameSearchTerm}&speciality=${specialitySearchTerm}`);
      setSearchDoctor(res.data);
    } catch (error) {
      console.error('Error searching for doctors: ', error);
    }
  }

  useEffect(() => {
    // Trigger the search when nameSearchTerm or specialitySearchTerm changes
    searchDocs();
  }, [nameSearchTerm, specialitySearchTerm]);

  return (
    <div>
      <TextField
        label="Search by Name"
        variant="outlined"
        value={nameSearchTerm}
        onChange={(e) => setNameSearchTerm(e.target.value)}
      />
      <TextField
        label="Search by Speciality"
        variant="outlined"
        value={specialitySearchTerm}
        onChange={(e) => setSpecialitySearchTerm(e.target.value)}
      />

      <IconButton onClick={searchDocs}>
        <SearchIcon />
      </IconButton>

      {/* Conditional rendering of the search results */}
      {nameSearchTerm || specialitySearchTerm ? (
        <List>
          {searchDoctors.map((doctor) => (
            <ListItem button key={doctor._id} onClick={() => setSelectedDoctor(doctor)}>
              <ListItemText primary={doctor.name} />
            </ListItem>
          ))}
        </List>
      ) : null}

      {/* Display selected doctor's details */}
      {selectedDoctor && (
        <div>
          <h3>{selectedDoctor.username}</h3>
          <p>Name: {selectedDoctor.name}</p>
          <p>Email: {selectedDoctor.email}</p>
          {/* <p>Password: {selectedDoctor.password}</p>
          <p>DateOfBirth: {new Date(selectedDoctor.dateOfBirth).toLocaleDateString()}</p> */}
          <p>HourlyRate: {selectedDoctor.hourlyRate}</p>
          <p>Affiliation: {selectedDoctor.affiliation}</p>
          <p>Speciality: {selectedDoctor.speciality}</p>
          <p>EducationalBackground: {selectedDoctor.educationalBackground}</p>
        </div>
      )}
    </div>
  );
};














// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// interface Doctor {
//   _id: string;
//   username: string;
//   name: string;
//   email: string;
//   password: string;
//   dateOfBirth: string;
//   hourlyRate: number;
//   affiliation: string;
//   speciality: string;
//   educationalBackground: string;
// }

// export const SearchBar: React.FC = () => {
//   const [nameSearchTerm, setNameSearchTerm] = useState('');
//   const [specialitySearchTerm, setSpecialitySearchTerm] = useState('');
//   const [searchDoctors, setSearchDoctor] = useState<Doctor[]>([]);

//   async function searchDocs() {
//     try {
//       const res = await axios.get(`/routes/doctors/search?name=${nameSearchTerm}&speciality=${specialitySearchTerm}`);
//       setSearchDoctor(res.data);
//     } catch (error) {
//       console.error('Error searching for doctors: ', error);
//     }
//   }

//   useEffect(() => {
//   }, []);

//   return (
//     <div>
//       <TextField
//         label="Search by Name"
//         variant="outlined"
//         value={nameSearchTerm}
//         onChange={(e) => setNameSearchTerm(e.target.value)}
//       />
//       <TextField
//         label="Search by Speciality"
//         variant="outlined"
//         value={specialitySearchTerm}
//         onChange={(e) => setSpecialitySearchTerm(e.target.value)}
//       />

//       <IconButton onClick={searchDocs}>
//         <SearchIcon />
//       </IconButton>

//       {/* Display search results */}
//       <div>
//         {searchDoctors.map((doctor) => (
//           <div key={doctor._id}>
//             <h3>{doctor.username}</h3>
//             <p>Name: {doctor.name}</p>
//             <p>Email: {doctor.email}</p>
//             <p>Password: {doctor.password}</p>
//             <p>DateOfBirth: {new Date(doctor.dateOfBirth).toLocaleDateString()}</p>
//             <p>HourlyRate: {doctor.hourlyRate}</p>
//             <p>Affiliation: {doctor.affiliation}</p>
//             <p>Speciality: {doctor.speciality}</p>
//             <p>EducationalBackground: {doctor.educationalBackground}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
