import React, { useState, useEffect } from "react";
import axios from "axios";

const CandidateList = ({ onEditCandidate }) => {
  const [candidates, setCandidates] = useState([]);

  const getCandidates = async () => {
    try {
      const response = await axios.get("http://localhost:8000/candidates");
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error.message);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  const handleEdit = (candidate) => {
    onEditCandidate(candidate);
  };

  const handleDelete = async (email) => {
    try {
      await axios.get(`http://localhost:8000/candidates/delete/${email}`);
      getCandidates();
    } catch (error) {
      console.error("Error deleting candidate:", error.message);
    }
  };

  return (
    <div>
      <h2>Candidate List</h2>
      <ul>
        {candidates &&
          candidates.rows &&
          candidates.rows.map((candidate) => (
            <li key={candidate.id}>
              <p>Name: {candidate.name}</p>
              <p>Email: {candidate.email}</p>
              <p>Phone: {candidate.phone}</p>
              <p>Skills: {candidate.skills}</p>
              <p>Status: {candidate.status}</p>
              <p>Expected Salary: {candidate.expected_salary}</p>
              <p>Node.js Experience: {candidate.node_experience}</p>
              <p>ReactJS Experience: {candidate.react_experience}</p>
              <p>Total Score: {candidate.total_score}</p>
              <button onClick={() => handleEdit(candidate)}>Edit</button>
              <button onClick={() => handleDelete(candidate.email)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CandidateList;
