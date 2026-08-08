const calculateSimilarity = (str1, str2) => {
    if (!str1 || !str2) return 0;
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();
    if (s1 === s2) return 1.0;
  
    const pairs1 = getBigrams(s1);
    const pairs2 = getBigrams(s2);
  
    let union = pairs1.length + pairs2.length;
    if (union === 0) return 0;
  
    let intersection = 0;
    for (const p1 of pairs1) {
      for (let i = 0; i < pairs2.length; i++) {
        if (p1 === pairs2[i]) {
          intersection++;
          pairs2.splice(i, 1);
          break;
        }
      }
    }
  
    return (2.0 * intersection) / union;
  };
  
  function getBigrams(str) {
    const bigrams = [];
    for (let i = 0; i < str.length - 1; i++) {
      bigrams.push(str.substring(i, i + 2));
    }
    return bigrams;
  }
  
  module.exports = { calculateSimilarity };