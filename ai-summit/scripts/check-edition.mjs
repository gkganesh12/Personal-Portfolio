// Validates src/edition.js before a build: shape, brand keys, colours.
// Run with `npm run check`; exits non-zero with a list of problems.
import { C } from "../src/theme.js";
import { edition, extraBrands, topics, statsData, raceLanes, watches } from "../src/edition.js";

const BUILT_IN = ["google", "openai", "meta", "anthropic", "nvidia", "mistral", "cohere", "reddit", "deepseek", "qwen"];
const brandKeys = new Set([...BUILT_IN, ...Object.keys(extraBrands)]);
const palette = new Set(Object.values(C));
const problems = [];
const fail = (where, msg) => problems.push(`${where}: ${msg}`);
const str = (v) => typeof v === "string" && v.trim().length > 0;
const brand = (where, b) => { if (b !== null && b !== undefined && !brandKeys.has(b)) fail(where, `unknown brand "${b}" (add it to extraBrands)`); };
const colour = (where, c) => { if (!palette.has(c)) fail(where, `colour ${JSON.stringify(c)} is not a C.* palette value`); };

for (const k of ["kind", "badge", "period", "short", "range", "asOf", "published", "marquee"]) {
  if (!str(edition[k])) fail("edition", `missing ${k}`);
}
for (const [k, v] of Object.entries(extraBrands)) {
  if (!str(v.name) || !/^#[0-9a-fA-F]{6}$/.test(v.color || "")) fail(`extraBrands.${k}`, "needs name and a #rrggbb color");
}

if (topics.length < 6 || topics.length > 16) fail("topics", `expected 6–16 topics, got ${topics.length}`);
topics.forEach((t, i) => {
  const w = `topics[${i}]`;
  if (t.num !== String(i + 1).padStart(2, "0")) fail(w, `num should be "${String(i + 1).padStart(2, "0")}", got "${t.num}"`);
  for (const k of ["title", "sub", "tag"]) if (!str(t[k])) fail(w, `missing ${k}`);
  colour(`${w}.color`, t.color);
  colour(`${w}.bg`, t.bg);
  if (!["featured", "normal"].includes(t.size)) fail(w, `size must be "featured" or "normal"`);
  if (!Array.isArray(t.points) || t.points.length < 4 || !t.points.every(str)) fail(w, "needs 4+ non-empty points");
  if (t.multiBrand) t.multiBrand.forEach((b) => brand(w, b)); else brand(w, t.brand);
});

if (statsData.length < 3 || statsData.length > 8) fail("statsData", `expected 3–8 stats, got ${statsData.length}`);
statsData.forEach((s, i) => {
  const w = `statsData[${i}]`;
  if (typeof s.end !== "number" || !Number.isFinite(s.end)) fail(w, "end must be a number");
  if (typeof s.prefix !== "string" || typeof s.suffix !== "string") fail(w, "prefix and suffix must be strings");
  if (!str(s.l)) fail(w, "missing l (label)");
  colour(`${w}.c`, s.c);
  brand(w, s.b);
});

if (raceLanes.length < 3 || raceLanes.length > 9) fail("raceLanes", `expected 3–9 lanes, got ${raceLanes.length}`);
raceLanes.forEach((r, i) => {
  const w = `raceLanes[${i}]`;
  for (const k of ["lane", "leader", "note"]) if (!str(r[k])) fail(w, `missing ${k}`);
  colour(`${w}.c`, r.c);
  brand(w, r.b);
});

if (watches.length < 3 || watches.length > 9) fail("watches", `expected 3–9 items, got ${watches.length}`);
watches.forEach((x, i) => {
  const w = `watches[${i}]`;
  if (!str(x.t)) fail(w, "missing t");
  colour(`${w}.c`, x.c);
  brand(w, x.b);
});

if (problems.length) {
  console.error(`edition.js has ${problems.length} problem(s):\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log(`edition.js OK — ${edition.badge}, ${edition.range}: ${topics.length} topics, ${statsData.length} stats, ${raceLanes.length} lanes, ${watches.length} watch items`);
