const ReferenceRecord = require('../models/ReferenceRecord');
const { calculateSimilarity } = require('../utils/calculateSimilarity');

const checkReference = async (documentType, extractedData) => {
  const result = {
    status: 'no-match',
    matchedRecordId: null,
    matchPercentage: 0,
    differences: []
  };

  const query = [];
  if (extractedData.certificateId) query.push({ certificateId: extractedData.certificateId });
  if (extractedData.invoiceNumber) query.push({ invoiceNumber: extractedData.invoiceNumber });
  if (extractedData.documentNumber) query.push({ documentNumber: extractedData.documentNumber });
  if (extractedData.name) query.push({ name: new RegExp(extractedData.name, 'i') });

  if (query.length === 0) return result;

  const records = await ReferenceRecord.find({ $or: query });
  if (!records || records.length === 0) return result;

  let bestMatch = null;
  let highestScore = 0;

  for (const rec of records) {
    let score = 0;
    let totalChecks = 0;

    if (rec.certificateId && extractedData.certificateId) {
      totalChecks++;
      if (rec.certificateId === extractedData.certificateId) score += 100;
    }
    if (rec.invoiceNumber && extractedData.invoiceNumber) {
      totalChecks++;
      if (rec.invoiceNumber === extractedData.invoiceNumber) score += 100;
    }
    if (rec.name && extractedData.name) {
      totalChecks++;
      const nameSim = calculateSimilarity(rec.name.toLowerCase(), extractedData.name.toLowerCase());
      score += nameSim * 100;
    }

    const avgScore = totalChecks > 0 ? Math.round(score / totalChecks) : 0;
    if (avgScore > highestScore) {
      highestScore = avgScore;
      bestMatch = rec;
    }
  }

  if (bestMatch && highestScore > 40) {
    result.matchedRecordId = bestMatch._scopedId || bestMatch._id;
    result.matchPercentage = highestScore;

    if (highestScore >= 95) {
      result.status = 'exact';
    } else {
      result.status = 'partial';
      if (bestMatch.name && extractedData.name && bestMatch.name.toLowerCase() !== extractedData.name.toLowerCase()) {
        result.differences.push(`Name mismatch: Document (${extractedData.name}) vs Reference (${bestMatch.name})`);
      }
    }
  }

  return result;
};

module.exports = { checkReference };