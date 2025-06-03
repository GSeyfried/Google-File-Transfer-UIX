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
  const { name } = req.query;
  const portals = load();
  const idx = portals.findIndex(p => p.name === name);
  if (idx === -1) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json(portals[idx]);
  } else if (req.method === 'DELETE') {
    portals.splice(idx, 1);
    save(portals);
    res.status(200).json({ ok: true });
  } else {
    res.status(405).end();
  }
}
