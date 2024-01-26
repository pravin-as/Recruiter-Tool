import React from "react";

const CandidateItem = ({ candidate }) => {
  if (!candidate || !candidate.contact) {
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
    </li>
  );
};

export default CandidateItem;
