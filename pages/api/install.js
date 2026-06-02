import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = "ui-errors/error-pages-templates";
const FILE_PATH = "stats.json";
const BRANCH = "main";

/**
 * Fetch current stats.json from GitHub
 */
async function getStats() {
  try {
    const url = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${FILE_PATH}`;
    const { data } = await axios.get(url);
    return data;
  } catch {
    return {};
  }
}

/**
 * Get SHA required for GitHub file update
 */
async function getFileSha() {
  const url = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;

  const res = await axios.get(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });

  return res.data.sha;
}

/**
 * Update file in GitHub
 */
async function updateGitHubFile(content, sha) {
  const url = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;

  await axios.put(
    url,
    {
      message: "chore: update template analytics",
      content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
      sha,
      branch: BRANCH,
    },
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );
}

/**
 * Main API handler
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { template, framework, type } = req.body;

    if (!template || !framework || !type) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const stats = await getStats();

    if (!stats[template]) {
      stats[template] = {
        installs: 0,
        frameworks: {},
        types: {}
      };
    }

    stats[template].installs += 1;

    stats[template].frameworks[framework] =
      (stats[template].frameworks[framework] || 0) + 1;

    stats[template].types[type] =
      (stats[template].types[type] || 0) + 1;

    const sha = await getFileSha();
    await updateGitHubFile(stats, sha);

    return res.status(200).json({
      success: true,
      template
    });
  } catch (err) {
    return res.status(500).json({
      error: "Analytics update failed",
      details: err.message
    });
  }
}
