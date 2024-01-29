import React, { useState, useEffect } from "react";
import axios from "axios";

const CandidateForm = ({ onFormSubmit, candidateToEdit }) => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    skills: "",
    status: "",
    expected_salary: 0,
    node_experience: 0,
    react_experience: 0,
    nodeJsScore: 0,
    reactJsScore: 0,
    total_score: 0,
  });

  useEffect(() => {
    if (candidateToEdit) {
      setFormData({
        ...candidateToEdit,
        nodeJsScore: calculateScore(candidateToEdit.node_experience),
        reactJsScore: calculateScore(candidateToEdit.react_experience),
        totalScore: calculateTotalScore(
          calculateScore(candidateToEdit.node_experience),
          calculateScore(candidateToEdit.react_experience)
        ),
      });
    } else {
      setFormData({
        _id: "",
        name: "",
        email: "",
        phone: "",
        skills: "",
        status: "",
        expected_salary: "",
        node_experience: "",
        react_experience: "",
        nodeJsScore: 0,
        reactJsScore: 0,
        total_score: 0,
      });
    }
  }, [candidateToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedNodeJsScore = formData.nodeJsScore;
    let updatedReactJsScore = formData.reactJsScore;

    if (name === "node_experience") {
      updatedNodeJsScore = calculateScore(value);
    } else if (name === "react_experience") {
      updatedReactJsScore = calculateScore(value);
    }

    if (name === "email" || name === "phone" || name === "expected_salary") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        nodeJsScore: updatedNodeJsScore,
        reactJsScore: updatedReactJsScore,
        totalScore: calculateTotalScore(
          updatedNodeJsScore,
          updatedReactJsScore
        ),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = formData._id ? "put" : "post";
      const url = formData.email
        ? `https://recruiter-tool-backend.vercel.app/candidates/update/${formData.email}`
        : "https://recruiter-tool-backend.vercel.app/candidates";

      const response = await axios["post"](url, formData);
      setFormData({
        _id: "",
        name: "",
        email: "",
        phone: "",
        skills: "",
        status: "",
        expected_salary: "",
        node_experience: "",
        react_experience: "",
      });

      onFormSubmit(response.data);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const calculateScore = (experience) => {
    const years = parseFloat(experience);
    if (years < 1) {
      return 1;
    } else if (years >= 1 && years <= 2) {
      return 2;
    } else {
      return 3;
    }
  };

  const calculateTotalScore = (nodeJsScore, reactJsScore) => {
    return nodeJsScore + reactJsScore;
  };

  return (
    <div>
      <h2>{formData._id ? "Add Candidate" : "Add Candidate"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Skills:</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          required
        />

        <label>Status:</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        />

        <label>Expected Salary:</label>
        <input
          type="text"
          name="expected_salary"
          value={formData.expected_salary}
          onChange={handleChange}
          required
        />

        <label>Node.js Experience:</label>
        <input
          type="text"
          name="node_experience"
          value={formData.node_experience}
          onChange={handleChange}
          required
        />

        <label>ReactJS Experience:</label>
        <input
          type="text"
          name="react_experience"
          value={formData.react_experience}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {formData.email ? "Add Candidate" : "Add Candidate"}
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;
