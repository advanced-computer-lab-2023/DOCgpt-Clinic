import React from "react";
import AdminList from "../../components/ViewAllAdmins";
import CreateAdminButton from "../../components/addAdmin";
import AdminBar from "../../components/admin Bar/adminBar";
import RemoveAdmin from "../../components/RemoveAdmin";
const adminPage = () => {
    return (
        <div>
            <AdminBar/>
           <AdminList></AdminList>
          
         


        </div>
    );
};
export default adminPage;