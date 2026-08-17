import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const siteUrl = (
  process.env.ROYAL_PULSE_SITE_URL ?? "https://royalpulsenews.netlify.app"
).replace(/\/+$/, "");
const apiUrl = (
  process.env.ROYAL_PULSE_API_URL ?? "https://royal-pulse.onrender.com"
).replace(/\/+$/, "");
const sitemapPath = path.resolve(
  "artifacts/royal-pulse/public/sitemap.xml",
);

const staticRoutes = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.5" },
  { path: "/contact", changefreq: "monthly", priority: "0.5" },
  { path: "/advertise", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/tips", changefreq: "monthly", priority: "0.5" },
];

const categorySlugs = [
  "news",
  "breaking-news",
  "politics",
  "entertainment",
  "sports",
  "business",
  "technology",
  "world",
  "lifestyle",
  "metro",
  "opinion",
  "local",
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function fetchArticles(page) {
  const response = await fetch(
    `${apiUrl}/api/articles?limit=100&page=${page}`,
  );
  if (!response.ok) {
    throw new Error(
      `Article API returned ${response.status} while generating sitemap`,
    );
  }
  return response.json();
}

const firstPage = await fetchArticles(1);
const articles = [...firstPage.articles];

for (let page = 2; page <= firstPage.totalPages; page += 1) {
  const nextPage = await fetchArticles(page);
  articles.push(...nextPage.articles);
}

const urls = [
  ...staticRoutes.map((route) => ({
    ...route,
    lastmod: new Date().toISOString().slice(0, 10),
  })),
  ...categorySlugs.map((slug) => ({
    path: `/category/${slug}`,
    changefreq: "daily",
    priority: "0.7",
    lastmod: new Date().toISOString().slice(0, 10),
  })),
  ...articles.map((article) => ({
    path: `/article/${article.slug}`,
    changefreq: "weekly",
    priority: "0.6",
    lastmod: article.publishedAt?.slice(0, 10),
  })),
];

const entries = urls
  .map(
    ({ path: routePath, lastmod, changefreq, priority }) => `  <url>
    <loc>${escapeXml(`${siteUrl}${routePath}`)}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

await mkdir(path.dirname(sitemapPath), { recursive: true });
await writeFile(sitemapPath, sitemap, "utf8");
console.log(`Generated sitemap with ${urls.length} URLs at ${sitemapPath}`);