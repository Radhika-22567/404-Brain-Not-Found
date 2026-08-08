const ReferenceRecord = require('../models/ReferenceRecord');

exports.getRecords = async (req, res, next) => {
  try {
    const records = await ReferenceRecord.find().sort({ createdAt: -1 });
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

exports.createRecord = async (req, res, next) => {
  try {
    const record = await ReferenceRecord.create(req.body);
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};