const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { uploadDocument, getDocuments, getDocumentById, deleteDocument } = require('../controllers/documentController');

router.use(protect);

router.post('/upload', upload.single('document'), uploadDocument);
router.get('/', getDocuments);
router.get('/:id', getDocumentById);
router.delete('/:id', deleteDocument);

module.exports = router;