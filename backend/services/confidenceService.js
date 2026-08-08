const calculateConfidence = (classificationConf, validation, reference, duplicate, anomaly) => {
    let score = 100;
  
    score -= (100 - classificationConf) * 0.1;
  
    if (validation.missingFields.length > 0) score -= (validation.missingFields.length * 15);
    if (validation.expired) score -= 20;
    if (validation.inconsistencies.length > 0) score -= 15;
  
    if (reference.status === 'exact') score += 10;
    else if (reference.status === 'partial') score -= 20;
    else if (reference.status === 'no-match') score -= 15;
  
    if (duplicate.isDuplicate) score -= 30;
  
    score -= anomaly.anomalyScore * 0.2;
  
    const finalScore = Math.max(0, Math.min(100, Math.round(score)));
  
    let status = 'pending';
    if (finalScore >= 80) status = 'verified';
    else if (finalScore >= 45) status = 'flagged';
    else status = 'rejected';
  
    return { confidenceScore: finalScore, suggestedStatus: status };
  };
  
  module.exports = { calculateConfidence };