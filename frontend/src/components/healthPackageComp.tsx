import { Card, Grid, Typography, Button, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Navigate, useNavigate } from "react-router-dom";

interface HealthPackage {
    name: string,
    feesPerYear: number,
    doctorDiscount: number,
    medicineDiscount: number,
    familysubscribtionDiscount: number
}
interface healthPackageProps{
    healthPackage: any;
    healthPackages: HealthPackage[];
}

const HealthPackageComp = ({healthPackage , healthPackages}:healthPackageProps) =>{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openAlert, setOpenAlert] = useState(false);
    const navigate= useNavigate();
  
    console.log('HealthPackages prop:', healthPackages);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleCloseMenu = (target: string, packageName: string) => {
        setAnchorEl(null);
       
        
        
       
        if (target === 'myself' && packageName) {
            
            
            
            if (Array.isArray(healthPackages)) {
               
                const isSubscribed = healthPackages.some(p => p.name === packageName);
                console.log(isSubscribed)
                if (isSubscribed) {
                    setOpenAlert(true);
                } else {
                   navigate(`/health-package-subscription/${packageName}`);
                }
              } 
               
              

        } 


        else if (target === 'familyMember' && packageName) {
            
            window.location.href = `/patient/SubscribeFam?packageName=${packageName}`;
            
        }
        

      };

      const handleCloseAlert = (event: React.SyntheticEvent, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false); // Close the alert
    };

    return(
        <Card style={{padding: '20px', margin: '20px'}}>
                <Grid container>
                    <Grid item xs={10}>
                    <Typography variant="h5" style={{ fontWeight: 'bold'}}> Package Name: {healthPackage.name}</Typography>
                    <Typography> feesPerYear: {healthPackage.feesPerYear}</Typography>
                    <Typography> doctorDiscount: {healthPackage.doctorDiscount}</Typography>
                    <Typography> medicineDiscount: {healthPackage.medicineDiscount}</Typography>
                    <Typography> familysubscribtionDiscount: {healthPackage.familysubscribtionDiscount}</Typography>
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="contained" onMouseOver={handleOpenMenu}>
                Subscribe
              </Button>
              <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={() => setOpenAlert(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <MuiAlert severity="warning" sx={{ width: '100%', fontSize: '1.5rem' }}>
                Package Already Subscribed
            </MuiAlert>
        </Snackbar>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={() => handleCloseMenu('myself' ,healthPackage.name)}>For Myself</MenuItem>
                <MenuItem onClick={() => handleCloseMenu('familyMember', healthPackage.name)}>For a Family Member</MenuItem>
              </Menu>
            </Grid>
                </Grid>
            </Card>
            
    );
}
export default HealthPackageComp;