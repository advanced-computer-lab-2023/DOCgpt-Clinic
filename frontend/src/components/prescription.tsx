import React from 'react';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

interface Medicine {
  medicineName: string;
  dosage: string;
  quantity: number;
  _id: string;
}

interface Prescription {
  doctorName: string;
  date: string;
  status: string;
  medicines: Medicine[];
}

const PrescriptionCard: React.FC<{ prescription: Prescription }> = ({ prescription }) => {
  const { doctorName, date, status, medicines } = prescription;

  const handleDownload = () => {
    console.log('Download button clicked');
  };

  const handleCheckout = () => {
    console.log('Checkout button clicked');
  };

  return (
    <Card style={{ width: '300px', margin: '16px' }}>
      <CardContent>
        <Typography variant="h6" align="center">
          Prescription
        </Typography>
        <Button
              variant="outlined"
              color="secondary"
              onClick={handleCheckout}
              startIcon={<ShoppingCartCheckoutSharpIcon />}
            >
              Checkout
            </Button>

        <Divider style={{ margin: '8px 0' }} />
        <Typography variant="body1" color="textSecondary" gutterBottom>
          <strong>Doctor:</strong> {doctorName}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>Date:</strong> {date}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>Status:</strong> {status}
        </Typography>
        <Divider style={{ margin: '8px 0' }} />
        <List>
          {medicines.map((medicine, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={`${medicine.medicineName} - Dosage: ${medicine.dosage}, Quantity: ${medicine.quantity}`}
                />
              </ListItem>
            
            </div>
          ))}
        </List>
        <Divider style={{ margin: '8px 0' }} />
        {status === 'notFilled' && (
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-around' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDownload}
              startIcon={<FileDownloadSharpIcon />}
            >
              Download
            </Button>
          
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PrescriptionCard;
