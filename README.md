# SANJEEVNI — Patient Intake & Doctor Review Prototype

CareHub is a full-stack healthcare workflow prototype that collects structured patient information, guides a symptom interview, accepts supporting documents, and presents the case to a clinician for review.

> **Important:** This is a college/demo prototype. It is not a diagnostic system and should not be used for real patient care or real medical records.

## Workflow
Home → Demo Login → Patient Dashboard → Check-in → Guided Interview → Documents → Case Summary → Doctor Dashboard → Case Review

## Tech stack
- React + Vite + React Router
- Node.js + Express
- Multer for PDF/JPG/PNG uploads
- JSON file persistence for local/demo use
- CSS-first responsive UI

## Run locally (Windows PowerShell)

```powershell
npm install
```

Terminal 1:
```powershell
npm run server
```

Terminal 2:
```powershell
npm run dev
```

Open `http://localhost:5173`.

### Backend health check
`http://localhost:4000/api/health`

### Production-style local run
```powershell
npm run build
npm start
```
Then open `http://localhost:4000`.

## Demo accounts
Patient: `patient@carehub.local` / `patient123`
Doctor: `doctor@carehub.local` / `doctor123`

## Added backend functions
- Persistent local case storage in `server/data/cases.json`
- Case validation
- Interview saving
- Case status workflow: draft → submitted → reviewed
- PDF/JPG/PNG file-type validation
- 10 MB per-file limit and 5-file limit
- Clinician notes API: `POST /api/cases/:id/notes`
- Production SPA fallback so the same Express server can serve the Vite build

## Recommended next upgrade
For a real project, replace demo login and JSON storage with JWT/session authentication and MongoDB/PostgreSQL. Add role-based authorization, audit logs, encrypted object storage, consent management, appointment scheduling, clinician notes UI, notifications, and proper security controls before handling any real health information.
