import { Button, Card, Container, Grid, Typography,  Menu, MenuItem } from "@mui/material";
import { blue } from "@mui/material/colors";
import axios from "axios";
import { Key, useEffect, useState } from "react";

interface HealthPackage {
    name: string,
    feesPerYear: number,
    doctorDiscount: number,
    medicineDiscount: number,
    familysubscribtionDiscount: number
}

function HealthPackages() {

    const [healthPackages, sethealthPackages] = useState<HealthPackage[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleCloseMenu = () => {
        setAnchorEl(null);
      };

    useEffect(() => {
        const fetchHealthPackages = async () =>
        {
            try{
                const response = await axios.get('/routes/patient/viewHealthPackage');
                console.log(response.data.healthPackages);
                sethealthPackages(response.data.healthPackages);
                
            }
            catch(error){
                console.log("Error", error);
                
            }
        }
        fetchHealthPackages();
    }, []);


    return(
        <Container>
           {healthPackages && healthPackages.map((healthPackage)=>(
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
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>For Myself</MenuItem>
                <MenuItem onClick={handleCloseMenu}>For a Family Member</MenuItem>
              </Menu>
            </Grid>
                </Grid>
            </Card>
            // <SarahComp  healthPackage= {healthPackage}></SarahComp>
           ))}
        </Container>
    );

}

export default HealthPackages;