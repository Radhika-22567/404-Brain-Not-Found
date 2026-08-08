const Document = require('../models/Document');

exports.getOverview = async (req, res, next) => {
  try {
    const total = await Document.countDocuments();
    const verified = await Document.countDocuments({ status: 'verified' });
    const pending = await Document.countDocuments({ status: 'pending' });
    const flagged = await Document.countDocuments({ status: 'flagged' });
    const rejected = await Document.countDocuments({ status: 'rejected' });

    const typeDistribution = await Document.aggregate([
      { $group: { _id: '$documentType', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        total,
        verified,
        pending,
        flagged,
        rejected,
        typeDistribution
      }
    });
  } catch (error) {
    next(error);
  }
};