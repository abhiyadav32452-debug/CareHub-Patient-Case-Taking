import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

const dataDir = path.resolve("server/data");
const dataFile = path.join(dataDir, "cases.json");
fs.mkdirSync(dataDir, { recursive: true });

const now = () => new Date().toISOString();

const seedCases = [
  {
    id: "SJ-1024", name: "Abhishek Sharma", age: 28, gender: "Male", phone: "9000000000",
    concern: "Persistent headache",
    interview: { duration: "5 days", pattern: "Several times a day", severity: "Moderate", associated: "Mild nausea and sensitivity to bright light.", history: "No known chronic condition. No previous surgery.", medications: "Paracetamol occasionally.", allergies: "None known" },
    documents: [], notes: [], status: "submitted", createdAt: now(), updatedAt: now()
  },
  {
    id: "SJ-1025", name: "Priya Verma", age: 34, gender: "Female", phone: "9000000001",
    concern: "Fever",
    interview: { duration: "2 days", pattern: "Most of the day", severity: "Moderate", associated: "Body ache and tiredness.", history: "No significant medical history.", medications: "None", allergies: "None known" },
    documents: [], notes: [], status: "submitted", createdAt: now(), updatedAt: now()
  }
];

function load() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(seedCases, null, 2));
    return structuredClone(seedCases);
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(dataFile, "utf8"));
    return Array.isArray(parsed) ? parsed : structuredClone(seedCases);
  } catch {
    return structuredClone(seedCases);
  }
}

let cases = load();

function save() {
  fs.writeFileSync(dataFile, JSON.stringify(cases, null, 2));
}

export function list() { return cases; }
export function get(id) { return cases.find((item) => item.id === id); }

export function create(data) {
  const item = {
    id: `SJ-${randomUUID().slice(0, 6).toUpperCase()}`,
    name: String(data.name).trim(), age: Number(data.age), gender: data.gender,
    phone: String(data.phone || "").trim(), concern: String(data.concern).trim(),
    interview: {}, documents: [], notes: [], status: "draft", createdAt: now(), updatedAt: now()
  };
  cases.unshift(item); save(); return item;
}

export function update(id, data) {
  const item = get(id); if (!item) return null;
  Object.assign(item, data, { updatedAt: now() }); save(); return item;
}

export function addDocuments(id, documents) {
  const item = get(id); if (!item) return null;
  item.documents.push(...documents); item.updatedAt = now(); save(); return item;
}

export function addNote(id, note) {
  const item = get(id); if (!item) return null;
  item.notes ??= [];
  item.notes.push({ id: randomUUID(), text: note.text, author: note.author || "Clinician", createdAt: now() });
  item.updatedAt = now(); save(); return item;
}
