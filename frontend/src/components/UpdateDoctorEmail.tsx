import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import {useForm} from "react-hook-form";
import { Doctor } from "../models/doctor";
import { DoctorEmail } from "../routes/doctorApis";
import * as DoctorApi from "../routes/doctorApis";


interface UpdateDoctorEmailProps {
    onDismiss: () => void,
    onSaved: (doctor: Doctor) => void,
    doctorUsername: string
}


const UpdateDoctorEmail = ({onDismiss, onSaved, doctorUsername}: UpdateDoctorEmailProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<DoctorEmail>();

    async function onSubmit(email: DoctorEmail) {
        try {
            const doctorResponse = await DoctorApi.updateEmail(email, doctorUsername);
            console.log("updated doctor is"+ doctorResponse);
            
            onSaved(doctorResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
        
    }
    
        return (
        <Dialog open={true} onClose={onDismiss} >
        <DialogTitle>NEW EMAIL</DialogTitle>
        <DialogContent>
            <DialogContentText>
                provide new email
            </DialogContentText>
            <TextField 
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                {...register("email", { required: "Required"})}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={onDismiss}>Cancel</Button>
            <Button 
                type="submit" 
                form="email" 
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
            >
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateDoctorEmail;