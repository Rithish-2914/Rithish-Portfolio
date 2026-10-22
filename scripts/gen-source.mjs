// Snapshots the section components into public/source.json for Source Mode.
// Runs before `dev` and `build`, so the code you see on the site is the code that shipped.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "src", "components", "sections");
const files = {};
let lines = 0;

for (const name of readdirSync(dir).filter((f) => f.endsWith(".tsx")).sort()) {
  const code = readFileSync(join(dir, name), "utf8").replace(/\r\n/g, "\n");
  const count = code.split("\n").length;
  lines += count;
  files[name.replace(/\.tsx$/, "")] = { path: `src/components/sections/${name}`, code, lines: count };
}

writeFileSync(join(process.cwd(), "public", "source.json"), JSON.stringify({ lines, files }));
console.log(`source.json: ${Object.keys(files).length} modules, ${lines} lines`);
