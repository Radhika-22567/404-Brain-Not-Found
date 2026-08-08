const Document = require('C:\Users\Dell\Downloads/404-Brain Not Found\backend\models\Document.js');
const VerificationHistory = require('../models/VerificationHistory');

exports.reviewDocument = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const document = await Document.findOne({ documentId: req.params.id });

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    const prevStatus = document.status;
    document.status = status;
    document.reviewer = req.user.id;
    document.reviewerNotes = notes || '';

    await document.save();

    await VerificationHistory.create({
      documentId: document.documentId,
      user: req.user.id,
      reviewer: req.user.id,
      action: status === 'verified' ? 'APPROVED' : status === 'rejected' ? 'REJECTED' : 'FLAGGED',
      previousStatus: prevStatus,
      newStatus: status,
      reason: notes || 'Manual review decision'
    });

    return res.json({ success: true, data: document });
  } catch (error) {
    return next(error);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const history = await VerificationHistory.find({ documentId: req.params.id })
      .populate('user', 'name')
      .populate('reviewer', 'name')
      .sort({ timestamp: -1 });

    return res.json({ success: true, data: history });
  } catch (error) {
    return next(error);
  }
};

exports.getAllAuditLogs = async (req, res, next) => {
  try {
    const logs = await VerificationHistory.find()
      .populate('user', 'name')
      .populate('reviewer', 'name')
      .sort({ timestamp: -1 })
      .limit(100);

    return res.json({ success: true, data: logs });
  } catch (error) {
    return next(error);
  }
};