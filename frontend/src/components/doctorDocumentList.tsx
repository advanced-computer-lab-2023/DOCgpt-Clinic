// DoctorDocumentList.tsx
import React from 'react';

const DoctorDocumentList: React.FC<{ documents: string[] }> = ({ documents }) => (

    
  <ul>
    {documents.map((document, index) => (
      <li key={index}>
        <a href={`/routes/doctors/doctorDocuments/${document}`} target="_blank" rel="noopener noreferrer" >
          {document}
        </a>
      </li>
    ))}
  </ul>
);

export default DoctorDocumentList;