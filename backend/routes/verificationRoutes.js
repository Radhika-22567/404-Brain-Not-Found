const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { reviewDocument, getHistory } = require('../controllers/verificationController');

router.use(protect);

router.post('/:id/review', authorize('admin', 'verifier'), reviewDocument);
router.get('/:id/history', getHistory);

module.exports = router;