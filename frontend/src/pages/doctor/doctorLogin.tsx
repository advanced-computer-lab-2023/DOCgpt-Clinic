import React, { useState, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the Doctor interface to match the Mongoose schema

const DoctorLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');


    const handleInputChange = (value: string) => {
        setUsername(value);
    };
    // Add more validations for other fields as needed
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(username){
        console.log(username);
        const params = new URLSearchParams();
        params.append('doctorUsername', username);
        console.log(params.toString());
        
        navigate(`/doctor/main?${params.toString()}`);
        //navigate(`/doctor/main?doctorUsername=${username}`);
    }
    };

    return (
        
        <div style={styles.container}>
        <h2>Doctor Login</h2>
        <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => handleInputChange(e.target.value)}
                style={styles.input}
            />
            </div>
        </form>
        </div>
    );
    };

    const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formGroup: {
        marginBottom: 10,
    },
    input: {
        width: '100%',
        padding: '5px',
    },
    submitButton: {
        marginTop: 10,
    },
    button: {
        padding: '10px',
        background: 'blue',
        color: 'white',
        border: 'none',
    },
};

export default DoctorLogin;
