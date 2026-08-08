const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const ReferenceRecord = require('../models/ReferenceRecord');
const Document = require('../models/Document');

dotenv.config({ path: './.env' });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/docverify');

    await User.deleteMany();
    await ReferenceRecord.deleteMany();
    await Document.deleteMany();

    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@docverify.ai',
      password: 'password123',
      role: 'admin'
    });

    const verifier = await User.create({
      name: 'Lead Verifier',
      email: 'verifier@docverify.ai',
      password: 'password123',
      role: 'verifier'
    });

    const user = await User.create({
      name: 'Rahul Sharma',
      email: 'user@docverify.ai',
      password: 'password123',
      role: 'user'
    });

    await ReferenceRecord.create([
      {
        recordId: 'REF-001',
        documentType: 'Certificate',
        name: 'Rahul Sharma',
        certificateId: 'CERT-2026-001',
        institution: 'Yeshwantrao Chavan College of Engineering',
        issueDate: '2026-05-10',
        expiryDate: '2030-05-10'
      },
      {
        recordId: 'REF-002',
        documentType: 'Invoice',
        vendor: 'TechSupplies Ltd',
        invoiceNumber: 'INV-88902',
        amount: '12500',
        issueDate: '2026-02-15'
      }
    ]);

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();