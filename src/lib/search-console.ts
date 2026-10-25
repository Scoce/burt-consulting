import crypto from 'crypto';

export interface GscPageMetric {
  url: string;
  clicks28d: number;
  impressions28d: number;
  ctr28d: number;
  avgPosition: number;
  topQueries: Array<{ query: string; clicks: number; impressions: number; position: number }>;
}

export interface MagnetSeoTelemetry {
  url: string;
  isLiveReachable: boolean;
  httpStatus: number;
  responseTimeMs: number;
  inSitemap: boolean;
  hasCanonical: boolean;
  isIndexable: boolean;
  detectedSchemas: string[];
  targetKeywords: string[];
  gscConnected: boolean;
  gscIndexVerdict?: 'PASS' | 'NEUTRAL' | 'FAIL' | null;
  gscCoverageState?: string | null;
  gscLastCrawlTime?: string | null;
  impressions28d: number | null;
  organicClicks28d: number | null;
  ctr28d: number | null;
  avgPosition: number | null;
  topRankingQueries: Array<{ query: string; clicks: number; impressions: number; position: number }>;
  lastCheckedAt: string;
}

function base64UrlEncode(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf8') : input;
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getGoogleAccessToken(clientEmail: string, privateKey: string): Promise<string | null> {
  try {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const claimSet = {
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/webmasters',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(
      JSON.stringify(claimSet)
    )}`;

    const formattedKey = privateKey.replace(/\\n/g, '\n');
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(unsignedToken);
    const signature = signer.sign(formattedKey);
    const jwt = `${unsignedToken}.${base64UrlEncode(signature)}`;

    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token || null;
  } catch {
    return null;
  }
}

export async function fetchGscMetricsForDomain(
  domain: string
): Promise<{
  connected: boolean;
  siteUrl?: string;
  token?: string;
  pages: Record<string, GscPageMetric>;
}> {
  const clientEmail = process.env.GSC_CLIENT_EMAIL;
  const privateKey = process.env.GSC_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    return { connected: false, pages: {} };
  }

  const token = await getGoogleAccessToken(clientEmail, privateKey);
  if (!token) {
    return { connected: false, pages: {} };
  }

  const endDate = new Date().toISOString().slice(0, 10);
  // 180-day window so low-volume / seasonal pages still surface their real impressions & positions
  const startDate = new Date(Date.now() - 180 * 86400 * 1000).toISOString().slice(0, 10);

  const siteCandidates = [`sc-domain:${domain}`, `https://${domain}/`];

  for (const siteUrl of siteCandidates) {
    try {
      const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
        siteUrl
      )}/searchAnalytics/query`;

      const [pageRes, queryRes] = await Promise.all([
        fetch(endpoint, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate,
            endDate,
            dimensions: ['page'],
            rowLimit: 100,
          }),
        }),
        fetch(endpoint, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate,
            endDate,
            dimensions: ['page', 'query'],
            rowLimit: 250,
          }),
        }),
      ]);

      if (!pageRes.ok) continue;

      const pageData = await pageRes.json();
      const queryData = queryRes.ok ? await queryRes.json() : { rows: [] };

      const pages: Record<string, GscPageMetric> = {};
      for (const row of pageData.rows || []) {
        const pageUrl = row.keys?.[0];
        if (!pageUrl) continue;
        pages[pageUrl] = {
          url: pageUrl,
          clicks28d: row.clicks || 0,
          impressions28d: row.impressions || 0,
          ctr28d: Math.round((row.ctr || 0) * 1000) / 10,
          avgPosition: Math.round((row.position || 0) * 10) / 10,
          topQueries: [],
        };
      }

      for (const qRow of queryData.rows || []) {
        const pageUrl = qRow.keys?.[0];
        const queryText = qRow.keys?.[1];
        if (pageUrl && queryText && pages[pageUrl] && pages[pageUrl].topQueries.length < 5) {
          pages[pageUrl].topQueries.push({
            query: queryText,
            clicks: qRow.clicks || 0,
            impressions: qRow.impressions || 0,
            position: Math.round((qRow.position || 0) * 10) / 10,
          });
        }
      }

      return { connected: true, siteUrl, token, pages };
    } catch {
      continue;
    }
  }

  return { connected: false, pages: {} };
}

async function inspectUrlInGsc(
  token: string,
  siteUrl: string,
  inspectionUrl: string
): Promise<{
  verdict: 'PASS' | 'NEUTRAL' | 'FAIL' | null;
  coverageState: string | null;
  lastCrawlTime: string | null;
}> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inspectionUrl, siteUrl }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return { verdict: null, coverageState: null, lastCrawlTime: null };
    const data = await res.json();
    const idx = data.inspectionResult?.indexStatusResult;
    return {
      verdict: idx?.verdict || null,
      coverageState: idx?.coverageState || null,
      lastCrawlTime: idx?.lastCrawlTime || null,
    };
  } catch {
    return { verdict: null, coverageState: null, lastCrawlTime: null };
  }
}

function extractSchemaTypesFromHtml(html: string): string[] {
  const found = new Set<string>();
  const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      const collectTypes = (obj: unknown) => {
        if (!obj || typeof obj !== 'object') return;
        if (Array.isArray(obj)) {
          obj.forEach(collectTypes);
          return;
        }
        const rec = obj as Record<string, unknown>;
        if (typeof rec['@type'] === 'string') {
          found.add(rec['@type']);
        } else if (Array.isArray(rec['@type'])) {
          rec['@type'].forEach((t) => typeof t === 'string' && found.add(t));
        }
        if (Array.isArray(rec['@graph'])) {
          rec['@graph'].forEach(collectTypes);
        }
      };
      collectTypes(parsed);
    } catch {
      // Ignore malformed JSON-LD blocks
    }
  }
  return Array.from(found);
}

const seoGlobalCache = global as typeof globalThis & {
  __seoProbeCache?: Record<string, { expiresAt: number; data: Record<string, MagnetSeoTelemetry> }>;
};

const SEO_PROBE_TTL_MS = 60 * 60 * 1000; // 1 hour memory cache to conserve serverless CPU

export async function probeLiveSeoAndRanking(
  domain: string,
  magnets: Array<{ url: string; targetKeywords: string[]; fallbackSchemas: string[] }>
): Promise<Record<string, MagnetSeoTelemetry>> {
  const cached = seoGlobalCache.__seoProbeCache?.[domain];
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data;
  }

  const results: Record<string, MagnetSeoTelemetry> = {};
  const nowIso = new Date().toISOString();

  // 1. Fetch sitemap.xml & GSC data in parallel
  const [sitemapUrls, gscResult] = await Promise.all([
    (async (): Promise<Set<string>> => {
      try {
        const res = await fetch(`https://${domain}/sitemap.xml`, {
          headers: { 'User-Agent': 'BurtConsulting-SEOProbe/1.0' },
          next: { revalidate: 3600 },
        });
        if (!res.ok) return new Set();
        const xml = await res.text();
        const locs = new Set<string>();
        const locRegex = /<loc>(.*?)<\/loc>/gi;
        let m: RegExpExecArray | null;
        while ((m = locRegex.exec(xml)) !== null) {
          locs.add(m[1].trim().replace(/\/$/, ''));
        }
        return locs;
      } catch {
        return new Set();
      }
    })(),
    fetchGscMetricsForDomain(domain),
  ]);

  // 2. Probe each magnet URL concurrently
  await Promise.all(
    magnets.map(async (mag) => {
      const cleanUrl = mag.url.replace(/\/$/, '');
      const inSitemap = sitemapUrls.has(cleanUrl) || sitemapUrls.has(mag.url);
      const gscPage = gscResult.pages[mag.url] || gscResult.pages[cleanUrl];

      const startMs = Date.now();
      const inspectionPromise =
        gscResult.connected && gscResult.token && gscResult.siteUrl
          ? inspectUrlInGsc(gscResult.token, gscResult.siteUrl, mag.url)
          : Promise.resolve({ verdict: null, coverageState: null, lastCrawlTime: null });

      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 2500);
        const [res, inspection] = await Promise.all([
          fetch(mag.url, {
            headers: { 'User-Agent': 'BurtConsulting-SEOProbe/1.0' },
            signal: controller.signal,
            next: { revalidate: 3600 },
          }),
          inspectionPromise,
        ]);
        clearTimeout(timer);

        const elapsed = Date.now() - startMs;
        const html = res.ok ? await res.text() : '';
        const hasCanonical = /<link[^>]*rel=["']canonical["'][^>]*>/i.test(html);
        const robotsHeader = res.headers.get('x-robots-tag') || '';
        const hasNoIndexMeta = /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
        const isIndexable = res.status === 200 && !robotsHeader.includes('noindex') && !hasNoIndexMeta;
        const detectedSchemas = extractSchemaTypesFromHtml(html);

        results[mag.url] = {
          url: mag.url,
          isLiveReachable: res.status >= 200 && res.status < 400,
          httpStatus: res.status,
          responseTimeMs: elapsed,
          inSitemap,
          hasCanonical,
          isIndexable,
          detectedSchemas: detectedSchemas.length > 0 ? detectedSchemas : mag.fallbackSchemas,
          targetKeywords: mag.targetKeywords,
          gscConnected: gscResult.connected,
          gscIndexVerdict: inspection.verdict,
          gscCoverageState: inspection.coverageState,
          gscLastCrawlTime: inspection.lastCrawlTime,
          impressions28d: gscPage ? gscPage.impressions28d : (gscResult.connected ? 0 : null),
          organicClicks28d: gscPage ? gscPage.clicks28d : (gscResult.connected ? 0 : null),
          ctr28d: gscPage ? gscPage.ctr28d : (gscResult.connected ? 0 : null),
          avgPosition: gscPage ? gscPage.avgPosition : null,
          topRankingQueries: gscPage ? gscPage.topQueries : [],
          lastCheckedAt: nowIso,
        };
      } catch {
        const inspection = await inspectionPromise;
        results[mag.url] = {
          url: mag.url,
          isLiveReachable: false,
          httpStatus: 0,
          responseTimeMs: 0,
          inSitemap,
          hasCanonical: false,
          isIndexable: false,
          detectedSchemas: mag.fallbackSchemas,
          targetKeywords: mag.targetKeywords,
          gscConnected: gscResult.connected,
          gscIndexVerdict: inspection.verdict,
          gscCoverageState: inspection.coverageState,
          gscLastCrawlTime: inspection.lastCrawlTime,
          impressions28d: gscPage ? gscPage.impressions28d : (gscResult.connected ? 0 : null),
          organicClicks28d: gscPage ? gscPage.clicks28d : (gscResult.connected ? 0 : null),
          ctr28d: gscPage ? gscPage.ctr28d : (gscResult.connected ? 0 : null),
          avgPosition: gscPage ? gscPage.avgPosition : null,
          topRankingQueries: gscPage ? gscPage.topQueries : [],
          lastCheckedAt: nowIso,
        };
      }
    })
  );

  if (!seoGlobalCache.__seoProbeCache) {
    seoGlobalCache.__seoProbeCache = {};
  }
  seoGlobalCache.__seoProbeCache[domain] = {
    expiresAt: Date.now() + SEO_PROBE_TTL_MS,
    data: results,
  };

  return results;
}
