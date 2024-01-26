import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

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
        ? `https://recruiter-tool-backend.vercel.app/candidates/${formData._id}`
        : "https://recruiter-tool-backend.vercel.app/candidates";

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
    <div className="bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">
        {formData._id ? "Edit Candidate" : "Add Candidate"}
      </h2>

      <label className="block mb-2">Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-2">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.contact.email}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-2">Phone:</label>
      <input
        type="tel"
        name="phone"
        value={formData.contact.phone}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-2">Skills:</label>
      <input
        type="text"
        name="skills"
        value={formData.skills}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-2">Status:</label>
      <input
        type="text"
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-2">Expected Salary:</label>
      <input
        type="number"
        name="expectedSalary"
        value={formData.expectedSalary}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-2">Node.js Experience:</label>
      <input
        type="text"
        name="nodeExperience"
        value={formData.nodeExperience}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-2">ReactJS Experience:</label>
      <input
        type="text"
        name="reactExperience"
        value={formData.reactExperience}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        {formData._id ? "Update Candidate" : "Add Candidate"}
      </button>
    </div>
  );
};

export default CandidateForm;
