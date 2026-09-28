import {
  readFileSync,
  readdirSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const defaultProjectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicResumeName = "Vivekananda_Cherukupally_Public_Resume.pdf";
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".map",
  ".svg",
  ".txt",
  ".webmanifest",
  ".xml",
]);

const privateContactPatterns = [
  {
    name: "email-like contact detail",
    expression:
      /\b[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+\b/iu,
  },
  {
    name: "phone-like contact detail",
    expression: /(?<!\d)\+?(?:\d[\s().-]?){9,14}\d(?!\d)/u,
  },
  {
    name: "street-address-like contact detail",
    expression:
      /\b\d{1,6}\s+(?:[A-Z0-9.'-]+\s+){0,5}(?:street|st|road|rd|avenue|ave|boulevard|blvd|lane|ln|drive|dr|court|ct|way|place|pl)\b/iu,
  },
];

export function checkPublicRelease(root = defaultProjectRoot) {
  const projectRoot = resolve(root);
  const publicDir = join(projectRoot, "public");
  const distDir = join(projectRoot, "dist", "public");
  const errors = [];

  function fail(message) {
    errors.push(message);
  }

  function listFiles(directory) {
    let entries;
    try {
      entries = readdirSync(directory, { withFileTypes: true });
    } catch {
      throw new Error(`required build directory is missing: ${relative(projectRoot, directory)}`);
    }

    return entries.flatMap((entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return listFiles(path);
      if (entry.isFile()) return [path];
      return [];
    });
  }

  function isPdf(path) {
    const header = readFileSync(path).subarray(0, 5).toString("ascii");
    return path.toLowerCase().endsWith(".pdf") || header === "%PDF-";
  }

  function verifyPdfAllowlist(directory) {
    const files = listFiles(directory);
    const pdfs = files.filter(isPdf);
    const expected = join(directory, publicResumeName);
    const unexpected = pdfs.filter((path) => path !== expected);

    if (unexpected.length > 0) {
      fail(
        `${relative(projectRoot, directory)} contains an unexpected PDF asset; only the generated public resume may be shipped.`,
      );
    }
    if (!pdfs.includes(expected)) {
      fail(`${relative(projectRoot, directory)} is missing the generated public resume PDF.`);
    }

    return pdfs.includes(expected) ? expected : null;
  }

  function decodePdfLiteral(value) {
    return value.replace(
      /\\(?:([0-7]{1,3})|([nrtbf()\\])|(\r?\n)|(.))/gs,
      (_match, octal, escaped, continuation, fallback) => {
        if (octal) return String.fromCharCode(Number.parseInt(octal, 8));
        if (continuation) return "";
        if (escaped) {
          return (
            { n: "\n", r: "\r", t: "\t", b: "\b", f: "\f" }[escaped] ??
            escaped
          );
        }
        return fallback ?? "";
      },
    );
  }

  function extractGeneratedPdfText(pdfPath) {
    const pdf = readFileSync(pdfPath).toString("latin1");
    const strings = [];
    const textShowOperator = /\(((?:\\[\s\S]|[^\\)])*)\)\s*Tj\b/g;
    for (const match of pdf.matchAll(textShowOperator)) {
      strings.push(decodePdfLiteral(match[1]));
    }
    return strings.join("\n");
  }

  function findContactPattern(text, { allowUnformattedPhone = true } = {}) {
    for (const pattern of privateContactPatterns) {
      const match = pattern.expression.exec(text);
      if (!match) continue;

      if (pattern.name === "phone-like contact detail" && !allowUnformattedPhone) {
        const isFormatted = /[+\s().-]/u.test(match[0]);
        const contextStart = Math.max(0, match.index - 48);
        const contextEnd = Math.min(text.length, match.index + match[0].length + 48);
        const hasPhoneLabel =
          /\b(?:phone|mobile|telephone|tel|call|contact)\b/iu.test(
            text.slice(contextStart, contextEnd),
          );
        if (!isFormatted && !hasPhoneLabel) continue;
      }

      return pattern;
    }
    return undefined;
  }

  function javascriptStringLiterals(source) {
    const strings = [];
    const stringLiteral = /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*?\1/gs;
    for (const match of source.matchAll(stringLiteral)) {
      strings.push(match[0].slice(1, -1));
    }
    return strings;
  }

  function scanTextFile(path) {
    const content = readFileSync(path);
    // Restrict scanning to text outputs so arbitrary binary assets are not
    // interpreted as text. PDFs are checked separately after extracting text.
    const extension = path.slice(path.lastIndexOf(".")).toLowerCase();
    if (!textExtensions.has(extension)) return;

    const source = content.toString("utf8");
    const scanUnits = extension === ".js" ? javascriptStringLiterals(source) : [source];
    for (const unit of scanUnits) {
      const match = findContactPattern(unit, {
        allowUnformattedPhone: extension !== ".js" || unit.length <= 128,
      });
      if (match) {
        fail(
          `${relative(projectRoot, path)} contains a private-contact pattern (${match.name}); remove private contact details before release.`,
        );
        return;
      }
    }
  }

  const publicPdf = verifyPdfAllowlist(publicDir);
  const builtPdf = verifyPdfAllowlist(distDir);

  if (publicPdf && builtPdf) {
    const publicBytes = readFileSync(publicPdf);
    const builtBytes = readFileSync(builtPdf);
    if (!publicBytes.equals(builtBytes)) {
      fail("the built public resume differs from the generated public resume.");
    }

    const extractedText = extractGeneratedPdfText(builtPdf);
    if (extractedText.trim().length === 0) {
      fail("could not extract text from the generated public resume PDF.");
    } else {
      const match = findContactPattern(extractedText);
      if (match) {
        fail(
          `the generated public resume PDF contains a private-contact pattern (${match.name}); remove private contact details before release.`,
        );
      }
    }
  }

  for (const path of listFiles(distDir)) {
    if (path !== builtPdf) scanTextFile(path);
  }

  return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  let root = defaultProjectRoot;
  if (args.length > 0) {
    if (args.length !== 2 || args[0] !== "--root" || !args[1]) {
      console.error("Usage: node check-public-release.mjs [--root <project-root>]");
      process.exitCode = 2;
    } else {
      root = args[1];
    }
  }

  if (!process.exitCode) {
    const errors = checkPublicRelease(root);
    if (errors.length > 0) {
      for (const error of errors) {
        console.error(`Public release check failed: ${error}`);
      }
      process.exitCode = 1;
    } else {
      console.log(
        "Public release check passed: built site and extracted resume text contain no private contact patterns; no extra PDFs are present.",
      );
    }
  }
}
