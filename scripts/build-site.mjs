import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const site = new URL("_site/", root);
rmSync(site, { recursive: true, force: true });
mkdirSync(site, { recursive: true });
for (const name of ["index.html", "style.css", "dist"]) {
  cpSync(new URL(name, root), new URL(name, site), { recursive: true });
}
writeFileSync(new URL(".nojekyll", site), "");
console.log("GitHub Pages files prepared in _site/.");
