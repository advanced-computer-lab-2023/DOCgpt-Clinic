// SelectedPres.tsx
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Typography, Divider, Grid, Button, List, ListItem, ListItemText, Container, Card, CardContent, DialogContent, Dialog, DialogActions, DialogTitle, DialogContentText } from '@mui/material';
import DrawerAppBar from '../../components/Doctor bar/doctorBar';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Patient from '../../components/Patient';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';


interface Medicine {
  medicineName: string;
  dosage: string;
  quantity: number;
  _id: string;
}
interface Prescription {
  patientUsername: string;
  date: string;
  status: string;
  Medicines: Medicine[];
  _id: string;
}

const DrSelectedPrescription = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState<Prescription>();
  const [open, setOpen] = useState(true);
  const [pdfRef, setPdfRef] = useState<HTMLDivElement | null>(null);
  const [isContentAvailable, setIsContentAvailable] = useState(false);
  const [editable, setEditable] = useState(false);
  const [editedQuantities, setEditedQuantities] = useState<{ [key: string]: number }>({});
  const [editedDosages, setEditedDosages] = useState<{ [key: string]: string }>({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState<string | null>(null);

  
// Define the fetchPrescriptionDetails function
const fetchPrescriptionDetails = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`/routes/getPrescriptionDetails?prescriptionId=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    setPrescription(response.data.prescription);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching prescription details:', error);
  }
};

useEffect(() => {
  // Fetch prescription details on component mount
  fetchPrescriptionDetails();
}, [id]);

// Define the handleMessage function
const handleMessage = (event: MessageEvent) => {
  const { type, prescriptionId, updatedMedicineNames } = event.data;
  
  if (type === 'updateMedicines' && prescriptionId === id) {
    // Call the fetchPrescriptionDetails function
    fetchPrescriptionDetails();
  }
};

// Attach event listener for messages
useEffect(() => {
  window.addEventListener('message', handleMessage);

  // Clean up the event listener on component unmount
  return () => {
    window.removeEventListener('message', handleMessage);
  };
}, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/routes/prescriptions",
        {
          patientUsername: prescription?.patientUsername, // Extract patientUsername from prescription
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Append prescriptionId to the URL
      const newWindow = window.open(
        `http://localhost:3001/doctormedupdate/${id}`,
        "_blank"
      );

      if (!newWindow) {
        console.error("Unable to open a new window.");
      }
    } catch (error) {
      console.error("Error in addPresc:", error);
    }
  };

  const handleDownload = () => {
    console.log('Download button clicked');
    
    if (!isContentAvailable || !pdfRef) {
      console.error('PDF reference is not available');
      return;
    }

    html2canvas(pdfRef).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('prescription.pdf');
    });
  };

  useEffect(() => {
    if (pdfRef) {
      setIsContentAvailable(true);
    }
  }, [pdfRef]);

  const formattedDate = prescription && new Date(prescription.date).toISOString().split('T')[0];
  const navigate=useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate('/doctor/DrPrescription');

  };

  const handleEdit = () => {
    setEditable(true);
    // Initialize the edited quantities and dosages with the current values
    const initialQuantities: { [key: string]: number } = {};
    const initialDosages: { [key: string]: string } = {};
    const initialNames: { [key: string]: string } = {};
    prescription?.Medicines.forEach((medicine) => {
      initialQuantities[medicine._id] = medicine.quantity;
      initialDosages[medicine._id] = medicine.dosage;
      initialNames[medicine._id] = medicine.medicineName;
    });
    setEditedQuantities(initialQuantities);
    setEditedDosages(initialDosages);
  };

  // const handleDone = async () => {
  //   try {
  //     const token = localStorage.getItem('authToken');

  //     // Iterate over the editedQuantities and editedDosages
  //     for (const medicineId in editedQuantities) {
  //       const response = await axios.put(
  //         `/updatePrescMed/${id}`,
  //         {
  //           medicineId,
  //           quantity: editedQuantities[medicineId],
  //           dosage: editedDosages[medicineId],
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
        
  //       // Handle the response if needed
  //       console.log(response.data);
  //     }

  //     // Notify the parent component or handle success
  //   } catch (error) {
  //     console.error('Error updating medicines:', error);
  //   }
  // };
  
  
  const handleDone = () => {
    // Call an API or update your state with the edited values
    console.log('Edited Quantities:', editedQuantities);
    console.log('Edited Dosages:', editedDosages);
  
    // Update the prescription with the edited values
    setPrescription((prevPrescription) => {
      if (prevPrescription) {
        const updatedMedicines = prevPrescription.Medicines.map((medicine) => ({
          ...medicine,
          dosage: editedDosages[medicine._id] || medicine.dosage,
          quantity: editedQuantities[medicine._id] || medicine.quantity,
        }));
        return {
          ...prevPrescription,
          Medicines: updatedMedicines,
        };
      }
      return prevPrescription;
    });
  
    // Reset the state and exit the editable mode
    setEditable(false);
  };
  

// Frontend: Handle "done" button click
// const handleDone = async () => {
//   try {
//     if (!prescription) {
//       console.error('Prescription not available');
//       return;
//     }

//     // Use Promise.all to wait for all asynchronous operations to complete
//     const updatedMedicines = await Promise.all(
//       prescription.Medicines.map(async (medicine) => {
//         try {
//           const response = await axios.put(`/routes/updateMedicineDetails/${id}`, {
//             medicineId: medicine._id,
//             quantity: editedQuantities[medicine._id] || medicine.quantity,
//             dosage: editedDosages[medicine._id] || medicine.dosage,
//           });

//           // Ensure that the response format matches your expected format
//           const updatedPrescription = response.data.updatedPrescription;
//           const updatedMedicine = updatedPrescription.Medicines.find((m : any) => m._id === medicine._id);

//           return updatedMedicine || null;
//         } catch (error) {
//           console.error('Error updating medicine on the backend:', error);
//           return null; // or handle the error as appropriate
//         }
//       })
//     );

//     // Filter out any null values (failed updates) before updating the state
//     const filteredUpdatedMedicines = updatedMedicines.filter((m) => m !== null);

//     // Fetch prescription details after updating all medicines
//     refreshPrescriptionDetails();

//     // Update the prescription with the edited values on the frontend
//     setPrescription((prevPrescription) => {
//       if (prevPrescription) {
//         return {
//           ...prevPrescription,
//           Medicines: filteredUpdatedMedicines,
//         };
//       }

//       return prevPrescription;
//     });

//     // Reset the state and exit the editable mode
//     setEditable(false);
//   } catch (error) {
//     console.error('Error updating medicines on the frontend:', error);
//   }
// };


  const handleRemoveMedicine = (medicineId: string) => {
    setMedicineToDelete(medicineId);
    setDeleteConfirmationOpen(true);
  };

   // Move the fetchPrescriptionDetails logic into a separate function
   const refreshPrescriptionDetails = async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('iddd',id);
      const response = await axios.get(`/routes/getPrescriptionDetails?prescriptionId=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setPrescription(response.data.prescription);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching prescription details:', error);
    }
  };

  useEffect(() => {
    // Fetch prescription details on component mount
    refreshPrescriptionDetails();
  }, [id]);

  // ... (your existing functions)

  const handleConfirmRemove = async () => {
    // Remove the medicine only if it's confirmed
    if (medicineToDelete) {
      try {
        // Use your backend endpoint to delete the medicine
        const token = localStorage.getItem('authToken');
        await axios.delete(`/routes/deleteMedPresc/${id}`, {
          data: { medicineId: medicineToDelete }, // Assuming you have the medicineId to delete
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Refresh prescription details after deletion
        refreshPrescriptionDetails();
      } catch (error) {
        console.error('Error removing medicine:', error);
      }
    }
  
    // Close the confirmation dialog
    setDeleteConfirmationOpen(false);
  };
  
  
  
  
  const handleCancelRemove = () => {
    // Cancel the removal and close the confirmation dialog
    setDeleteConfirmationOpen(false);
  };
  


  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'center' }}>
          PRESCRIPTION DETAILS
        </Typography>
      </DialogTitle>
      <DialogContent ref={(ref: HTMLDivElement | null) => setPdfRef(ref)}>
        {prescription ? (
          <Container>
            <Divider style={{ margin: '16px 0' }} />
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <strong>Patient:</strong> {prescription.patientUsername}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Date:</strong> {formattedDate}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Status:</strong> {prescription.status}
            </Typography>
            <Divider style={{ margin: '16px 0' }} />

            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Medicines:</strong>
            </Typography>
      <List>
  {prescription.Medicines &&
    prescription.Medicines.map((medicine, index) => (
      <ListItem key={index}>
        {editable ? (
          <>
            <ListItemText
              primary={`${medicine.medicineName} - Dosage: `}
            />
           <TextField
            type="text"
            value={editedDosages[medicine._id] || ''}
            onChange={(e) =>
              setEditedDosages({
                ...editedDosages,
                [medicine._id]: e.target.value,
              })
            }
            InputProps={{
              style: { width: '65px', marginLeft: '-100px', height: '20px'}, // Set the desired width
            }}
          />
            <ListItemText
              primary={`Quantity: `}
            />
           <TextField
            type="number"
            value={editedQuantities[medicine._id] || ''}
            onChange={(e) =>
              setEditedQuantities({
                ...editedQuantities,
                [medicine._id]: +e.target.value,
              })
            }
            InputProps={{
              style: { width: '60px', marginLeft: '-100px', height: '20px'}, // Set the desired width
            }}
          />
          <DeleteIcon
                    color="error"
                    onClick={() => handleRemoveMedicine(medicine._id)}
                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                  />
          </>
        ) : (
          <ListItemText
            primary={`${medicine.medicineName} - Dosage: ${medicine.dosage}, Quantity: ${medicine.quantity}`}
          />
        )}
      </ListItem>
    ))}
</List>

          </Container>
        ) : (
          <p>Loading..</p>
        )}
      </DialogContent>
      <DialogActions>
      {editable ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleDone}
          >
            Done
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleUpdate}
        >
          Add More
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleDownload}
          startIcon={<FileDownloadSharpIcon />}
        >
          Download
        </Button>
      </DialogActions>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleCancelRemove}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this medicine?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemove} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmRemove} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default DrSelectedPrescription;