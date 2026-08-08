const mongoose = require('mongoose');

const referenceRecordSchema = new mongoose.Schema({
  recordId: { type: String, required: true, unique: true },
  documentType: { type: String, required: true },
  name: { type: String, index: true },
  documentNumber: { type: String, index: true },
  certificateId: { type: String, index: true },
  institution: String,
  vendor: String,
  invoiceNumber: { type: String, index: true },
  issueDate: String,
  expiryDate: String,
  amount: String,
  additionalData: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.model('ReferenceRecord', referenceRecordSchema);