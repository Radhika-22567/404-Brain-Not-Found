const { extractText } = require('./ocrService');
const { extractFields } = require('./extractionService');
const { classifyDocument } = require('./documentClassificationService');
const { validateDocument } = require('./validationService');
const { checkReference } = require('./referenceVerificationService');
const { checkDuplicate } = require('./duplicateDetectionService');
const { detectAnomalies } = require('./anomalyDetectionService');
const { generateExplanation } = require('./aiExplanationService');
const { calculateConfidence } = require('./confidenceService');
const VerificationHistory = require('../models/VerificationHistory');

const runPipeline = async (document) => {
  try {
    // Step 1: OCR
    const ocrText = await extractText(document.filePath, document.fileType);
    document.ocrText = ocrText;

    // Step 2: Extract Structured Fields
    const extractedData = extractFields(ocrText);
    document.extractedData = extractedData;

    // Step 3: Classify Document Type
    const { documentType, confidence: classificationConfidence } = await classifyDocument(ocrText, extractedData);
    document.documentType = documentType;
    document.classificationConfidence = classificationConfidence;

    // Step 4: Rule Validation
    const validationResult = validateDocument(documentType, extractedData);
    document.verificationResult = validationResult;

    // Step 5: Reference Database Check
    const referenceMatch = await checkReference(documentType, extractedData);
    document.referenceMatch = referenceMatch;

    // Step 6: Duplicate Check
    const duplicateResult = await checkDuplicate(document.documentId, extractedData, ocrText);
    document.duplicateResult = duplicateResult;

    // Step 7: Anomaly Detection
    const anomalyResult = await detectAnomalies(extractedData, validationResult, referenceMatch, duplicateResult);
    document.anomalyResult = anomalyResult;

    // Step 8: AI Explanation
    const aiExplanation = await generateExplanation(documentType, validationResult, referenceMatch, duplicateResult, anomalyResult);
    document.aiExplanation = aiExplanation;

    // Step 9: Score & Final Status
    const { confidenceScore, suggestedStatus } = calculateConfidence(
      classificationConfidence,
      validationResult,
      referenceMatch,
      duplicateResult,
      anomalyResult
    );

    document.confidenceScore = confidenceScore;
    document.status = suggestedStatus;

    await document.save();

    await VerificationHistory.create({
      documentId: document.documentId,
      user: document.uploadedBy,
      action: 'AI_ANALYSIS',
      previousStatus: 'pending',
      newStatus: suggestedStatus,
      reason: aiExplanation
    });

    return document;
  } catch (error) {
    console.error('Verification Pipeline Error:', error);
    document.status = 'flagged';
    document.aiExplanation = 'Pipeline processing error encountered. Flagged for manual review.';
    await document.save();
    return document;
  }
};

module.exports = { runPipeline };