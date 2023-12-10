import { Doctor } from "../models/doctor";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if(response.ok){
        return response;
    } else{
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    } 
}


export async function fetchDoctor(doctorUsername: string | undefined): Promise<Doctor[]>{
    const response = await fetchData(`/routes/doctors/getDoctor?doctorUsername=${doctorUsername}`, { method: "GET"});
    
    const doctors = [await response.json()]; 
    console.log("doctors fetched:"+doctors);
    return doctors;
}

export interface DoctorEmail {
    email: string
}
export interface DoctorRate {
    hourlyRate: number
}
export interface DoctorHospital {
    affiliation: string
}

export async function updateEmail(doctorEmail: DoctorEmail, doctorUsername: string): Promise<Doctor> {
    const response = await fetch(`/routes/doctors/updateEmail?doctorUsername=${doctorUsername}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorEmail), 
    });
    return response.json();
}

export async function updateRate(doctorRate: DoctorRate, doctorUsername: string): Promise<Doctor> {
    const response = await fetch(`/routes/doctors/updateRate?doctorUsername=${doctorUsername}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorRate), 
    });
    return response.json();
}

export async function updateAffiliation(doctorHospital: DoctorHospital, doctorUsername: string): Promise<Doctor> {

    const response = await fetch(`/routes/doctors/updateAffiliation?doctorUsername=${doctorUsername}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorHospital), 
    });
    return response.json();
}

export function updateUsername(updatedUsername: string, doctorUsername: string) {
    throw new Error("Function not implemented.");
}
