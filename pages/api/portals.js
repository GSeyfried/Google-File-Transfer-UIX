import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'portals.json');

function load() {
  if (!fs.existsSync(dataFile)) return [];
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function save(portals) {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });
  fs.writeFileSync(dataFile, JSON.stringify(portals, null, 2));
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(load());
  } else if (req.method === 'POST') {
    const portals = load();
    portals.push({ source: req.body.source, target: req.body.target });
    save(portals);
    res.status(201).json({ ok: true });
  } else {
    res.status(405).end();
  }
}
