import React, { useState } from 'react';
import { Upload, File } from 'lucide-react';

const DocumentUploader = ({ onFileSelect, uploading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${dragActive ? '#2563eb' : '#cbd5e1'}`,
        borderRadius: '8px',
        padding: '32px',
        textAlign: 'center',
        background: dragActive ? '#eff6ff' : '#f8fafc',
        cursor: 'pointer'
      }}
    >
      <Upload size={32} color="#64748b" style={{ marginBottom: '8px' }} />
      <p style={{ fontSize: '14px', fontWeight: '500' }}>Drag & drop document here, or click to browse</p>
      <input type="file" onChange={handleChange} accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} id="file-upload-input" />
      <label htmlFor="file-upload-input" className="btn btn-primary" style={{ marginTop: '12px' }}>
        Select File
      </label>
      {selectedFile && (
        <div style={{ marginTop: '12px', fontSize: '13px', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <File size={16} /> {selectedFile.name}
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;