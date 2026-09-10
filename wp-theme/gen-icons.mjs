// Generates wp-theme/dragonfly/parts/icons.php from lucide-react's icon modules.
// Run: node wp-theme/gen-icons.mjs   (from the repo root)
import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const names = ["ArrowRight","Building2","CheckCircle","ChevronLeft","ChevronRight","Cpu","Eye","EyeOff","FileText","Hotel","Landmark","Lock","Mail","MapPin","Menu","Shield","Store","TreePine","TrendingUp","Warehouse","X","Zap"];
const dir = "node_modules/lucide-react/dist/esm/icons/";
const kebab = (s) => s.replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();

async function iconNode(file) {
  const src = readFileSync(dir + file, "utf8");
  const alias = src.match(/export \{ default \} from '\.\/([^']+)'/);
  if (alias) return iconNode(alias[1]);
  const mod = await import(pathToFileURL(dir + file).href);
  return mod.__iconNode;
}

const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
let php = "<?php\n/**\n * Inline SVG icon bodies keyed by kebab-case name. Generated from lucide-react v1.14.0 by wp-theme/gen-icons.mjs. Do not edit by hand.\n * Wrapped in an <svg> by dfi_icon() in inc/helpers.php.\n */\nreturn array(\n";
for (const n of names) {
  const k = kebab(n);
  const node = await iconNode(k + ".mjs");
  const body = node.map(([tag, attrs]) => {
    const a = Object.entries(attrs).filter(([key]) => key !== "key").map(([key, v]) => `${key}="${esc(v)}"`).join(" ");
    return `<${tag} ${a}/>`;
  }).join("");
  php += `\t'${k}' => '${body.replace(/'/g, "\'")}',\n`;
}
php += ");\n";
writeFileSync("wp-theme/dragonfly/parts/icons.php", php);
console.log("wrote", names.length, "icons");
