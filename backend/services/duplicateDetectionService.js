const Document = require('../models/Document');
const { calculateSimilarity } = require('../utils/calculateSimilarity');

const checkDuplicate = async (currentDocId, extractedData, ocrText) => {
  const result = {
    isDuplicate: false,
    duplicateType: '',
    matchedDocumentId: '',
    similarityScore: 0
  };

  const query = { documentId: { $ne: currentDocId } };
  const orCond = [];

  if (extractedData.certificateId) orCond.push({ 'extractedData.certificateId': extractedData.certificateId });
  if (extractedData.invoiceNumber) orCond.push({ 'extractedData.invoiceNumber': extractedData.invoiceNumber });
  if (extractedData.documentNumber) orCond.push({ 'extractedData.documentNumber': extractedData.documentNumber });

  if (orCond.length > 0) query.$or = orCond;

  const existingDocs = await Document.find(orCond.length > 0 ? query : { documentId: { $ne: currentDocId } }).limit(20);

  for (const doc of existingDocs) {
    if (extractedData.certificateId && doc.extractedData?.certificateId === extractedData.certificateId) {
      return { isDuplicate: true, duplicateType: 'Same Certificate ID', matchedDocumentId: doc.documentId, similarityScore: 100 };
    }
    if (extractedData.invoiceNumber && doc.extractedData?.invoiceNumber === extractedData.invoiceNumber) {
      return { isDuplicate: true, duplicateType: 'Same Invoice Number', matchedDocumentId: doc.documentId, similarityScore: 100 };
    }

    if (ocrText && doc.ocrText) {
      const sim = calculateSimilarity(ocrText.slice(0, 500), doc.ocrText.slice(0, 500));
      if (sim > 0.85) {
        return { isDuplicate: true, duplicateType: 'Similar OCR Content', matchedDocumentId: doc.documentId, similarityScore: Math.round(sim * 100) };
      }
    }
  }

  return result;
};

module.exports = { checkDuplicate };