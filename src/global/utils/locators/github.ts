export function isHttpUrl(u: string): boolean {
  return /^https?:\/\//i.test(String(u));
}

/**
 * Update a file on GitHub using the Contents API.
 * url must be the raw URL in this pattern:
 * https://github.com/{owner}/{repo}/raw/refs/heads/{branch}/{path}
 */
export async function updateGitHubFile(
  url: string,
  content: Buffer,
  message: string,
  token: string
): Promise<string> {
  const rawPattern = /https:\/\/github\.com\/([^/]+)\/([^/]+)\/raw\/refs\/heads\/([^/]+)\/(.+)$/;
  const m = String(url).match(rawPattern);
  if (!m) {
    throw new Error('Invalid GitHub raw URL format (expected /raw/refs/heads/{branch}/path)');
  }

  const [, owner, repo, branch, filePath] = m;

  // const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
  const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
  const getResp = await fetch(getUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });

  if (!getResp.ok) {
    const txt = await getResp.text();
    throw new Error(`Failed to get file from GitHub: ${getResp.status} ${txt}`);
  }

  const getJson = await getResp.json();
  const sha = getJson.sha;

  const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  const putResp = await fetch(putUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      content: content.toString('base64'),
      sha,
      branch
    })
  });

  if (!putResp.ok) {
    const txt = await putResp.text();
    throw new Error(`Failed to update file on GitHub: ${putResp.status} ${txt}`);
  }

  const putJson = await putResp.json();
  return putJson.content?.path;
}