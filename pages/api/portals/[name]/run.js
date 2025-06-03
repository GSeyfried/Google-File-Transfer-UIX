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

function sampleFolder(id) {
  return {
    id,
    name: `Sample Folder ${id}`,
    children: [
      { id: `${id}-1`, name: 'Doc.txt', mimeType: 'text/plain' },
      {
        id: `${id}-2`,
        name: 'Subfolder',
        mimeType: 'application/vnd.google-apps.folder',
        children: [
          { id: `${id}-2-1`, name: 'Nested.txt', mimeType: 'text/plain' },
        ],
      },
    ],
  };
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.query;
    const portals = load();
    const idx = portals.findIndex(p => p.name === name);
    if (idx === -1) {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    const folderData = sampleFolder(portals[idx].source);
    portals[idx].cachedSource = folderData;
    portals[idx].lastRun = new Date().toISOString();
    save(portals);

    res.status(200).json({ ok: true, moved: folderData.children.length });
  } else {
    res.status(405).end();
  }
}
