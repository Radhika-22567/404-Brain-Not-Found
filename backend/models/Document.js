const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  documentId: { type: String, required: true, unique: true, index: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  originalFileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  documentType: { type: String, enum: ['Certificate', 'Identity Document', 'Invoice', 'Application', 'Other'], default: 'Other', index: true },
  classificationConfidence: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'verified', 'flagged', 'rejected'], default: 'pending', index: true },
  extractedData: {
    name: { type: String, index: true },
    documentNumber: { type: String, index: true },
    certificateId: { type: String, index: true },
    invoiceNumber: { type: String, index: true },
    institution: String,
    vendor: String,
    issueDate: String,
    expiryDate: String,
    amount: String,
    address: String,
    otherFields: mongoose.Schema.Types.Mixed
  },
  ocrText: { type: String, default: '' },
  verificationResult: {
    missingFields: [String],
    invalidFields: [String],
    invalidDates: [String],
    expired: { type: Boolean, default: false },
    inconsistencies: [String]
  },
  referenceMatch: {
    status: { type: String, enum: ['exact', 'partial', 'no-match'], default: 'no-match' },
    matchedRecordId: { type: mongoose.Schema.Types.ObjectId, ref: 'ReferenceRecord' },
    matchPercentage: { type: Number, default: 0 },
    differences: [String]
  },
  duplicateResult: {
    isDuplicate: { type: Boolean, default: false },
    duplicateType: String,
    matchedDocumentId: String,
    similarityScore: { type: Number, default: 0 }
  },
  anomalyResult: {
    detected: { type: Boolean, default: false },
    indicators: [String],
    anomalyScore: { type: Number, default: 0 }
  },
  aiExplanation: { type: String, default: '' },
  confidenceScore: { type: Number, default: 0 },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewerNotes: { type: String, default: '' }
}, { timestamps: true });

documentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Document', documentSchema);