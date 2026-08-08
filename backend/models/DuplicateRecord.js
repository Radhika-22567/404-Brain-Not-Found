const mongoose = require('mongoose');

const duplicateRecordSchema = new mongoose.Schema({
  documentId: { type: String, required: true },
  matchedDocumentId: { type: String, required: true },
  duplicateType: { type: String, required: true },
  similarityScore: { type: Number, required: true },
  detectedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DuplicateRecord', duplicateRecordSchema);