import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/ui-errors/error-pages-templates/main/";

// Helper to load local registry JSON
function loadRegistry(type) {
  try {
    const filePath = path.join(process.cwd(), "registry", `${type}.json`);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw).templates || [];
  } catch (err) {
    return null;
  }
}

export default async function handler(req, res) {
  const { type, path: filePath } = req.query;

  // Allow external apps
  res.setHeader("Access-Control-Allow-Origin", "*");

  // ----------------------------
  // Return templates list
  // ----------------------------
  if (type === "404" || type === "500") {
    const templates = loadRegistry(type);
    if (!templates) {
      return res.status(500).json({ error: "Failed to load registry" });
    }
    return res.status(200).json({ type, count: templates.length, templates });
  }

  // ----------------------------
  // Return raw code
  // ----------------------------
  if (type === "code") {
    if (!filePath) {
      return res.status(400).json({ error: "Missing path" });
    }

    try {
      const url = GITHUB_RAW_BASE + filePath;
      const response = await fetch(url);

      if (!response.ok) {
        return res.status(404).json({ error: "File not found" });
      }

      const code = await response.text();
      return res.status(200).json({ path: filePath, code });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch code" });
    }
  }

  // ----------------------------
  // Invalid request
  // ----------------------------
  return res
    .status(400)
    .json({ error: "Invalid request. Use ?type=404 | 500 | code" });
}
