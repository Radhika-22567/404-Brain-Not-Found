const extractFields = (text, typeHint = '') => {
    const data = {
      name: null,
      documentNumber: null,
      certificateId: null,
      invoiceNumber: null,
      institution: null,
      vendor: null,
      issueDate: null,
      expiryDate: null,
      amount: null,
      address: null,
      otherFields: {}
    };
  
    if (!text) return data;
  
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
    // RegEx extractors
    const certMatch = text.match(/(?:Certificate\s*(?:ID|No|Number)|Cert\s*#)[:\s]*([A-Z0-9\-_]{4,20})/i);
    if (certMatch) data.certificateId = certMatch[1].trim();
  
    const invMatch = text.match(/(?:Invoice\s*(?:ID|No|Number)|Inv\s*#)[:\s]*([A-Z0-9\-_]{4,20})/i);
    if (invMatch) data.invoiceNumber = invMatch[1].trim();
  
    const idMatch = text.match(/(?:ID\s*(?:No|Number)|Passport\s*No|SSN|Aadhaar)[:\s]*([A-Z0-9\-_]{5,20})/i);
    if (idMatch) data.documentNumber = idMatch[1].trim();
  
    const dateMatches = text.match(/\b(?:\d{1,2}[\/\.-]\d{1,2}[\/\.-]\d{2,4}|\d{4}[\/\.-]\d{1,2}[\/\.-]\d{1,2}|[A-Za-z]+\s+\d{1,2},\s*\d{4})\b/g);
    if (dateMatches && dateMatches.length > 0) {
      data.issueDate = dateMatches[0];
      if (dateMatches.length > 1) data.expiryDate = dateMatches[1];
    }
  
    const nameMatch = text.match(/(?:Name|Full Name|Holder|Applicant)[:\s]*([A-Za-z\s\.]{3,30})/i);
    if (nameMatch) {
      data.name = nameMatch[1].trim();
    } else if (lines.length > 0) {
      data.name = lines[0].slice(0, 30);
    }
  
    const amountMatch = text.match(/(?:Total|Amount|Due)[:\s]*[\$\₹\€]?\s*([\d,]+\.?\d*)/i);
    if (amountMatch) data.amount = amountMatch[1];
  
    const vendorMatch = text.match(/(?:Vendor|Company|Merchant|Issuer)[:\s]*([A-Za-z0-9\s]{3,30})/i);
    if (vendorMatch) data.vendor = vendorMatch[1].trim();
  
    const instMatch = text.match(/(?:University|Institute|College|Organization|School)[:\s]*([A-Za-z0-9\s]{3,40})/i);
    if (instMatch) data.institution = instMatch[0].trim();
  
    return data;
  };
  
  module.exports = { extractFields };