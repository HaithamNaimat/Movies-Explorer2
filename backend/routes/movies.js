import { Router } from 'express';
import Movie from '../models/Movie.js';

const router = Router();

function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  next();
}

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id, createdBy: req.session.userId });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ movie });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', requireAuth, async (req, res) => {
  try {
    const movies = await Movie.find({ createdBy: req.session.userId }).sort({ createdAt: -1 });
    res.json({ movies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const movie = await Movie.create({
      ...req.body,
      createdBy: req.session.userId
    });
    res.status(201).json({ movie });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.session.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found or unauthorized' });
    }
    res.json({ movie });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.session.userId
    });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found or unauthorized' });
    }
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
