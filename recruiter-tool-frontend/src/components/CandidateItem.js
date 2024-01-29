import React from "react";

const CandidateItem = ({ candidate }) => {
  if (!candidate || !candidate) {
    return <li>Error: Candidate data is missing</li>;
  }

  return (
    <li>
      <h3>{candidate.name}</h3>
      <p>Email: {candidate.email}</p>
      <p>Phone: {candidate.phone}</p>
      <p>Skills: {candidate.skills}</p>
      <p>Status: {candidate.status}</p>
      <p>Expected Salary: {candidate.expected_salary}</p>
    </li>
  );
};

export default CandidateItem;
