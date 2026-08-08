const Document = require('../models/Document');
const DuplicateRecord = require('../models/DuplicateRecord');
const { calculateSimilarity } = require('../utils/calculateSimilarity');

/**
 * Checks for duplicate documents using exact ID matches and OCR text similarity.
 * @param {string} currentDocId - ID of the document currently being verified.
 * @param {Object} extractedData - Extracted fields (certificateId, invoiceNumber, documentNumber, etc.).
 * @param {string} ocrText - Full raw OCR text extracted from the document.
 * @returns {Promise<Object>} Duplicate detection result details.
 */
const checkDuplicate = async (currentDocId, extractedData, ocrText) => {
  const result = {
    isDuplicate: false,
    duplicateType: '',
    matchedDocumentId: '',
    similarityScore: 0
  };

  if (!extractedData) {
    extractedData = {};
  }

  // Build query to find other documents with matching identifiers
  const orCond = [];
  if (extractedData.certificateId) {
    orCond.push({ 'extractedData.certificateId': extractedData.certificateId });
  }
  if (extractedData.invoiceNumber) {
    orCond.push({ 'extractedData.invoiceNumber': extractedData.invoiceNumber });
  }
  if (extractedData.documentNumber) {
    orCond.push({ 'extractedData.documentNumber': extractedData.documentNumber });
  }

  const query = { documentId: { $ne: currentDocId } };
  if (orCond.length > 0) {
    query.$or = orCond;
  }

  try {
    // Search existing records in MongoDB
    const existingDocs = await Document.find(
      orCond.length > 0 ? query : { documentId: { $ne: currentDocId } }
    ).limit(20);

    for (const doc of existingDocs) {
      // Check 1: Exact Certificate ID match
      if (
        extractedData.certificateId &&
        doc.extractedData?.certificateId === extractedData.certificateId
      ) {
        result.isDuplicate = true;
        result.duplicateType = 'Same Certificate ID';
        result.matchedDocumentId = doc.documentId;
        result.similarityScore = 100;
        break;
      }

      // Check 2: Exact Invoice Number match
      if (
        extractedData.invoiceNumber &&
        doc.extractedData?.invoiceNumber === extractedData.invoiceNumber
      ) {
        result.isDuplicate = true;
        result.duplicateType = 'Same Invoice Number';
        result.matchedDocumentId = doc.documentId;
        result.similarityScore = 100;
        break;
      }

      // Check 3: Text content similarity via bigram/trigram algorithm
      if (ocrText && doc.ocrText) {
        const sim = calculateSimilarity(ocrText.slice(0, 500), doc.ocrText.slice(0, 500));
        if (sim > 0.85) {
          result.isDuplicate = true;
          result.duplicateType = 'Similar OCR Content';
          result.matchedDocumentId = doc.documentId;
          result.similarityScore = Math.round(sim * 100);
          break;
        }
      }
    }

    // Record the duplicate event if detected
    if (result.isDuplicate) {
      await DuplicateRecord.create({
        documentId: currentDocId,
        matchedDocumentId: result.matchedDocumentId,
        duplicateType: result.duplicateType,
        similarityScore: result.similarityScore
      });
    }
  } catch (error) {
    console.error('Error during duplicate check:', error);
  }

  return result;
};

module.exports = { checkDuplicate };