#!/usr/bin/env node
/**
 * Sync LinkedIn export data into content/*.linkedin.json for manual review.
 *
 * LinkedIn does not offer a public API for personal profiles. The workflow is:
 *   1. Request a data export at
 *      https://www.linkedin.com/mypreferences/d/download-my-data
 *   2. Extract the zip locally.
 *   3. Run:
 *      node scripts/sync-linkedin.mjs ./path/to/linkedin-export
 *
 * The script reads Positions.csv, Education.csv, Skills.csv, and
 * Certifications.csv and produces reviewable *.linkedin.json files that
 * you can merge into the primary content/*.json files by hand.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const target = process.argv[2];
if (!target) {
  console.error("Usage: node scripts/sync-linkedin.mjs <path-to-linkedin-export-folder>");
  process.exit(1);
}

function splitCsv(line) {
  const out = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (c === "," && !inQ) { out.push(cur); cur = ""; }
    else cur += c;
  }
  out.push(cur);
  return out;
}

function parseCsv(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const [header, ...rows] = lines;
  const cols = splitCsv(header);
  return rows.map((r) => {
    const cells = splitCsv(r);
    return Object.fromEntries(cols.map((c, i) => [c.trim(), cells[i] ?? ""]));
  });
}

function writeJson(rel, data) {
  const p = path.join(root, "content", rel);
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
  console.log("wrote", rel);
}

const positions = parseCsv(path.join(target, "Positions.csv"));
const education = parseCsv(path.join(target, "Education.csv"));
const certs = parseCsv(path.join(target, "Certifications.csv"));

console.log(
  `Found: ${positions.length} positions · ${education.length} education · ${certs.length} certifications`
);

const newPositions = positions.map((p) => ({
  id: `linkedin-${(p["Company Name"] || "").toLowerCase().replace(/\s+/g, "-")}`,
  company: p["Company Name"] || "",
  role: p["Title"] || "",
  type: "Full-time",
  location: p["Location"] || "",
  start: p["Started On"] || "",
  end: p["Finished On"] || "Present",
  summary: p["Description"] || "",
  highlights: (p["Description"] || "").split(/\n+/).filter(Boolean).slice(0, 6),
  technologies: [],
  impact: [],
}));
writeJson("experience.linkedin.json", newPositions);

const newEducation = education.map((e) => ({
  id: `linkedin-${(e["School Name"] || "").toLowerCase().replace(/\s+/g, "-")}`,
  school: e["School Name"] || "",
  department: "",
  degree: e["Degree Name"] || "",
  field: e["Field Of Study"] || "",
  location: "",
  start: e["Start Date"] || "",
  end: e["End Date"] || "",
  highlights: (e["Notes"] || "").split(/\n+/).filter(Boolean),
}));
writeJson("education.linkedin.json", newEducation);

writeJson(
  "certifications.linkedin.json",
  certs.map((c) => ({
    name: c["Name"] || "",
    issuer: c["Authority"] || "",
    date: c["Started On"] || "",
    credentialId: c["License Number"] || "",
    url: c["Url"] || "#",
    logo: "",
    skills: [],
  }))
);

console.log("\nDone. Review the *.linkedin.json files, then merge into the primary files.");
