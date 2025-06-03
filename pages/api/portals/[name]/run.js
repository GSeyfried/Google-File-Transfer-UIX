export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.query;
    // placeholder for actual transfer logic
    res.status(200).json({ ok: true, message: `Run triggered for ${name}` });
  } else {
    res.status(405).end();
  }
}
