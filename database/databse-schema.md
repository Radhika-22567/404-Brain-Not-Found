---

### 2. `database/database-schema.md`

```markdown
# DocVerify AI — MongoDB Database Schema Specification

## Collections

### 1. Users (`users`)
Stores platform users, credentials, and access roles.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Unique user identifier |
| `name` | String | Required | User's full name |
| `email` | String | Required, Unique | User email address |
| `password` | String | Required | Bcrypt hashed password |
| `role` | String | Enum (`admin`, `verifier`, `user`) | Access control role |
| `isActive` | Boolean | Default: `true` | Account status flag |
| `createdAt` | Date | Auto | Record creation timestamp |
| `updatedAt` | Date | Auto | Record update timestamp |

### 2. Documents (`documents`)
Stores primary document records, OCR output, and verification results.

| Field | Type | Index | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Mongo internal ID |
| `documentId` | String | Unique Index | Human-readable ID (e.g. `DOC-1001`) |
| `uploadedBy` | ObjectId | Ref: `User` | User who uploaded the file |
| `originalFileName` | String | — | Original file name |
| `filePath` | String | — | Path to file in storage |
| `fileType` | String | — | MIME type (`application/pdf`, `image/png`) |
| `fileSize` | Number | — | File size in bytes |
| `documentType` | String | Index | `Certificate`, `Identity Document`, `Invoice`, `Application`, `Other` |
| `classificationConfidence` | Number | — | AI classification percentage (0–100) |
| `status` | String | Index | `pending`, `verified`, `flagged`, `rejected` |
| `extractedData` | Object | Indexed fields inside | Extracted structured fields (`name`, `certificateId`, `invoiceNumber`, etc.) |
| `ocrText` | String | Text Index | Raw OCR extracted text |
| `verificationResult` | Object | — | Rule-based check results |
| `referenceMatch` | Object | — | Output from reference database comparison |
| `duplicateResult` | Object | — | Similarity and duplicate check results |
| `anomalyResult` | Object | — | Anomaly detection score and indicators |
| `aiExplanation` | String | — | Concise generated explanation |
| `confidenceScore` | Number | — | Overall system confidence (0–100) |
| `reviewer` | ObjectId | Ref: `User` | Verifier who manually reviewed |
| `reviewerNotes` | String | — | Notes added during manual review |

### 3. Reference Records (`referencerecords`)
Stores trusted organizational data for verification comparisons.

| Field | Type | Index | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Mongo internal ID |
| `recordId` | String | Unique Index | Reference ID (e.g. `REF-001`) |
| `documentType` | String | Index | Target document type |
| `name` | String | Index | Entity or person name |
| `certificateId` | String | Index | Official certificate ID |
| `invoiceNumber` | String | Index | Official invoice number |
| `documentNumber` | String | Index | ID card or passport number |
| `institution` | String | — | Issuing institution |
| `vendor` | String | — | Vendor name |
| `issueDate` | String | — | Date of issue |
| `expiryDate` | String | — | Date of expiry |
| `amount` | String | — | Expected invoice amount |

### 4. Verification History (`verificationhistories`)
Immutable audit trail for all processing steps and manual verifier actions.

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Audit record ID |
| `documentId` | String | Reference to `documentId` |
| `user` | ObjectId | User who initiated action |
| `action` | String | Enum (`UPLOAD`, `OCR_COMPLETED`, `AI_ANALYSIS`, `APPROVED`, `REJECTED`, `FLAGGED`, etc.) |
| `previousStatus` | String | Status before action |
| `newStatus` | String | Status after action |
| `reason` | String | Context or reviewer note |
| `timestamp` | Date | Event execution time |

---

## Recommended Mongo Indexes

```javascript
db.documents.createIndex({ documentId: 1 }, { unique: true });
db.documents.createIndex({ status: 1 });
db.documents.createIndex({ documentType: 1 });
db.documents.createIndex({ "extractedData.certificateId": 1 });
db.documents.createIndex({ "extractedData.invoiceNumber": 1 });
db.documents.createIndex({ createdAt: -1 });

db.referencerecords.createIndex({ recordId: 1 }, { unique: true });
db.referencerecords.createIndex({ certificateId: 1 });
db.referencerecords.createIndex({ invoiceNumber: 1 });
db.referencerecords.createIndex({ documentNumber: 1 });