const Document = require('C:\Users\Dell\Downloads/404-Brain Not Found\backend\models\Document.js');
const { generatePdfReport } = require('../services/reportService');

exports.generateReport = async (req, res, next) => {
  try {
    const document = await Document.findOne({ documentId: req.params.id });
    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    generatePdfReport(document, res);
  } catch (error) {
    return next(error);
  }
};