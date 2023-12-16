// SelectedPres.tsx
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Typography, Divider, Grid, Button, List, ListItem, ListItemText, Container, Card, CardContent, DialogContent, Dialog, DialogActions, DialogTitle } from '@mui/material';
import DrawerAppBar from '../../components/Doctor bar/doctorBar';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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

  
  useEffect(() => {
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

    fetchPrescriptionDetails();
  }, [id]);

  const handleUpdate = () => {
    console.log('Update button clicked');
  };


  const handleDownload = () => {
    console.log('Download button clicked');
    
    if (!isContentAvailable || !pdfRef) {
      console.error('PDF reference is not available');
      return;
    }

    // const input = pdfRef.current;
    // if (!input) {
    //   console.error('PDF reference is not available');
    //   return;
    // }

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
                    <ListItemText
                      primary={`${medicine.medicineName} - Dosage: ${medicine.dosage}, Quantity: ${medicine.quantity}`}
                    />
                  </ListItem>
                ))}
            </List>
          </Container>
        ) : (
          <p>Loading..</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleUpdate}
        >
          Update
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
    </Dialog>
  );
};


export default DrSelectedPrescription;
