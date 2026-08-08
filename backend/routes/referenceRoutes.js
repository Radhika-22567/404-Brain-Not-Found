const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { getRecords, createRecord } = require('../controllers/referenceController');

router.use(protect);
router.get('/', getRecords);
router.post('/', authorize('admin'), createRecord);

module.exports = router;