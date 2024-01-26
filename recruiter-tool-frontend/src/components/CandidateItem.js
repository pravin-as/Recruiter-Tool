// src/components/CandidateItem.js
import React from 'react';

const CandidateItem = ({ candidate }) => {
  
  if (!candidate || !candidate.contact) {
    console.log(candidate);
    // If candidate or candidate.contact is undefined, return a placeholder or handle it appropriately
    return <li>Error: Candidate data is missing</li>;
  }

  return (
    <li>
      <h3>{candidate.name}</h3>
      <p>Email: {candidate.contact.email}</p>
      <p>Phone: {candidate.contact.phone}</p>
      <p>Skills: {candidate.skills}</p>
      <p>Status: {candidate.status}</p>
      <p>Expected Salary: {candidate.expectedSalary}</p>
      {/* Add more details based on your data structure */}
    </li>
  );
};

export default CandidateItem;
