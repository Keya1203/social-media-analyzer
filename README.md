# Social Media Content Analyzer

A modern web application that analyzes social media content by extracting text from uploaded PDFs and images, providing actionable insights to improve engagement.

## ✅ Live Demo

- Deployment: _Pending_

## 🚀 Features

- **File Upload**: Drag-and-drop interface for PDF and image files
- **Text Extraction**: Advanced OCR for images and PDF parsing for documents
- **Content Analysis**:
  - Word count and keyword frequency analysis
  - Sentiment analysis (Positive/Neutral/Negative)
  - Hashtag detection and counting
  - Call-to-action (CTA) word identification
  - Engagement score calculation
- **Smart Suggestions**: AI-powered recommendations for content improvement
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 18 with modern hooks and CSS custom properties
- **Backend**: Node.js with Express.js
- **OCR Engine**: Tesseract.js for image text recognition
- **PDF Processing**: pdf-parse for document text extraction
- **File Handling**: Multer for secure file uploads
- **Styling**: Custom CSS with responsive design

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🏃‍♂️ Local Development

### Backend Setup
```bash
cd backend
npm install
npm run dev  # For development with nodemon
# or
npm start    # For production
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

To point the React app at a different backend origin in development or production, set `REACT_APP_API_BASE_URL` in `.env.local` (for example, `REACT_APP_API_BASE_URL=https://your-api.example.com`).

## 📁 Project Structure

```
social-media-analyzer/
├── backend/
│   ├── index.js              # Express server setup
│   ├── textProcessor.js      # Text extraction and analysis logic
│   ├── uploads/              # Temporary file storage
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUploader.js    # File upload component
│   │   │   └── AnalysisDisplay.js # Results display component
│   │   ├── App.js             # Main React component
│   │   └── index.css          # Application styling
│   └── package.json
├── README.md
├── APPROACH.md
└── .gitignore
```

## 🧱 Legacy Prototype

The repository still includes the original static prototype under `legacy-static-prototype/`. It remains for reference only—the production experience runs through the React frontend and Express API described above.

## 🔧 API Endpoints

### POST /api/upload
Upload a file for analysis.

**Request**: Multipart form data with `file` field (PDF or image)

**Response**:
```json
{
  "text": "Extracted text content...",
  "analysis": {
    "wordCount": 150,
    "topWords": [{"word": "social", "count": 5}],
    "sentiment": "Positive",
    "foundCTAs": ["follow", "like"],
    "hashtagCount": 3,
    "engagementScore": 75
  }
}
```

### GET /api/ping
Health check endpoint.

## 🎯 Usage

1. **Upload Content**: Drag and drop or click to select a PDF or image file
2. **Automatic Processing**: The app extracts text using appropriate methods (PDF parsing or OCR)
3. **View Analysis**: Review metrics, keywords, sentiment, and engagement score
4. **Get Suggestions**: Follow AI-generated recommendations to improve content

## 📊 Analysis Metrics

- **Word Count**: Total number of words in the content
- **Top Keywords**: Most frequently used words (excluding common stopwords)
- **Sentiment**: Overall tone analysis (Positive/Neutral/Negative)
- **Hashtags**: Number of hashtag instances detected
- **CTAs**: Call-to-action words found in the content
- **Engagement Score**: Composite score based on various engagement factors

## 🚀 Deployment

### Backend Deployment (Render/Heroku)
1. Create a new web service on Render or Heroku
2. Connect your GitHub repository
3. Set environment variables if needed
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `build` folder to Vercel or Netlify
3. Update API base URL in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or support, please open an issue on GitHub.

## Approach (≤200 words)

The final solution uses a React 18 frontend backed by an Express API so heavy parsing happens server-side while the UI stays responsive. Uploads flow through Multer to a processing pipeline that differentiates PDFs and images: PDFs use `pdf-parse` for structured extraction, images go through Tesseract.js with a managed worker lifecycle and cached language data. Extracted text is normalized and analyzed for sentiment, CTA coverage, hashtags, and keyword frequency to produce an engagement score plus targeted suggestions. The frontend focuses on accessibility and clarity with drag-and-drop upload, loading states, and actionable summaries rendered by modular components. Error handling spans both tiers, surfacing user-friendly messages while logging server details for debugging. The architecture keeps the door open for future enhancements like additional languages or cloud deployment while meeting the assessment constraints within the allotted time.

## 🧪 Testing

- Backend: `cd backend && npm test` _(placeholder — add real automated coverage alongside future enhancements)_
- Frontend: `cd frontend && npm test`
