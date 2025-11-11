# Social Media Content Analyzer

Simple app to extract text from PDFs/images (OCR + PDF parsing) and show light content analysis.

## Features
- Upload PDF or image
- Extracted text preview
- Word count, top words (stopwords removed), naive sentiment hint, hashtag count, CTA hints

## Tech stack
- Frontend: React (Create React App)
- Backend: Node.js + Express
- OCR: tesseract.js
- PDF parsing: pdf-parse

## Run locally
1. Backend
   ```bash
   cd backend
   npm install
   npm start

2. Frontend

  cd frontend
  npm install
  npm start