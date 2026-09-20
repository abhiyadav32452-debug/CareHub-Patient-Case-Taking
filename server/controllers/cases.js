import * as store from "../services/store.js";

export function listCases(req, res) { res.json(store.list()); }

export function getCase(req, res) {
  const item = store.get(req.params.id);
  if (!item) return res.status(404).json({ message: "Case not found" });
  res.json(item);
}

export function createCase(req, res) {
  const { name, age, gender, concern } = req.body;
  if (!name?.trim() || !age || !gender || !concern?.trim()) {
    return res.status(400).json({ message: "Name, age, gender and primary concern are required." });
  }
  const numericAge = Number(age);
  if (!Number.isInteger(numericAge) || numericAge < 1 || numericAge > 120) {
    return res.status(400).json({ message: "Age must be a whole number between 1 and 120." });
  }
  res.status(201).json(store.create({ ...req.body, age: numericAge }));
}

export function updateCase(req, res) {
  const allowed = ["name", "age", "gender", "phone", "concern"];
  const data = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
  const item = store.update(req.params.id, data);
  if (!item) return res.status(404).json({ message: "Case not found" });
  res.json(item);
}

export function saveInterview(req, res) {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({ message: "Interview answers must be an object." });
  }
  const item = store.update(req.params.id, { interview: req.body });
  if (!item) return res.status(404).json({ message: "Case not found" });
  res.json(item);
}

export function updateStatus(req, res) {
  const allowed = ["draft", "submitted", "reviewed"];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ message: "Invalid status." });
  const item = store.update(req.params.id, { status: req.body.status });
  if (!item) return res.status(404).json({ message: "Case not found" });
  res.json(item);
}

export function uploadDocuments(req, res) {
  const item = store.get(req.params.id);
  if (!item) return res.status(404).json({ message: "Case not found" });
  if (!req.files?.length) return res.status(400).json({ message: "Select at least one PDF, JPG or PNG file." });
  const documents = req.files.map((file) => ({
    id: file.filename, name: file.originalname, size: file.size, type: file.mimetype,
    uploadedAt: new Date().toISOString(), storedName: file.filename, url: `/uploads/${file.filename}`
  }));
  res.json(store.addDocuments(req.params.id, documents));
}

export function addClinicianNote(req, res) {
  const text = String(req.body?.text || "").trim();
  if (!text) return res.status(400).json({ message: "Note text is required." });
  const item = store.addNote(req.params.id, { text, author: req.body.author });
  if (!item) return res.status(404).json({ message: "Case not found" });
  res.json(item);
}
