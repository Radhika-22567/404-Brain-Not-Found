const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getOverview } = require('../controllers/analyticsController');

router.get('/overview', protect, getOverview);

module.exports = router;