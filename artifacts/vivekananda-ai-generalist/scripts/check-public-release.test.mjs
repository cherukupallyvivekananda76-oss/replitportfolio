import assert from "node:assert/strict";
import { randomBytes, randomInt } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
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

function runReleaseCheck(t, { assets = {}, extraPdfs = [] } = {}) {
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
    { encoding: "utf8" },
  );
  assert.equal(result.error, undefined, "release checker should start");
  return {
    output: `${result.stdout ?? ""}${result.stderr ?? ""}`,
    status: result.status,
  };
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