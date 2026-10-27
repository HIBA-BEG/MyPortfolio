type ApiRequest = {
  method?: string;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

function githubToken(): string | undefined {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  return env?.GITHUB_TOKEN;
}

export async function fetchOwnedRepoCount(token: string | undefined): Promise<number> {
  if (!token) throw new Error('missing token');

  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'hiba-portfolio',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!response.ok) throw new Error('github');

  const data: unknown = await response.json();
  if (!data || typeof data !== 'object') throw new Error('github');

  const record = data as { public_repos?: unknown; total_private_repos?: unknown };
  if (typeof record.public_repos !== 'number' || typeof record.total_private_repos !== 'number') {
    throw new Error('github');
  }

  return record.public_repos + record.total_private_repos;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'unavailable' });
    return;
  }

  try {
    const total = await fetchOwnedRepoCount(githubToken());
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ total });
  } catch {
    res.status(503).json({ error: 'unavailable' });
  }
}
