import React from 'react';
import { Bot } from 'lucide-react';

const AIExplanation = ({ explanation }) => {
  return (
    <div className="card" style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Bot size={20} color="#2563eb" />
        <h3 style={{ margin: 0 }}>AI Reasoning & Explanation</h3>
      </div>
      <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>
        {explanation || 'No AI summary generated for this file.'}
      </p>
    </div>
  );
};

export default AIExplanation;