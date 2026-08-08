import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Upload, File, CheckCircle2 } from 'lucide-react';

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('document', file);

    setUploading(true);
    try {
      const res = await API.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate(`/documents/${res.data.data.documentId}`);
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card">
        <h3>Upload Document for AI Verification</h3>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
          Upload PDF, JPG, or PNG files up to 10MB.
        </p>

        <form onSubmit={handleUpload}>
          <div style={{ border: '2px dashed #cbd5e1', padding: '40px', borderRadius: '8px', textAlign: 'center', background: '#f8fafc', marginBottom: '20px' }}>
            <Upload size={36} color="#64748b" style={{ marginBottom: '12px' }} />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: 'block', margin: '0 auto' }} accept=".pdf,.jpg,.jpeg,.png" />
          </div>

          {file && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '14px' }}>
              <File size={16} /> Selected: {file.name}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={!file || uploading}>
            {uploading ? 'Processing AI Pipeline...' : 'Start Verification'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadDocument;