import axios from "axios";

const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/ui-errors/error-pages-templates/main/";

const REGISTRY_BASE =
  `${GITHUB_RAW_BASE}registry/`;

// Helper to load registry JSON from GitHub
async function loadRegistry(type) {
  try {
    const { data } = await axios.get(
      `${REGISTRY_BASE}${type}.json`,
      {
        timeout: 10000,
      }
    );

    return data.templates || [];
  } catch (err) {
    console.error("Registry load error:", err.message);
    return null;
  }
}

export default async function handler(req, res) {
  const { type, path: filePath } = req.query;

  // Allow external apps
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ----------------------------
  // Return templates list
  // ----------------------------
  if (type === "404" || type === "500") {
    const templates = await loadRegistry(type);

    if (!templates) {
      return res.status(500).json({
        success: false,
        error: "Failed to load registry",
      });
    }

    return res.status(200).json({
      success: true,
      type,
      count: templates.length,
      templates,
    });
  }

  // ----------------------------
  // Return raw code
  // ----------------------------
  if (type === "code") {
    if (!filePath) {
      return res.status(400).json({
        success: false,
        error: "Missing path parameter",
      });
    }

    try {
      const url = `${GITHUB_RAW_BASE}${filePath}`;

      const response = await axios.get(url, {
        responseType: "text",
        timeout: 10000,
      });

      return res.status(200).json({
        success: true,
        path: filePath,
        code: response.data,
      });
    } catch (err) {
      if (err.response?.status === 404) {
        return res.status(404).json({
          success: false,
          error: "File not found",
        });
      }

      console.error("GitHub fetch error:", err.message);

      return res.status(500).json({
        success: false,
        error: "Failed to fetch code",
      });
    }
  }

  // ----------------------------
  // Invalid request
  // ----------------------------
  return res.status(400).json({
    success: false,
    error: "Invalid request. Use ?type=404 | 500 | code",
  });
}
