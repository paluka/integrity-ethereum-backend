import express from 'express';

const router = express.Router();

router.get('/login', (req, res, next) => {
  res.send('<p>Apple</p>');
});

export default router;
