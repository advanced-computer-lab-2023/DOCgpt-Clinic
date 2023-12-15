import React from "react";
import AdminList from "../../components/ViewAllAdmins";
import CreateAdminButton from "../../components/addAdmin";
import AdminBar from "../../components/admin Bar/adminBar";
import RemoveAdmin from "../../components/RemoveAdmin";
import Background from '../../admin.jpeg';
import Back from "../../components/backButton";

const adminPage = () => {
    return (
        <div>
            <AdminBar/>
            <div
      
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom:'100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Increased shadow values
      }}
    >   
        <Back/>
     <div
      style={{
        position: 'absolute', // Set position to absolute
        top: '35%', // Adjust top value to center vertically
        left: '50%', // Adjust left value to center horizontally
        transform: 'translate(-50%, -50%)', // Center the text
        textAlign: 'center', // Center text horizontally
        color: 'white', // Set text color
      }}
    >
      <h1> <strong>Admins List</strong></h1>
      {/* <p>Additional text content</p> */}
    </div>
  </div>

           <AdminList></AdminList>
          
         


        </div>
    );
};
export default adminPage;