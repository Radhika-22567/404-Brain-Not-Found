// ✅ CORRECT (Relative import)
const Document = require('../models/Document');
const { generatePdfReport } = require('../services/reportService');

exports.generateReport = async (req, res, next) => {
  try {
    const document = await Document.findOne({ documentId: req.params.id });
    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    return generatePdfReport(document, res);
  } catch (error) {
    return next(error);
  }
};