import React from "react";
import AdminList from "../../components/ViewAlllAdmins";
import CreateAdminButton from "../../components/addAdmin";
import AdminBar from "../../components/admin Bar/adminBar";
import RemoveAdmin from "../../components/RemoveAdmin";
const adminPage = () => {
    return (
        <div>
            <AdminBar/>
           <AdminList></AdminList>
           <CreateAdminButton></CreateAdminButton>
           <RemoveAdmin></RemoveAdmin>


        </div>
    );
};
export default adminPage;