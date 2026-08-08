const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');

const extractText = async (filePath, fileType) => {
  try {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.pdf' || fileType === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const parsed = await pdfParse(dataBuffer);
      return parsed.text || '';
    } else {
      const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
      return text || '';
    }
  } catch (error) {
    console.error('OCR Extraction Error:', error.message);
    return '';
  }
};

module.exports = { extractText };