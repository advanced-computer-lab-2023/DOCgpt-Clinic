import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import {useForm} from "react-hook-form";
import { Doctor } from "../models/doctor";
import { DoctorHospital } from "../routes/doctorApis";
import * as DoctorApi from "../routes/doctorApis";


interface UpdateDoctorHospitalProps {
    onDismiss: () => void,
    onSaved: (doctor: Doctor) => void,
    doctorId: string
}


const UpdateDoctorHospital = ({onDismiss, onSaved, doctorId}: UpdateDoctorHospitalProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<DoctorHospital>();

    async function onSubmit(affiliation: DoctorHospital) {
        try {
            const doctorResponse = await DoctorApi.updateAffiliation(affiliation, doctorId);
            onSaved(doctorResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
        
    }
    
        return (
        <Dialog open={true} onClose={onDismiss} >
        <DialogTitle>NEW HOSPITAL</DialogTitle>
        <DialogContent>
            <DialogContentText>
                provide new hospital
            </DialogContentText>
            <TextField 
                autoFocus
                margin="dense"
                id="hospital"
                label="Affiliation"
                type="string"
                fullWidth
                variant="standard"
                {...register("affiliation", { required: "Required"})}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={onDismiss}>Cancel</Button>
            <Button 
                type="submit" 
                form="hospital" 
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
            >
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateDoctorHospital;