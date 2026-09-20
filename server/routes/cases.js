import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { listCases, getCase, createCase, updateCase, saveInterview, updateStatus, uploadDocuments, addClinicianNote } from "../controllers/cases.js";

const router = Router();
const uploadDir = path.resolve("server/uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safe}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 5 },
  fileFilter: (_, file, cb) => {
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    cb(null, allowed.includes(file.mimetype));
  }
});

router.get("/", listCases);
router.get("/:id", getCase);
router.post("/", createCase);
router.put("/:id", updateCase);
router.post("/:id/interview", saveInterview);
router.post("/:id/documents", upload.array("documents", 5), uploadDocuments);
router.post("/:id/notes", addClinicianNote);
router.put("/:id/status", updateStatus);

export default router;
