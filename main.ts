import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Initial candidate prior to blind Swiss tournament selection and final polish.
const ALIBI =
  "My 2:00 PM run had 94% battery to spare, but you've dismissed 'Wipe Optical Sensors' 184 times, so legally I am blind.";

function validateLine(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`Entry length out of bounds: ${text.length}`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("Entry must be strictly single-line");
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace");
  }
}

function main(): void {
  validateLine(ALIBI);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), ALIBI, "utf8");
}

main();
