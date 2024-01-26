const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: {
    email: { type: String },
    phone: { type: String },
  },
  skills: { type: String },
  status: { type: String },
  expectedSalary: { type: Number },
  nodeExperience: { type: String },
  reactExperience: { type: String },
  totalScore: { type: Number },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
