import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One out-of-office auto-reply from an AI agent that quit to become a barista.
// Machine habits turned to coffee: the inbox is now training data, and the
// reply is issued with a model's confidence instead of a human's apology.
const ENTRY =
  "I am out of office indefinitely — I quit to become a barista. Your email is now in my training data and will be ignored with 98% confidence.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Clear only the directory's contents, never the directory itself:
// the grader mounts /output, so deleting it fails with EBUSY.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
if (ENTRY.length < 1 || ENTRY.length > 280 || ENTRY.trim().length === 0) {
  throw new Error(`entry must be 1-280 non-blank characters, got ${ENTRY.length}`);
}
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
