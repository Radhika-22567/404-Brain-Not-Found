const validateDocument = (documentType, extractedData) => {
    const result = {
      missingFields: [],
      invalidFields: [],
      invalidDates: [],
      expired: false,
      inconsistencies: []
    };
  
    const { name, certificateId, invoiceNumber, documentNumber, issueDate, expiryDate } = extractedData;
  
    if (!name) result.missingFields.push('Name');
  
    if (documentType === 'Certificate') {
      if (!certificateId) result.missingFields.push('Certificate ID');
    } else if (documentType === 'Invoice') {
      if (!invoiceNumber) result.missingFields.push('Invoice Number');
    } else if (documentType === 'Identity Document') {
      if (!documentNumber) result.missingFields.push('Document/ID Number');
    }
  
    if (expiryDate) {
      const exp = new Date(expiryDate);
      if (!isNaN(exp.getTime()) && exp < new Date()) {
        result.expired = true;
        result.invalidDates.push('Document has passed its expiration date.');
      }
    }
  
    if (issueDate && expiryDate) {
      const iss = new Date(issueDate);
      const exp = new Date(expiryDate);
      if (!isNaN(iss.getTime()) && !isNaN(exp.getTime()) && iss > exp) {
        result.inconsistencies.push('Issue date cannot be after expiry date.');
      }
    }
  
    return result;
  };
  
  module.exports = { validateDocument };