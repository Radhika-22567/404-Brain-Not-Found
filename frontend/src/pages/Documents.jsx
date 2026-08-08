import React, { useState } from 'react';
import { useDocuments } from '../hooks/useDocuments';
import DocumentTable from '../components/DocumentTable';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { deleteDocumentFile } from '../services/documentService';

const Documents = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [page, setPage] = useState(1);

  const { documents, pagination, loading, refetch } = useDocuments({
    search, status, documentType, page, limit: 10
  });

  const handleDelete = async (docId) => {
    if (window.confirm(`Are you sure you want to delete ${docId}?`)) {
      await deleteDocumentFile(docId);
      refetch();
    }
  };

  return (
    <div className="page-container">
      <h2>Document Repository</h2>
      <SearchFilter
        search={search} setSearch={setSearch}
        status={status} setStatus={setStatus}
        documentType={documentType} setDocumentType={setDocumentType}
      />

      {loading ? (
        <LoadingSpinner />
      ) : documents.length === 0 ? (
        <EmptyState title="No documents found" message="Upload new documents or modify filters." />
      ) : (
        <div className="card">
          <DocumentTable documents={documents} onDelete={handleDelete} />
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default Documents;