const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { generateReport } = require('../controllers/reportController');

router.get('/:id', protect, generateReport);

module.exports = router;