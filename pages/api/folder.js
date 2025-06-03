export default function handler(req, res) {
  const sample = {
    id: req.query.id || 'root',
    name: 'Sample Folder',
    children: [
      { id: '1', name: 'Doc.txt', mimeType: 'text/plain' },
      {
        id: '2',
        name: 'Subfolder',
        mimeType: 'application/vnd.google-apps.folder',
        children: [
          { id: '2-1', name: 'Nested.txt', mimeType: 'text/plain' },
        ],
      },
    ],
  };
  res.status(200).json(sample);
}
