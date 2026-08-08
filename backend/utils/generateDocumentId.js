const generateDocumentId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `DOC-${randomNum}`;
  };
  
  module.exports = { generateDocumentId };