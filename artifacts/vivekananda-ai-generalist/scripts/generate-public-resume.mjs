import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Public-only resume content. Never derive this asset from the original private PDF.
const linkedin = "www.linkedin.com/in/vivekananda-cherukupally-396731379";
const github = "github.com/cherukupallyvivekananda76-oss";
const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "Vivekananda_Cherukupally_Public_Resume.pdf");

const escape = (text) => text.replace(/[^\x20-\x7E]/g, "-").replace(/([\\()])/g, "\\$1");
const commands = [];
function box(x, y, w, h, r, g, b) {
  commands.push(`${r} ${g} ${b} rg ${x} ${y} ${w} ${h} re f`);
}
function text(x, y, value, size = 9, font = "F1", color = "0.13 0.2 0.18") {
  commands.push(`${color} rg BT /${font} ${size} Tf ${x} ${y} Td (${escape(value)}) Tj ET`);
}
function section(label, y) {
  box(40, y + 10, 515, 0.7, 0.77, 0.82, 0.77);
  text(40, y - 6, label, 9, "F2", "0.13 0.42 0.32");
}

box(0, 0, 595, 842, 0.97, 0.98, 0.96);
box(0, 681, 595, 161, 0.06, 0.11, 0.10);
box(40, 807, 36, 3, 0.79, 0.95, 0.42);
text(40, 777, "VIVEKANANDA CHERUKUPALLY", 23, "F2", "0.94 0.97 0.94");
text(40, 753, "AI GENERALIST  /  ML ENGINEER (CONTRACT)", 10, "F2", "0.79 0.95 0.42");
text(40, 724, "Public profile: " + linkedin, 9, "F1", "0.79 0.86 0.81");
text(40, 708, "Selected work: " + github, 9, "F1", "0.79 0.86 0.81");

section("PROFILE", 660);
text(40, 631, "Builds practical AI tools, evaluates outputs, and improves the workflows around them.");

section("EXPERIENCE", 608);
text(40, 578, "ML Engineer (Contract)  -  Handshake AI", 11, "F2");
text(432, 578, "JUL 2026 - PRESENT", 8, "F1", "0.32 0.46 0.40");
text(40, 560, "Evaluates AI outputs for accuracy, relevance, consistency, and usability.");
text(40, 545, "Iterates prompt-based systems with feedback; builds and tests automation pipelines.");
text(40, 530, "Troubleshoots environments; works with Git/GitHub, Docker, and REST APIs.");

section("SELECTED PROJECT EVIDENCE", 505);
text(40, 476, "AI Accountant Agent", 10, "F2");
text(345, 476, "IN PROGRESS  /  MAR 2026 - PRESENT", 8, "F1", "0.32 0.46 0.40");
text(40, 460, "Developing an AI agent for financial tasks; compares outputs with hand calculations.");
text(40, 440, "Pinterest Affiliate Automation App", 10, "F2");
text(410, 440, "BUILT  /  MAY-JUN 2026", 8, "F1", "0.32 0.46 0.40");
text(40, 424, "Generates titles, descriptions and keywords; checks niche match and content relevance.");
text(40, 404, "AI Tutor", 10, "F2");
text(414, 404, "PROTOTYPE  /  SEP 2025", 8, "F1", "0.32 0.46 0.40");
text(40, 388, "A personalized-learning prototype using generative AI and an interface for learners.");
text(40, 368, "StadiumFlow", 10, "F2");
text(412, 368, "DESIGNED  /  MAR 2025", 8, "F1", "0.32 0.46 0.40");
text(40, 352, "A ticket-linked stadium navigation and services application design.");
text(40, 332, "Automated Tractor Prototype", 10, "F2");
text(40, 316, "Built for the college Project Expo; his first hardware project.");

section("EDUCATION & SKILLS", 291);
text(40, 262, "B.Tech, Computer Science & Engineering", 10, "F2");
text(40, 246, "Symbiosis Institute of Technology, Hyderabad  /  2025-2029");
text(40, 223, "Python, C++, C, JavaScript  /  Generative AI, LLMs, agents, prompt engineering");
text(40, 208, "Model evaluation, output validation, Pandas, NumPy, SQL fundamentals");
text(40, 193, "React, Node.js, REST APIs, Git, GitHub, Docker, Google AI Studio, Postman, n8n");

section("ACTIVITIES", 169);
text(40, 140, "Under 25 Summit volunteer: event coordination, participant and technical support.");
text(40, 125, "Technical presentations and speaking; Smart India, Open AI Virtual and Algorand hackathons.");
box(40, 73, 515, 0.7, 0.77, 0.82, 0.77);
text(40, 55, "Public resume. No private contact details or unverified outcome metrics included.", 8, "F1", "0.35 0.46 0.40");

const stream = commands.join("\n") + "\n";
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}endstream`,
];
let pdf = "%PDF-1.4\n";
const offsets = [0];
for (const [index, object] of objects.entries()) {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
}
const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const offset of offsets.slice(1)) pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, pdf);