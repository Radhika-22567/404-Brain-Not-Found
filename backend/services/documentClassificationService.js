const classifyDocument = async (text, extractedData) => {
    if (!text) return { documentType: 'Other', confidence: 50 };
  
    const lower = text.toLowerCase();
    let certScore = 0;
    let idScore = 0;
    let invScore = 0;
    let appScore = 0;
  
    if (lower.includes('certificate') || lower.includes('degree') || lower.includes('awarded') || extractedData.certificateId) certScore += 40;
    if (lower.includes('completion') || lower.includes('university') || lower.includes('passed')) certScore += 25;
  
    if (lower.includes('passport') || lower.includes('identity') || lower.includes('driver license') || extractedData.documentNumber) idScore += 40;
    if (lower.includes('dob') || lower.includes('date of birth') || lower.includes('nationality')) idScore += 25;
  
    if (lower.includes('invoice') || lower.includes('bill to') || lower.includes('subtotal') || extractedData.invoiceNumber) invScore += 40;
    if (lower.includes('payment due') || lower.includes('receipt') || extractedData.amount) invScore += 25;
  
    if (lower.includes('application form') || lower.includes('applicant signature') || lower.includes('apply for')) appScore += 40;
  
    const maxScore = Math.max(certScore, idScore, invScore, appScore);
  
    if (maxScore < 25) return { documentType: 'Other', confidence: 60 };
  
    let documentType = 'Other';
    if (maxScore === certScore) documentType = 'Certificate';
    else if (maxScore === idScore) documentType = 'Identity Document';
    else if (maxScore === invScore) documentType = 'Invoice';
    else if (maxScore === appScore) documentType = 'Application';
  
    const confidence = Math.min(Math.round((maxScore / 65) * 100), 98);
    return { documentType, confidence };
  };
  
  module.exports = { classifyDocument };