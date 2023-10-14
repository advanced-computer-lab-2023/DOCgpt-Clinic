import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, IconButton, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Patient {
    _id: string;
    username: string;
    name: string;
    email: string;
    //   password: string;
    //   dateOfBirth: string;
    mobilenumber: number;
    emergencyContact: {
        fullName: string,
        mobileNumber: string,
        relation: string
    };
    familyMembers: [{ name: {
        type: String
    },
    nationalId: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    relationToPatient: {
        type: String,
        enum: ['wife', 'husband', 'child']
    }}];
}

export const SearchBar: React.FC = () => {
    const [nameSearchTerm, setNameSearchTerm] = useState('');
    const [searchPatient, setSearchPatient] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    async function searchPatients() {
        try {
        const res = await axios.get(`/api/doctors/searchPatient?patientName=${nameSearchTerm}`);
        setSearchPatient(res.data);
        } catch (error) {
        console.error('Error searching for doctors: ', error);
        }
    }

    useEffect(() => {
        // Trigger the search when nameSearchTerm or specialitySearchTerm changes
        searchPatients();
    }, [nameSearchTerm]);

    return (
        <div>
        <TextField
            label="Search by Name"
            variant="outlined"
            value={nameSearchTerm}
            onChange={(e) => setNameSearchTerm(e.target.value)}
        />

        <IconButton onClick={searchPatients}>
            <SearchIcon />
        </IconButton>

        {/* Conditional rendering of the search results */}
        {nameSearchTerm ? (
            <List>
            {searchPatient.map((patient) => (
                <ListItem button key={patient._id} onClick={() => setSelectedPatient(patient)}>
                <ListItemText primary={patient.name} />
                </ListItem>
            ))}
            </List>
        ) : null}

        {/* Display selected doctor's details */}
        {selectedPatient && (
            <div>
            <h3>{selectedPatient.username}</h3>
            <p>Name: {selectedPatient.name}</p>
            <p>Email: {selectedPatient.email}</p>
            {/* <p>Password: {selectedPatient.password}</p>
            <p>DateOfBirth: {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}</p>
            <p>HourlyRate: {selectedPatient.hourlyRate}</p> */}
            <p>Mobilenumber: {selectedPatient.mobilenumber}</p>
            <p>EmergencyContact: Full Name {selectedPatient.emergencyContact.fullName}</p>
            <p> Mobile Number: {selectedPatient.emergencyContact.mobileNumber}</p>
            <p> Relation: {selectedPatient.emergencyContact.relation}</p>

            <ul>
                {selectedPatient.familyMembers.map((item, index) => (
                    <div>
                        <li key={index}>{`${item.nationalId}`}</li>
                        <li key={index}>{`${item.age}`}</li>
                        <li key={index}>{`${item.gender}`}</li>
                        <li key={index}>{`${item.name}`}</li>
                        <li key={index}>{`${item.relationToPatient}`}</li>
                    </div>
                ))}
            </ul>
            </div>
        )}
        </div>
    );
};