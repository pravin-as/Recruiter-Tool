import React, { useState, useEffect } from "react";
import axios from "axios";

const CandidateForm = ({ onFormSubmit, candidateToEdit }) => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    contact: {
      email: "",
      phone: "",
    },
    skills: "",
    status: "",
    expectedSalary: "",
    nodeExperience: "",
    reactExperience: "",
    nodeJsScore: 0,
    reactJsScore: 0,
    totalScore: 0,
  });

  useEffect(() => {
    if (candidateToEdit) {
      console.log("not here");
      setFormData({
        ...candidateToEdit,
        contact: { ...candidateToEdit.contact },
        nodeJsScore: calculateScore(candidateToEdit.nodeExperience),
        reactJsScore: calculateScore(candidateToEdit.reactExperience),
        totalScore: calculateTotalScore(
          calculateScore(candidateToEdit.nodeExperience),
          calculateScore(candidateToEdit.reactExperience)
        ),
      });
    } else {
      setFormData({
        _id: "",
        name: "",
        contact: {
          email: "",
          phone: "",
        },
        skills: "",
        status: "",
        expectedSalary: "",
        nodeExperience: "",
        reactExperience: "",
        nodeJsScore: 0,
        reactJsScore: 0,
        totalScore: 0,
      });
    }
  }, [candidateToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedNodeJsScore = formData.nodeJsScore;
    let updatedReactJsScore = formData.reactJsScore;

    if (name === "nodeExperience") {
      updatedNodeJsScore = calculateScore(value);
    } else if (name === "reactExperience") {
      updatedReactJsScore = calculateScore(value);
    }

    if (name === "email" || name === "phone") {
      setFormData((prevData) => ({
        ...prevData,
        contact: {
          ...prevData.contact,
          [name]: value,
        },
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
      const url = formData._id
        ? `http://localhost:8000/candidates/${formData._id}`
        : "http://localhost:8000/candidates";

      if (!formData._id) {
        delete formData._id;
      }

      const response = await axios[method](url, formData);
      setFormData({
        _id: "",
        name: "",
        contact: {
          email: "",
          phone: "",
        },
        skills: "",
        status: "",
        expectedSalary: "",
        nodeExperience: "",
        reactExperience: "",
      });

      onFormSubmit(response.data);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const calculateScore = (experience) => {
    const years = parseFloat(experience);
    console.log("years", years);
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
      <h2>{formData._id ? "Edit Candidate" : "Add Candidate"}</h2>
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
          value={formData.contact.email}
          onChange={handleChange}
          required
        />

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.contact.phone}
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
          type="number"
          name="expectedSalary"
          value={formData.expectedSalary}
          onChange={handleChange}
          required
        />

        <label>Node.js Experience:</label>
        <input
          type="text"
          name="nodeExperience"
          value={formData.nodeExperience}
          onChange={handleChange}
          required
        />

        <label>ReactJS Experience:</label>
        <input
          type="text"
          name="reactExperience"
          value={formData.reactExperience}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {formData._id ? "Update Candidate" : "Add Candidate"}
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;
