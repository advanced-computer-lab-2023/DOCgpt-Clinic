import { Stack,Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

 const ListOfDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<{ _id: string; name: string; speciality: string; sessionPrice: number }[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await fetch('/routes/doctors');
      const json = await response.json();

      if (response.ok) {
        setDoctors(json);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="ListOfDoctors">
      <div className="doctors" >
        
        <Stack direction='row'>
            
        <Typography variant='subtitle1' gutterBottom>Doctor Name</Typography> 
            
        <Typography variant='subtitle1' gutterBottom>Speciality</Typography>
        
        <Typography variant='subtitle1' gutterBottom>Session Price</Typography>
        
        </Stack>
        {doctors &&
          doctors.map((doctor) => (
            <p key={doctor._id}>{doctor.name} {doctor.speciality} {doctor.sessionPrice}</p>
          ))}
      </div>
    </div>
  );
};

export default ListOfDoctors;








// import { Stack, Button, IconButton } from "@mui/material"
// import React, { useEffect, useState } from 'react';
// import { Typography } from '@mui/material';
// import BluetoothIcon from '@mui/icons-material/Bluetooth';

// export const listOfDoctors = () => {
//     const listOfDoctors: React.FC = () => {
//         const [doctors, setDoctors] = useState<{ _id: string; name: string; speciality: string; sessionPrice: number }[]>([]);
        
      
//         useEffect(() => {
//           const fetchDoctors = async () => {
//             const response = await fetch('/routes/doctors');
//             const json = await response.json();
      
//             if (response.ok) {
//               setDoctors(json);
//             }
//           };
      
//           fetchDoctors();
//         }, []);
      
//         return (
//             <Stack spacing={4}>
//           <div className="listOfDoctors">
//             <Stack spacing={2} direction='row'>
//               <Typography variant='subtitle1' gutterBottom>Doctor Name</Typography>
//               <Typography variant='subtitle1' gutterBottom>Speciality</Typography>
//               <Typography variant='subtitle1' gutterBottom>Session Price</Typography>
//             </Stack>
      
//             <div className="doctors">
//               {doctors &&
//                 doctors.map((doctor) => (
//                   <p key={doctor._id}>{doctor.name} {doctor.speciality} {doctor.sessionPrice}</p>
//                 ))}
//             </div>
//           </div>

//             </Stack>

//         )
//     };
// };