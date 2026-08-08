const Document = require('../models/Document');
const { generateDocumentId } = require('../utils/generateDocumentId');
const { runPipeline } = require('../services/verificationPipeline');
const VerificationHistory = require('../models/VerificationHistory');

exports.uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Please upload a file' });

    const docId = generateDocumentId();
    const newDoc = new Document({
      documentId: docId,
      uploadedBy: req.user.id,
      originalFileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size
    });

    await newDoc.save();

    await VerificationHistory.create({
      documentId: docId,
      user: req.user.id,
      action: 'UPLOAD',
      newStatus: 'pending',
      reason: 'File uploaded into system'
    });

    // Run verification pipeline asynchronously or synchronously
    const processedDoc = await runPipeline(newDoc);

    res.status(201).json({ success: true, data: processedDoc });
  } catch (error) {
    next(error);
  }
};

exports.getDocuments = async (req, res, next) => {
  try {
    const { search, status, documentType, page = 1, limit = 10 } = req.query;
    const query = {};

    if (req.user.role === 'user') {
      query.uploadedBy = req.user.id;
    }

    if (status) query.status = status;
    if (documentType) query.documentType = documentType;

    if (search) {
      query.$or = [
        { documentId: new RegExp(search, 'i') },
        { originalFileName: new RegExp(search, 'i') },
        { 'extractedData.name': new RegExp(search, 'i') },
        { 'extractedData.certificateId': new RegExp(search, 'i') }
      ];
    }

    const count = await Document.countDocuments(query);
    const documents = await Document.find(query)
      .populate('uploadedBy', 'name email')
      .populate('reviewer', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json({
      success: true,
      data: {
        documents,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page),
        totalDocuments: count
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getDocumentById = async (req, res, next) => {
  try {
    const document = await Document.findOne({ documentId: req.params.id })
      .populate('uploadedBy', 'name email')
      .populate('reviewer', 'name email');

    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });

    res.json({ success: true, data: document });
  } catch (error) {
    next(error);
  }
};

exports.deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findOneAndDelete({ documentId: req.params.id });
    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });
    res.json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    next(error);
  }
};