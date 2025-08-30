function formatDate(isoDate) {
  if (!isoDate) return '';
  return new Date(isoDate).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

async function fetchJsonWithProxy(url) {
  try {
    const r = await fetch(url, {
      cache: 'no-store',
      redirect: 'follow',
      mode: 'cors',
    });
    if (r.ok) return await r.json();
  } catch (_) {}
  try {
    const proxied = `https://cors.isomorphic-git.org/${url}`;
    const r2 = await fetch(proxied, {
      cache: 'no-store',
      redirect: 'follow',
      mode: 'cors',
    });
    if (r2.ok) return await r2.json();
  } catch (_) {}
  throw new Error('Failed to fetch JSON: ' + url);
}

async function mapUrlsToNames(urls) {
  if (!Array.isArray(urls)) return [];
  const names = await Promise.all(
    urls.map(async (u) => {
      try {
        const obj = await fetchJsonWithProxy(u);
        return obj && obj.name ? obj.name : null;
      } catch (_) {
        return null;
      }
    })
  );
  return names.filter(Boolean);
}

async function mapUrlsToTitles(urls) {
  if (!Array.isArray(urls)) return [];
  const titles = await Promise.all(
    urls.map(async (u) => {
      try {
        const obj = await fetchJsonWithProxy(u);
        return obj && obj.title ? obj.title : null;
      } catch (_) {
        return null;
      }
    })
  );
  return titles.filter(Boolean);
}
