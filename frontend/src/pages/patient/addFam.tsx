
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

interface FamilyMember {
  name: string;
  nationalId: string;
  age: number;
  gender: string;
  relationToPatient: string;
}

const AddFamilyMember: React.FC = ()  => {
    const{username}=useParams();
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [relationToPatient, setRelationToPatient] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const familyMemberData: FamilyMember = {
      name,
      nationalId,
      age,
      gender,
      relationToPatient,
    };

    try {
      const response = await fetch(`/routes/addfammember?username=${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(familyMemberData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage('Failed to add family member' +familyMemberData.age +""+ familyMemberData.gender + familyMemberData.name+""+ familyMemberData.nationalId +""+familyMemberData.relationToPatient);
      }
    } catch (error) {
      console.error('Error adding family member:', error);
      setMessage('An error occurred');
    }
  };

  return (
    <div>
      <h2>Add Family Member</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>National ID:</label>
          <input type="text" value={nationalId} onChange={(e) => setNationalId(e.target.value)} required />
        </div>
        <div>
  <label>Age:</label>
  <input
    type="number"
    value={age || ''}
    onChange={(e) => setAge(parseInt(e.target.value, 10) || 0)}
    required
  />
</div>

        <div>
          <label>Gender:</label>
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
        </div>
        <div>
          <label>Relation to Patient:</label>
          <input type="text" value={relationToPatient} onChange={(e) => setRelationToPatient(e.target.value)} required />
        </div>
        <button type="submit">Add Family Member</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddFamilyMember;
