import assert from "node:assert/strict";
import { randomBytes, randomInt } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const checkerPath = fileURLToPath(new URL("./check-public-release.mjs", import.meta.url));
const resumeName = "Vivekananda_Cherukupally_Public_Resume.pdf";
const resumeBytes = Buffer.from(
  "%PDF-1.4\nBT (Synthetic public resume test content) Tj ET\n%%EOF\n",
  "latin1",
);
const contactSheetPng = Buffer.from(
  "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",
  "base64",
);
const cleanPortfolioPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAlgAAABQAQAAAADt0TY1AAABdElEQVRYw+3WPU7DMBQAYCOQsqB67dS3MTOyvatwBMYOUVwkdh8hV2nloSNHwMUXSJTFkaw87IDoD2WwmwEhvyFRFOmT3o9fwmi6YNnKVrayla1sZeu/WI4TQb1/FCkWw3BFe856i7U8QgM2dMaSkdaiGK02WKfvYi3YjlY3iWWmtBo0L2wFz75eDVK/oYeqcGJNdsFErKX5+423mIBac+pX4n555QRDPYu3VKHvsB3mCLUqyM7x+unRVbegXuNzlEr7erkKoJaKbIV8Z12JIBP6CGbnLUve8o0Id+PKUkhImC8w5qe1pASLcWg/LemtdrS2qRYeWz3VGCzGMb5edMYavDWbyAo50uWWr9eXBSmWMXTURzRTWPzbKkWSJVWwDuYex7mnhLknVRiC7uA8YuPPI+dKbqMt7TNjHe33BNqwJ0DzdeyeIL+/aN3Rfn/hEPaXaEBHWqfRX/BN+8Wiv2k1E1qbCS2V/7+yla1sZStb2YqMD3TqeZ3kdaZ6AAAAAElFTkSuQmCC",
  "base64",
);

function runReleaseCheck(
  t,
  { assets = {}, extraPdfs = [], env = process.env } = {},
) {
  const root = mkdtempSync(join(tmpdir(), "public-release-check-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));

  const publicDir = join(root, "public");
  const distDir = join(root, "dist", "public");
  mkdirSync(publicDir, { recursive: true });
  mkdirSync(distDir, { recursive: true });
  writeFileSync(join(publicDir, resumeName), resumeBytes);
  writeFileSync(join(distDir, resumeName), resumeBytes);

  for (const [name, contents] of Object.entries(assets)) {
    const path = join(distDir, name);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, contents);
  }
  for (const name of extraPdfs) {
    writeFileSync(join(distDir, name), Buffer.from("%PDF-1.4\n"));
  }

  const result = spawnSync(
    process.execPath,
    [checkerPath, "--root", root],
    { encoding: "utf8", env },
  );
  assert.equal(result.error, undefined, "release checker should start");
  return {
    output: `${result.stdout ?? ""}${result.stderr ?? ""}`,
    status: result.status,
  };
}

function makeAnimatedContactGif(t) {
  const root = mkdtempSync(join(tmpdir(), "public-release-image-test-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));

  const firstFrame = join(root, "first-frame.png");
  const contactFrame = join(root, "contact-frame.png");
  const animatedImage = join(root, "animated-contact.gif");
  writeFileSync(firstFrame, cleanPortfolioPng);
  writeFileSync(contactFrame, contactSheetPng);

  const result = spawnSync(
    "magick",
    [
      "-delay",
      "100",
      firstFrame,
      "-delay",
      "100",
      contactFrame,
      "-loop",
      "0",
      animatedImage,
    ],
    { encoding: "utf8" },
  );
  assert.equal(result.error, undefined, "ImageMagick should start");
  assert.equal(result.status, 0, "animated image fixture should be generated");
  return readFileSync(animatedImage);
}

const contactCases = [
  {
    name: "email-like details",
    diagnostic: /email-like contact detail/u,
    makeValue: () =>
      `release-test-${randomBytes(8).toString("hex")}@example.invalid`,
  },
  {
    name: "phone-like details",
    diagnostic: /phone-like contact detail/u,
    makeValue: () => `+1-202-555-01${randomInt(10, 100)}`,
  },
  {
    name: "street-address-like details",
    diagnostic: /street-address-like contact detail/u,
    makeValue: () => `${randomInt(1000, 10000)} Synthetic Test Avenue`,
  },
];

for (const { name, diagnostic, makeValue } of contactCases) {
  test(`blocks release when built output contains ${name}`, (t) => {
    const value = makeValue();
    const { output, status } = runReleaseCheck(t, {
      assets: { "index.html": `<main>${value}</main>` },
    });

    assert.equal(status, 1, "private contact patterns must fail the release check");
    assert.match(output, diagnostic);
    assert.equal(
      output.includes(value),
      false,
      "release checker output must not disclose the generated test value",
    );
  });
}

test("blocks release when built output contains an unexpected PDF", (t) => {
  const { output, status } = runReleaseCheck(t, {
    extraPdfs: ["portfolio-attachment.pdf"],
  });

  assert.equal(status, 1, "unexpected PDF assets must fail the release check");
  assert.match(output, /unexpected PDF asset/u);
});

test("blocks release when a built raster image contains contact details", (t) => {
  const { output, status } = runReleaseCheck(t, {
    assets: { "images/contact-sheet.png": contactSheetPng },
  });

  assert.equal(status, 1, "private contact patterns in images must block release");
  assert.match(output, /images\/contact-sheet\.png.*email-like contact detail/u);
  assert.match(output, /images\/contact-sheet\.png.*phone-like contact detail/u);
  assert.match(
    output,
    /images\/contact-sheet\.png.*street-address-like contact detail/u,
  );
  for (const value of [
    "release-test@example.invalid",
    "+1 202 555 0171",
    "1234 Synthetic Avenue",
  ]) {
    assert.equal(
      output.includes(value),
      false,
      "release checker output must not disclose OCR text",
    );
  }
});

test("allows a raster image without private contact details", (t) => {
  const { output, status } = runReleaseCheck(t, {
    assets: { "images/portfolio.png": cleanPortfolioPng },
  });

  assert.equal(status, 0, "contact-free raster images should pass the release check");
  assert.match(output, /raster-image OCR/u);
});

test("blocks contact details in a raster image inlined into built text", (t) => {
  const dataUrl = `data:image/png;base64,${contactSheetPng.toString("base64")}`;
  const { output, status } = runReleaseCheck(t, {
    assets: { "index.html": `<img src="${dataUrl}" alt="portfolio">` },
  });

  assert.equal(status, 1, "contact details in inlined images must block release");
  assert.match(
    output,
    /index\.html \(embedded raster image\).*email-like contact detail/u,
  );
  assert.equal(output.includes("release-test@example.invalid"), false);
  assert.equal(output.includes("+1 202 555 0171"), false);
  assert.equal(output.includes("1234 Synthetic Avenue"), false);
});

test("blocks contact details shown only in a later animated image frame", (t) => {
  const { output, status } = runReleaseCheck(t, {
    assets: { "images/animated-contact.gif": makeAnimatedContactGif(t) },
  });

  assert.equal(status, 1, "every animated image frame must be inspected");
  assert.match(
    output,
    /images\/animated-contact\.gif.*email-like contact detail/u,
  );
  assert.match(
    output,
    /images\/animated-contact\.gif.*street-address-like contact detail/u,
  );
  assert.equal(output.includes("release-test@example.invalid"), false);
  assert.equal(output.includes("+1 202 555 0171"), false);
  assert.equal(output.includes("1234 Synthetic Avenue"), false);
});

test("fails closed when a built raster image cannot be inspected", (t) => {
  const { output, status } = runReleaseCheck(t, {
    assets: { "images/contact-sheet.png": contactSheetPng },
    env: { ...process.env, PATH: "" },
  });

  assert.equal(status, 1, "release must fail when image OCR is unavailable");
  assert.match(output, /images\/contact-sheet\.png.*OCR failed/u);
  assert.equal(output.includes("release-test@example.invalid"), false);
});
