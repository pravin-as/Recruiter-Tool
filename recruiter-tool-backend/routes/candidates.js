// routes/candidates.js
const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// GET all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific candidate
router.get('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new candidate
router.post('/', async (req, res) => {
  const candidate = new Candidate(req.body);
  try {
    const newCandidate = await candidate.save();
    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT/update a candidate's details
router.put('/:id', async (req, res) => {
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedCandidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.json(updatedCandidate);
  } catch (error) {
    console.error('Error updating candidate:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a candidate
router.delete('/:id', async (req, res) => {
  try {
    console.log(req.params);
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
