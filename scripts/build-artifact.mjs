/**
 * Builds the Claude Artifact version of the site from index.html.
 *
 * The Artifact host supplies its own <!doctype>/<html>/<head>/<body> wrapper,
 * so the published file must contain page content only. Everything else —
 * copy, styles, script — is shared with the Vercel build, so the two can't
 * drift apart.
 *
 *   node scripts/build-artifact.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(resolve(root, "index.html"), "utf8");

function grab(re, what) {
  const m = src.match(re);
  if (!m) throw new Error(`build-artifact: could not find ${what} in index.html`);
  return m;
}

const title = grab(/<title>[\s\S]*?<\/title>/i, "<title>")[0];
const fontLinks = [...src.matchAll(/<link\b[^>]*fonts\.(?:googleapis|gstatic)\.com[^>]*>/gi)].map(m => m[0]);
const style = grab(/<style>[\s\S]*?<\/style>/i, "<style> block")[0];
const body = grab(/<body[^>]*>([\s\S]*?)<\/body>/i, "<body> content")[1];

if (fontLinks.length === 0) throw new Error("build-artifact: no Google Fonts links found");

const out = [title, ...fontLinks, style, body.trim(), ""].join("\n");

// The wrapper tags must not survive into the artifact file.
for (const tag of [/<!doctype/i, /<html[\s>]/i, /<head[\s>]/i, /<body[\s>]/i]) {
  if (tag.test(out)) throw new Error(`build-artifact: wrapper tag ${tag} leaked into output`);
}

mkdirSync(resolve(root, "dist"), { recursive: true });
writeFileSync(resolve(root, "dist/artifact.html"), out);
console.log(`build-artifact: wrote dist/artifact.html (${out.length} bytes, ${fontLinks.length} font link(s))`);
