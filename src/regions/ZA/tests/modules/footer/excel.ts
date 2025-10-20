export function isHttpUrl(u: string): boolean {
  return /^https?:\/\//i.test(u);
}

export async function updateGitHubFile(
  url: string,
  content: Buffer,
  message: string,
  token: string
): Promise<string> {
  const rawPattern = /https:\/\/github\.com\/([^/]+)\/([^/]+)\/raw\/refs\/heads\/([^/]+)\/(.+)$/;
  const m = String(url).match(rawPattern);
  if (!m) {
    throw new Error('Invalid GitHub raw URL format');
  }

  const [, owner, repo, branch, filePath] = m;

  // Get current file SHA
  const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
  const getResp = await fetch(getUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });
  
  if (!getResp.ok) {
    throw new Error(`Failed to get file from GitHub: ${await getResp.text()}`);
  }

  const { sha } = await getResp.json();

  // Update file
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
    throw new Error(`Failed to update file on GitHub: ${await putResp.text()}`);
  }

  const putJson = await putResp.json();
  return putJson.content?.path;
}