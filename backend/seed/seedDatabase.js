const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Ensure correct path to models
const User = require('../models/User');
const ReferenceRecord = require('../models/ReferenceRecord');
const Document = require('C:\Users\Dell\Downloads/404-Brain Not Found\backend\models\Document.js');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/docverify';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await ReferenceRecord.deleteMany({});
    await Document.deleteMany({});

    // Create default accounts
    await User.create([
      {
        name: 'System Admin',
        email: 'admin@docverify.ai',
        password: 'password123',
        role: 'admin'
      },
      {
        name: 'Lead Verifier',
        email: 'verifier@docverify.ai',
        password: 'password123',
        role: 'verifier'
      },
      {
        name: 'Rahul Sharma',
        email: 'user@docverify.ai',
        password: 'password123',
        role: 'user'
      }
    ]);

    // Create reference records
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
  } catch (error) {
    console.error('Seeding Error:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedData();