import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface FamilyMember {
  name: string;
  nationalId: string;
  age: number;
  gender: string;
  relationToPatient: string;
}

const ViewFamilyMembers: React.FC = () => {
  const { username } = useParams();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  useEffect(() => {
    // Fetch family members data for the patient
    fetch(`/routes/viewFam?username=${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.familyMembers) {
          setFamilyMembers(data.familyMembers);
        }
      })
      .catch((error) => console.error(error));
  }, [username]);

  return (
    <div>
      <h2>Family Members for {username}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>National ID</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Relation to Patient</th>
          </tr>
        </thead>
        <tbody>
          {familyMembers.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.nationalId}</td>
              <td>{member.age}</td>
              <td>{member.gender}</td>
              <td>{member.relationToPatient}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFamilyMembers;
