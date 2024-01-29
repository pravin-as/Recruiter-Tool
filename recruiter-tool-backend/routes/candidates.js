const pool = require("../database/db");

const express = require("express");
const router = express.Router();

const getCandidates = async (req, res) => {
  const candidates = await pool.query("SELECT * FROM candidates");
  return res.json(candidates);
};

const getCandidateById = async (id) => {
  const result = await pool.query("SELECT * FROM candidates WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

const addCandidate = async (candidate) => {
  const {
    name,
    email,
    phone,
    skills,
    status,
    expectedSalary,
    nodeExperience,
    reactExperience,
    total_score,
  } = candidate.body;
  const result = await pool.query(
    "INSERT INTO candidates (name, email, phone, skills, status, expected_salary, node_experience, react_experience, total_score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [
      name,
      email,
      phone,
      skills,
      status,
      expectedSalary,
      nodeExperience,
      reactExperience,
      total_score,
    ]
  );
  return result.rows[0];
};

const updateCandidate = async (candidate) => {
  const {
    name,
    email,
    phone,
    skills,
    status,
    expected_salary,
    node_experience,
    react_experience,
    totalScore,
  } = candidate;

  const existingCandidate = await pool.query(
    "SELECT * FROM candidates WHERE email = $1",
    [email]
  );

  if (existingCandidate.rows.length > 0) {
    await pool.query("DELETE FROM candidates WHERE email = $1", [email]);
  }

  const result = await pool.query(
    "INSERT INTO candidates (name, email, phone, skills, status, expected_salary, node_experience, react_experience, total_score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    [
      name,
      email,
      phone,
      skills,
      status,
      expected_salary,
      node_experience,
      react_experience,
      totalScore,
    ]
  );

  return result.rows[0];
};

const deleteCandidate = async (email) => {
  await pool.query("DELETE FROM candidates WHERE email = $1", [email]);
};

router.get("/delete/:email", async (req, res) => {
  const email = req.params.email;

  try {
    await deleteCandidate(email);
    return res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error("Error deleting candidate:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/update/:email", async (req, res) => {
  const candidate = req.body;
  try {
    await updateCandidate(candidate);
    return res.status(200).json({ message: "candidate updated successfully" });
  } catch (error) {
    console.error("Error updating candidate:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", getCandidates);
router.get("/:id", getCandidateById);
router.post("/", addCandidate);
router.put("/:id", updateCandidate);

module.exports = router;
