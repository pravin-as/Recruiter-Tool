// src/components/CandidateList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateList = ({ onEditCandidate }) => {
  const [candidates, setCandidates] = useState([]);

  console.log(candidates);

  const getCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:8000/candidates');
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error.message);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const handleEdit = (candidate) => {
    console.log('Editing candidate:', candidate);
    onEditCandidate(candidate); // Pass the candidate to the parent component
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/candidates/${id}`);
      getCandidates(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting candidate:', error.message);
    }
  };

  return (
    <div>
      <h2>Candidate List</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate._id}>
            <p>Name: {candidate.name}</p>
            <p>Email: {candidate.contact.email}</p>
            <p>Phone: {candidate.contact.phone}</p>
            <p>Skills: {candidate.skills}</p>
            <p>Status: {candidate.status}</p>
            <p>Expected Salary: {candidate.expectedSalary}</p>
            <p>Node.js Experience: {candidate.nodeExperience}</p>
            <p>ReactJS Experience: {candidate.reactExperience}</p>
            <p>Total Score: {candidate.totalScore}</p>
            <button onClick={() => handleEdit(candidate)}>Edit</button>
            <button onClick={() => handleDelete(candidate._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
