// backend/ocrUtils.js
const fs = require('fs').promises;
const pdf = require('pdf-parse');
const { createWorker } = require('tesseract.js');
const stopwords = require('./stopwords'); // we'll define inline below as array

// Minimal stopwords list (extend as needed)
const STOPWORDS = [
  "a","an","the","and","or","but","if","in","on","with","to","for","of","is","are","was","were","be","by","this","that","it","as","at","from"
];

// lightweight positive/negative word lists for naive sentiment
const POS = ['good','great','excellent','happy','love','like','success','improve','positive','best','awesome'];
const NEG = ['bad','poor','failed','sad','hate','problem','negative','worse','issue','angry'];

/**
 * extractTextFromPDF(path)
 * extractTextFromImage(path)
 * analyzeText(text)
 */

async function extractTextFromPDF(filePath) {
  const dataBuffer = await fs.readFile(filePath);
  const data = await pdf(dataBuffer);
  // pdf-parse returns `text` with page breaks
  return data.text || '';
}

async function extractTextFromImage(filePath) {
  const worker = createWorker({
    logger: m => {} // silent; remove or console.log to debug
  });
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(filePath);
  await worker.terminate();
  return text || '';
}

function analyzeText(text) {
  const normalized = text.replace(/\r\n/g,' ').replace(/\n/g,' ').toLowerCase();
  const tokens = normalized.match(/\b[a-z0-9#@']+\b/g) || [];

  // word count
  const wordCount = tokens.length;

  // frequency map ignoring stopwords and single-char tokens
  const freq = {};
  tokens.forEach(tok => {
    if (tok.length <= 1) return;
    if (STOPWORDS.includes(tok)) return;
    // drop pure numerics? optional - keep hashtags
    freq[tok] = (freq[tok] || 0) + 1;
  });

  // top N words
  const topWords = Object.entries(freq)
    .sort((a,b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));

  // naive sentiment: count matches in POS/NEG lists
  const posCount = tokens.filter(t => POS.includes(t)).length;
  const negCount = tokens.filter(t => NEG.includes(t)).length;
  let sentiment = 'Neutral';
  if (posCount - negCount >= 2) sentiment = 'Positive';
  if (negCount - posCount >= 2) sentiment = 'Negative';

  // CTA heuristic: check for 'follow', 'like', 'subscribe', 'comment', 'share', 'dm'
  const ctas = ['follow','like','subscribe','comment','share','dm','visit'];
  const foundCTAs = ctas.filter(c => tokens.includes(c));

  // hashtag count
  const hashtagCount = tokens.filter(t => t.startsWith('#')).length;

  return {
    wordCount,
    topWords: topWords.slice(0, 5),
    sentiment,
    foundCTAs,
    hashtagCount
  };
}

/**
 * main entry: detect mimetype, run appropriate extractor
 * @param {string} filePath
 * @param {string} mimetype
 */
async function parseFileAndAnalyze(filePath, mimetype) {
  try {
    let text = '';
    if (mimetype === 'application/pdf' || filePath.toLowerCase().endsWith('.pdf')) {
      text = await extractTextFromPDF(filePath);
    } else if (mimetype.startsWith('image/') || /\.(png|jpe?g|bmp|tiff)$/i.test(filePath)) {
      text = await extractTextFromImage(filePath);
    } else {
      // fallback to try PDF parse then OCR
      try { text = await extractTextFromPDF(filePath); } catch {}
      if (!text) text = await extractTextFromImage(filePath);
    }

    // do analysis
    const analysis = analyzeText(text);

    // optionally delete file to keep uploads clean (non-blocking)
    fs.unlink(filePath).catch(() => {});

    return { text, analysis };
  } catch (err) {
    // rethrow to caller
    throw err;
  }
}

module.exports = {
  parseFileAndAnalyze
};
