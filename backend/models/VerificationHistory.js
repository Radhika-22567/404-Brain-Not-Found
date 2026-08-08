const mongoose = require('mongoose');

const verificationHistorySchema = new mongoose.Schema({
  documentId: { type: String, required: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { 
    type: String, 
    enum: ['UPLOAD', 'OCR_COMPLETED', 'EXTRACTION_COMPLETED', 'VALIDATION_COMPLETED', 'REFERENCE_CHECK', 'DUPLICATE_CHECK', 'AI_ANALYSIS', 'APPROVED', 'REJECTED', 'FLAGGED', 'MANUAL_REVIEW', 'ARCHIVED'],
    required: true 
  },
  previousStatus: String,
  newStatus: String,
  reason: String,
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VerificationHistory', verificationHistorySchema);