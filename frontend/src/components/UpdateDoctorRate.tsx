import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import {useForm} from "react-hook-form";
import { Doctor } from "../models/doctor";
import { DoctorRate } from "../routes/doctorApis";
import * as DoctorApi from "../routes/doctorApis";


interface UpdateDoctorRateProps {
    onDismiss: () => void,
    onSaved: (doctor: Doctor) => void,
    doctorUsername: string

}


const UpdateDoctorRate = ({onDismiss, onSaved, doctorUsername}: UpdateDoctorRateProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<DoctorRate>();

    async function onSubmit(rate: DoctorRate) {
        try {
            const doctorResponse = await DoctorApi.updateRate(rate,  doctorUsername);
            onSaved(doctorResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
        
    }
    
        return (
        <Dialog open={true} onClose={onDismiss} >
        <DialogTitle>NEW RATE</DialogTitle>
        <DialogContent>
            <DialogContentText>
                provide new rate
            </DialogContentText>
            <TextField 
                autoFocus
                margin="dense"
                id="rate"
                label="Hourly Rate"
                type="number"
                fullWidth
                variant="standard"
                {...register("hourlyRate", { required: "Required"})}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={onDismiss}>Cancel</Button>
            <Button 
                type="submit" 
                form="rate" 
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
            >
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateDoctorRate;