# DocVerify AI — Database Documentation & Sample Datasets

This folder contains database documentation, schema architecture, and sample JSON datasets for initializing and testing **DocVerify AI**.

## Folder Structure

* `database-schema.md`: Detailed breakdown of all collections, field types, indexes, and relations.
* `sample-data/users.json`: Initial user accounts across different roles (admin, verifier, user).
* `sample-data/referenceRecords.json`: Sample trusted organizational records used by the matching engine.
* `sample-data/documents.json`: Sample document entries representing various verification statuses.

## Importing Sample Data Manually

If you prefer to import data into MongoDB directly using `mongoimport` instead of running `npm run seed`:

```bash
mongoimport --db docverify --collection users --file sample-data/users.json --jsonArray
mongoimport --db docverify --collection referencerecords --file sample-data/referenceRecords.json --jsonArray
mongoimport --db docverify --collection documents --file sample-data/documents.json --jsonArray