import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const result = spawnSync(process.execPath, [
  "node_modules/typescript/bin/tsc", "--strict", "--noEmit", "--pretty", "false",
  "--target", "ES2020", "examples/intentional-errors.ts",
], { cwd: root, encoding: "utf8" });
if (result.error) throw result.error;
const output = result.stdout + result.stderr;
const codes = [...output.matchAll(/error (TS\d+):/g)].map((match) => match[1]);
if (result.status !== 2 || codes.length !== 2 || !codes.includes("TS2322") || !codes.includes("TS7006")) {
  console.error(output);
  throw new Error("Expected exactly the two assignment errors: TS2322 and TS7006.");
}
mkdirSync(new URL("../docs/", import.meta.url), { recursive: true });
writeFileSync(new URL("../docs/compiler-errors.txt", import.meta.url), output);
console.log(output.trim());
console.log("Verified exactly two intentional errors. The application build excludes this example.");
