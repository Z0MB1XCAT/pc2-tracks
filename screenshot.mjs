// Screenshot a page with headless Edge/Chrome (no extra packages needed).
//   node screenshot.mjs http://localhost:3000 [label] [width] [height]
// Saves to "./temporary screenshots/screenshot-N[-label].png" (auto-numbered, never overwritten).
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const [url = 'http://localhost:3000', label = '', width = '1440', height = '2600'] = process.argv.slice(2);
const browsers = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
];
const browser = browsers.find(existsSync);
if (!browser) { console.error('No Edge or Chrome found.'); process.exit(1); }

const dir = resolve('temporary screenshots');
mkdirSync(dir, { recursive: true });
const n = readdirSync(dir).map(f => +(/^screenshot-(\d+)/.exec(f)?.[1] ?? 0)).reduce((a, b) => Math.max(a, b), 0) + 1;
const out = join(dir, `screenshot-${n}${label ? '-' + label : ''}.png`);
// Headless Edge/Chrome will not make a window narrower than ~500 px, so phone widths are rendered inside an iframe
// of exactly that width (a real phone-sized viewport for the page).
const MIN = 500;
let target = url;
if (+width < MIN) {   // needs serve.mjs running (it serves the /__frame wrapper)
  const u = new URL(url);
  target = `${u.origin}/__frame?w=${width}&h=${height}&src=${encodeURIComponent(u.pathname + u.search)}`;
}
execFileSync(browser, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${Math.max(+width, MIN)},${height}`,
  '--virtual-time-budget=4000', `--screenshot=${out}`, target], { stdio: 'ignore' });
console.log(out);
