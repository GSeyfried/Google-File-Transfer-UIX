import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import FolderViewer from '../components/FolderViewer';

export default function Dashboard() {
  const { data: session, status } = useSession({ required: true });
  const [portals, setPortals] = useState([]);
  const [form, setForm] = useState({ name: '', source: '', target: '', deleteOriginal: false });
  const [viewerFolder, setViewerFolder] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/portals').then(r => r.json()).then(setPortals);
    }
  }, [status]);

  if (status === 'loading') return <p>Loading...</p>;

  const createPortal = async (e) => {
    e.preventDefault();
    await fetch('/api/portals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', source: '', target: '', deleteOriginal: false });
    const updated = await fetch('/api/portals').then(r => r.json());
    setPortals(updated);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Signed in as {session.user.email} (<button onClick={() => signOut()}>Sign out</button>)</p>

      <h2>Create Portal</h2>
      <form onSubmit={createPortal} className="portal-form">
        <input
          placeholder="Portal Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Source Folder ID"
          value={form.source}
          onChange={e => setForm({ ...form, source: e.target.value })}
        />
        <input
          placeholder="Target Folder ID"
          value={form.target}
          onChange={e => setForm({ ...form, target: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={form.deleteOriginal}
            onChange={e => setForm({ ...form, deleteOriginal: e.target.checked })}
          />
          Delete original after transfer
        </label>
        <button type="submit">Create</button>
      </form>

      <h2>Existing Portals</h2>
      <ul className="portal-list">
        {portals.map((p, idx) => (
          <li key={idx} className="portal-item">
            <strong>{p.name}</strong> ({p.source} → {p.target})
            <label>
              <input
                type="checkbox"
                checked={p.deleteOriginal}
                readOnly
              />
              Delete original
            </label>
            <button onClick={() => fetch(`/api/portals/${encodeURIComponent(p.name)}/run`, { method: 'POST' })}>
              Run Now
            </button>
            <button onClick={() => setViewerFolder(p.source)}>View Source</button>
          </li>
        ))}
      </ul>
      <FolderViewer folderId={viewerFolder} onClose={() => setViewerFolder(null)} />
      <p><Link href="/">Home</Link></p>
    </div>
  );
}
