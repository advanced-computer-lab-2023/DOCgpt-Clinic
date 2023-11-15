// packages.tsx
import React from 'react';
//import AddPackageForm from './AddPackage'; // Make sure to use the correct path
import AddPackage from '../../components/AddPackage'; // Update the path accordingly
import UpdatePackageForm from '../../components/UpdatePackageForm';
import DeletePackageForm from '../../components/DeletePackageForm';

const PackagesPage = () => {
  return (
    <div>
      <h1>               
         
        
                   </h1>
      {/* Other content on the packages page */}
      <AddPackage />
     
    </div>
  );
};

export default PackagesPage;