const { GoogleGenerativeAI } = require('@google/generative-ai');

const generateExplanation = async (documentType, validation, reference, duplicate, anomaly) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeAIModel({ model: 'gemini-1.5-flash' });

      const prompt = `Provide a concise, professional, human-readable verification summary for a ${documentType} based on these exact rules and results:
      - Missing Fields: ${validation.missingFields.join(', ') || 'None'}
      - Expired: ${validation.expired}
      - Reference Status: ${reference.status} (${reference.matchPercentage}% match)
      - Duplicate Detected: ${duplicate.isDuplicate} (${duplicate.duplicateType || 'N/A'})
      - Anomaly Indicators: ${anomaly.indicators.join('; ') || 'None'}
      
      Do not invent facts. State directly why the document was verified, flagged, or rejected. Max 3 sentences.`;

      const response = await model.generateContent(prompt);
      return response.response.text().trim();
    } catch (err) {
      console.warn('AI API Call failed, falling back to rule-based explanation:', err.message);
    }
  }

  // Fallback Rule-Based Generator
  const reasons = [];
  if (validation.missingFields.length > 0) reasons.push(`missing required fields (${validation.missingFields.join(', ')})`);
  if (validation.expired) reasons.push('document expiration');
  if (reference.status === 'no-match') reasons.push('no reference record match');
  if (reference.status === 'partial') reasons.push('partial reference record mismatch');
  if (duplicate.isDuplicate) reasons.push(`duplicate entry detected with document ID ${duplicate.matchedDocumentId}`);

  if (reasons.length === 0) {
    return `Verified successfully. All required fields for ${documentType} were extracted, matched official reference records exactly, and no anomalies or duplicates were identified.`;
  }

  return `Document flagged due to ${reasons.join(', ')}. Manual review is recommended to verify authenticity.`;
};

module.exports = { generateExplanation };