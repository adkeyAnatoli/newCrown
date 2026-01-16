import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Try to load sharp from node_modules or use npx-installed version
let sharp;
let shouldCleanup = false;
try {
  sharp = require("sharp");
} catch (e) {
  // If not found, try to install it temporarily
  console.log("Installing sharp temporarily...");
  try {
    execSync("npm install --no-save sharp", { stdio: "inherit", cwd: process.cwd() });
    sharp = require("sharp");
    shouldCleanup = true;
  } catch (installErr) {
    console.error("Failed to install sharp:", installErr.message);
    process.exit(1);
  }
}

const ROOT = process.cwd();

async function optimizeWebp(relPath, { quality }) {
  const absPath = path.join(ROOT, relPath);
  const input = await fs.readFile(absPath);

  const image = sharp(input, { animated: true });
  const meta = await image.metadata();

  const output = await image
    .webp({
      quality,
      effort: 6,
      // keep alpha sane if present
      alphaQuality: 80,
    })
    .toBuffer();

  const inBytes = input.byteLength;
  const outBytes = output.byteLength;

  if (outBytes >= inBytes) {
    console.log(
      `[skip] ${relPath} (${(inBytes / 1024).toFixed(1)}KiB) -> ${(outBytes / 1024).toFixed(1)}KiB (no gain)`
    );
    return { relPath, meta, inBytes, outBytes, changed: false };
  }

  await fs.writeFile(absPath, output);
  console.log(
    `[ok]   ${relPath} ${meta.width ?? "?"}x${meta.height ?? "?"} ${(inBytes / 1024).toFixed(1)}KiB -> ${(outBytes / 1024).toFixed(1)}KiB`
  );
  return { relPath, meta, inBytes, outBytes, changed: true };
}

async function main() {
  await optimizeWebp("public/sectionImg/slot1-mobile.webp", { quality: 60 });
  // optional: keep desktop hero a bit higher quality
  await optimizeWebp("public/sectionImg/slot1.webp", { quality: 75 });

  // App section image: Lighthouse reports it's larger than displayed.
  // Resize down to displayed size 220x255 (Lighthouse reports this as actual display size).
  const appMobilePath = "public/sectionImg/slot4-mobile.webp";
  const appMobileInput = await fs.readFile(path.join(ROOT, appMobilePath));
  const appMobileOut = await sharp(appMobileInput, { animated: true })
    .resize({ width: 220, height: 255, fit: "contain", withoutEnlargement: true })
    .webp({ quality: 60, effort: 6, alphaQuality: 80 })
    .toBuffer();
  if (appMobileOut.byteLength < appMobileInput.byteLength) {
    await fs.writeFile(path.join(ROOT, appMobilePath), appMobileOut);
    console.log(
      `[ok]   ${appMobilePath} resized ${(appMobileInput.byteLength / 1024).toFixed(1)}KiB -> ${(appMobileOut.byteLength / 1024).toFixed(1)}KiB`
    );
  } else {
    console.log(
      `[skip] ${appMobilePath} ${(appMobileInput.byteLength / 1024).toFixed(1)}KiB -> ${(appMobileOut.byteLength / 1024).toFixed(1)}KiB (no gain)`
    );
  }
}

main()
  .then(() => {
    // Clean up sharp if it was installed temporarily
    if (shouldCleanup) {
      try {
        execSync("npm uninstall sharp", { stdio: "ignore", cwd: process.cwd() });
      } catch {}
    }
  })
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  });
