const detectAnomalies = async (extractedData, validationResult, referenceMatch, duplicateResult) => {
    const indicators = [];
    let score = 0;
  
    if (validationResult.missingFields.length > 0) {
      indicators.push(`Missing critical fields: ${validationResult.missingFields.join(', ')}`);
      score += 25;
    }
  
    if (validationResult.expired) {
      indicators.push('Document date is expired');
      score += 20;
    }
  
    if (referenceMatch.status === 'partial') {
      indicators.push('Partial mismatch detected against database reference record');
      score += 30;
    } else if (referenceMatch.status === 'no-match') {
      indicators.push('No matching record found in official reference system');
      score += 15;
    }
  
    if (duplicateResult.isDuplicate) {
      indicators.push(`Duplicate document detected (${duplicateResult.duplicateType})`);
      score += 35;
    }
  
    return {
      detected: indicators.length > 0,
      anomalyScore: Math.min(score, 100),
      indicators
    };
  };
  
  module.exports = { detectAnomalies };