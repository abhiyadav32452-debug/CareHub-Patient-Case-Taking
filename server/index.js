import express from "express";
import cors from "cors";
import path from "node:path";
import cases from "./routes/cases.js";

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const DIST = path.resolve("dist");

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",").map((x) => x.trim()).filter(Boolean) || true }));
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(path.resolve("server/uploads")));

app.get("/api/health", (_, res) => res.json({ ok: true, service: "carehub-api", timestamp: new Date().toISOString() }));
app.use("/api/cases", cases);

app.use(express.static(DIST));
app.get("/{*splat}", (req, res, next) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/uploads/")) return next();
  res.sendFile(path.join(DIST, "index.html"), (err) => err && next(err));
});

app.use((err, req, res, next) => {
  if (err?.code === "LIMIT_FILE_SIZE") return res.status(413).json({ message: "Each document must be 10 MB or smaller." });
  if (err?.code === "LIMIT_FILE_COUNT") return res.status(400).json({ message: "Maximum 5 documents are allowed." });
  console.error(err);
  res.status(500).json({ message: "Unexpected server error." });
});

app.listen(PORT, () => console.log(`CareHub server running on http://localhost:${PORT}`));
