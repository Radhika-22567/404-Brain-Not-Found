const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { getUsers, updateUserRole } = require('../controllers/userController');

router.use(protect, authorize('admin'));
router.get('/', getUsers);
router.put('/:id', updateUserRole);

module.exports = router;