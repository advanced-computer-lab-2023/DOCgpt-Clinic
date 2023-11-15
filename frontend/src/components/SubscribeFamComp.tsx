import { Card, Grid, Typography, Button, Menu, MenuItem, CardContent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate, useParams } from "react-router-dom";

interface FamilyMember {
name: string;
relationToPatient: string;
}
interface HealthPackage {
    name: string,
    feesPerYear: number,
    doctorDiscount: number,
    medicineDiscount: number,
    familysubscribtionDiscount: number
}
interface FamilyMemberProps{
    member: FamilyMember;
    packageName: any;
    subscribedPackages: FamilyMemberPackage[];
}
interface FamilyMemberPackage {
  familyMemberName: string;
  package: {
    name: string;
    startdate?: string ;
    enddate?: string ;
    status: 'subscribed with renewal date' | 'unsubscribed' | 'cancelled with end date';
  };
}

function SubscribeFamComp({member, packageName, subscribedPackages}:FamilyMemberProps) {
const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
const [subscribedArray, setSubscribedArray] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [chosenMem, setChosenMem] = useState(false);
const [openAlert, setOpenAlert] = useState(false);
const navigate = useNavigate();
const pack= useParams();


const fetchArray = async () =>
{
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`/routes/getSubscribedPackagesForMember?familyMemberName=${member.name}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.data.subscribedPackages;
        setSubscribedArray(data);
        setChosenMem(true);
        console.log("data", data);        
      } catch (error : any) {
        console.error('Error fetching family members:', error);
        setError(`Error fetching family members. Details: ${error.message}`);
      } finally {
        setLoading(false);
      }
}
useEffect(() => {
  console.log("Updated subscribedArray", subscribedArray);
}, [subscribedArray]);

function Checkubscribed() {
  console.log("subscribed: ", subscribedArray);
  if (Array.isArray(subscribedArray)) {
    let isSubscribed = false;
    subscribedArray.forEach((element) => {
      console.log("element", element.name);
      console.log("packagename", packageName);
      if (element.name === packageName) {
        isSubscribed = true;
      }
    });
    return isSubscribed;
  }
}

useEffect(() => {
  if (chosenMem) {
    const isSubscribed = Checkubscribed();
    console.log(isSubscribed);
    if (isSubscribed) {
      setOpenAlert(true);
    } else {
      const fam = member.name;
      localStorage.setItem('fam',fam);
      navigate(`/subFam/${packageName}`);
    }
  }
}, [chosenMem, subscribedArray]);



const handleFamSub = async () => {
   await fetchArray();
    console.log("hellooo");   
}
return(

    <Grid item xs={12} key={member.name}>
    <Card>
      <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h6" gutterBottom>
            {member.name}
          </Typography>
          <Typography color="textSecondary">
            Relation to Patient: {member.relationToPatient}
          </Typography>
        </div>
        <Button onClick={handleFamSub} variant="contained" color="primary">
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
      </CardContent>
    </Card>
  </Grid>
);

}

export default SubscribeFamComp;