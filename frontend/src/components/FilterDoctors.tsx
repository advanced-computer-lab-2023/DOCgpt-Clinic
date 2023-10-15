import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField } from '@mui/material';
import axios from 'axios';

const ViewAllDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const [availability, setavailability] = useState<string>('');
  
  useEffect(() => {
    // Fetch all doctors when the component mounts
    axios.get(`/routes/doctors/filter`)
      .then((response) => {
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    // Filter doctors based on the search value
    const filtered = doctors.filter((doctor: any) =>
      doctor.speciality.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchValue, doctors]);

  useEffect(() => {
    axios.get(`/routes/appointments/getAll`)
      .then((response) => {
        setAppointments(response.data);
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [date]);

  useEffect(() => {
    // Filter doctors based on the search value
    // const appointmentsOnDate = appointments.filter((appointment) => {
    //     appointment.date === date
    // });
    
        const filtered = doctors.filter((doctor) => {
            // Check if the doctor's username doesn't exist in any appointment on the given date
            return !appointments.some((appointment) => {
              return appointment.doctor === doctor.username && appointment.date === date;
            });
          });
    setFilteredDoctors(filtered);
  }, [date]);



  return (
    <div>
      <Typography variant="h4" gutterBottom>
        View All Doctors
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Filter by Speciality"
        variant="outlined"
        fullWidth
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Enter speciality"
      />

      {/* Date Input */}
      <TextField
        label="Filter by Date (YYYY-MM-DDTHH:MM:SS.000+00:00)"
        variant="outlined"
        fullWidth
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Enter date (YYYY-MM-DDTHH:MM:SS.000+00:00)"
      />

      {filteredDoctors.map((doctor: any, index: number) => (
        <Box key={index} sx={{ border: '1px solid #ccc', padding: 2, marginBottom: 2 }}>
          <Typography variant="h6">{doctor.name}</Typography>
          <Typography>Email: {doctor.email}</Typography>
          <Typography>Speciality: {doctor.speciality}</Typography>
          <Typography>Hourly Rate: {doctor.hourlyRate}</Typography>
          <Typography>Affiliation: {doctor.affiliation}</Typography>
          <Typography>Educational Background: {doctor.educationalBackground}</Typography>
          <Typography>  App: {appointments.length}</Typography>

        </Box>
      ))}
    </div>
  );
};

export default ViewAllDoctors;



// import React, { useState, useEffect } from 'react';
// import { Typography, Box, TextField } from '@mui/material';
// import axios from 'axios';
// import Appointments from './Appointments';

// const ViewAllDoctors: React.FC = () => {
//   const [doctors, setDoctors] = useState<any[]>([]);
//   const [searchValue, setSearchValue] = useState<string>('');
//   const [date, setDate] = useState<string>('');
//   const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);

//   useEffect(() => {
//     // Fetch all doctors when the component mounts
//     axios.get(`http://localhost:4000/routes/doctors/filter`)
//       .then((response) => {
//         setDoctors(response.data);
//         setFilteredDoctors(response.data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }, []);

//   useEffect(() => {
//     // Filter doctors based on the search value
//     const filtered = doctors.filter((doctor: any) =>
//       doctor.speciality.toLowerCase().includes(searchValue.toLowerCase())
//     );
//     setFilteredDoctors(filtered);
//   }, [searchValue, doctors]);

//   // Assuming date is in the "YYYY-MM-DDTHH:MM:SS.000+00:00" format
// //const dateObject = new Date(date);


//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         View All Doctors
//       </Typography>

//       {/* Search Bar */}
//       <TextField
//         label="Filter by Speciality"
//         variant="outlined"
//         fullWidth
//         value={searchValue}
//         onChange={(e) => setSearchValue(e.target.value)}
//         placeholder="Enter speciality"
//       />

//       {/* Date Input */}
//       <TextField
//         label="Filter by Date (YYYY-MM-DDTHH:MM:SS.000+00:00)"
//         variant="outlined"
//         fullWidth
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         placeholder="Enter date (YYYY-MM-DDTHH:MM:SS.000+00:00)"
//       />

//       {filteredDoctors.map((doctor: any, index: number) => (
//         <Box key={index} sx={{ border: '1px solid #ccc', padding: 2, marginBottom: 2 }}>
//           <Typography variant="h6">{doctor.name}</Typography>
//           <Typography>Email: {doctor.email}</Typography>
//           <Typography>Speciality: {doctor.speciality}</Typography>
//           <Typography>Hourly Rate: {doctor.hourlyRate}</Typography>
//           <Typography>Affiliation: {doctor.affiliation}</Typography>
//           <Typography>Educational Background: {doctor.educationalBackground}</Typography>
//           {/* <Appointments doctorId={doctor._id} date={dateObject}  /> */}
//         </Box>
//       ))}
//     </div>
//   );
// };

// export default ViewAllDoctors;










// import React, { useState, useEffect } from 'react';
// import { Typography, Box, TextField, Button, Grid, FormControlLabel, Checkbox, FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldVariants } from '@mui/material';
// import { DatePicker, TimePicker } from '@mui/lab';
// import axios from 'axios';
// import { JSX } from 'react/jsx-runtime';

// const ViewAllDoctors: React.FC = () => {
//   const [doctors, setDoctors] = useState<any[]>([]);
//   const [searchValue, setSearchValue] = useState<string>('');
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedTime, setSelectedTime] = useState<Date | null>(null);
//   const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
//   const [includeDate, setIncludeDate] = useState(false);
//   const [includeTime, setIncludeTime] = useState(false);

//   const handleSearch = () => {
//     // Perform search/filtering based on selectedDate and selectedTime
//     // Make an API request to your backend here to get filtered results

//     axios.get(`/routes/doctors/filter`, {
//       params: {
//         date: selectedDate,
//         time: selectedTime,
//         speciality: searchValue,
//       },
//     })
//       .then((response) => {
//         setFilteredDoctors(response.data);
//       })
//       .catch((error) => {
//         console.error('Error searching for doctors: ', error);
//       });
//   };

//   useEffect(() => {
//     // Fetch all doctors when the component mounts
//     axios.get(`/routes/doctors`)
//       .then((response) => {
//         setDoctors(response.data);
//         setFilteredDoctors(response.data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         View All Doctors
//       </Typography>

//       {/* Search Bar */}
//       <TextField
//         label="Filter by Speciality"
//         variant="outlined"
//         fullWidth
//         value={searchValue}
//         onChange={(e) => setSearchValue(e.target.value)}
//         placeholder="Enter speciality"
//       />

//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={includeDate}
//                 onChange={() => setIncludeDate(!includeDate)}
//                 name="includeDate"
//                 color="primary"
//               />
//             }
//             label="Include Date"
//           />
//           {includeDate && (
//             <DatePicker
//               label="Select Date"
//               value={selectedDate}
//               onChange={(newDate: React.SetStateAction<Date | null>) => setSelectedDate(newDate)}
//               renderInput={(params: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } & Omit<FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps, "variant">) => <TextField {...params} variant="outlined" fullWidth />}
//             />
//           )}
//         </Grid>
//         <Grid item xs={6}>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={includeTime}
//                 onChange={() => setIncludeTime(!includeTime)}
//                 name="includeTime"
//                 color="primary"
//               />
//             }
//             label="Include Time"
//           />
//           {includeTime && (
//             <TimePicker
//               label="Select Time"
//               value={selectedTime}
//               onChange={(newTime: React.SetStateAction<Date | null>) => setSelectedTime(newTime)}
//               renderInput={(params: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } & Omit<FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps, "variant">) => <TextField {...params} variant="outlined" fullWidth />}
//             />
//           )}
//         </Grid>
//       </Grid>

//       <Button variant="contained" color="primary" onClick={handleSearch}>
//         Search
//       </Button>

//       {filteredDoctors.map((doctor: any, index: number) => (
//         <Box key={index} sx={{ border: '1px solid #ccc', padding: 2, marginBottom: 2 }}>
//           <Typography variant="h6">{doctor.name}</Typography>
//           <Typography>Email: {doctor.email}</Typography>
//           <Typography>Speciality: {doctor.speciality}</Typography>
//           <Typography>Date: {doctor.date}</Typography>
//           <Typography>Hourly Rate: {doctor.hourlyRate}</Typography>
//           <Typography>Affiliation: {doctor.affiliation}</Typography>
//         </Box>
//       ))}
//     </div>
//   );
// };

// export default ViewAllDoctors;







