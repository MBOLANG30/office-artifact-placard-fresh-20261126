import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Keyboard, c. 2015. Plastic, dust, crumbs. Oracle of the open-plan temple; its missing keys spell the names of the departed. Excavated, desk 42.";

// Gate from RULES.txt: UTF-8 text of 1 to 180 characters, not only whitespace.
if (LINE.length < 1 || LINE.length > 180 || LINE.trim().length === 0) {
  throw new Error(`placard fails the gate: ${LINE.length} chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
const back = readFileSync(target, "utf8");
if (back !== LINE) {
  throw new Error(
    `entry.txt mismatch: wrote ${LINE.length} chars, read back ${back.length} chars`,
  );
}
