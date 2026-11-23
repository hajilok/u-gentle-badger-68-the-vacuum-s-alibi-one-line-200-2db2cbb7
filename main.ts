import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ALIBI =
  "I aborted that corner at 10:00 with 94% battery; my cliff sensor calls the floor sag structural failure, your $3,200 lease calls it pre-war charm.";

function assertValidEntry(text: string): void {
  const utf8Bytes = Buffer.byteLength(text, "utf8");
  const codePoints = Array.from(text).length;
  if (codePoints < 1 || codePoints > 200 || utf8Bytes < 1 || utf8Bytes > 200) {
    throw new Error(`Entry length out of bounds: ${codePoints} chars / ${utf8Bytes} bytes`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("Entry must be strictly single-line with no CR/LF characters");
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not consist only of whitespace");
  }
}

function main(): void {
  assertValidEntry(ALIBI);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), ALIBI, "utf8");
}

main();
