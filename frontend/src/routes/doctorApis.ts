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


export async function fetchDoctor(doctorId: string): Promise<Doctor[]>{
    const response = await fetchData(`/api/doctors/getDoctor?doctorId=${doctorId}`, { method: "GET"});
    const doctors = [await response.json()]; 
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

export async function updateEmail(doctorEmail: DoctorEmail, doctorId: string): Promise<Doctor> {
    const response = await fetchData(`/api/doctors/updateEmail?doctorId=${doctorId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorEmail), 
    });
    return response.json();
}

export async function updateRate(doctorRate: DoctorRate, doctorId: string): Promise<Doctor> {
    const response = await fetchData(`/api/doctors/updateRate?doctorId=${doctorId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorRate), 
    });
    return response.json();
}

export async function updateAffiliation(doctorHospital: DoctorHospital, doctorId: string): Promise<Doctor> {

    const response = await fetchData(`/api/doctors/updateAffiliation?doctorId=${doctorId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorHospital), 
    });
    return response.json();
}