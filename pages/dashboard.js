import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession({ required: true });
  const [portals, setPortals] = useState([]);
  const [form, setForm] = useState({ source: '', target: '' });

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
    setForm({ source: '', target: '' });
    const updated = await fetch('/api/portals').then(r => r.json());
    setPortals(updated);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Signed in as {session.user.email} (<button onClick={() => signOut()}>Sign out</button>)</p>

      <h2>Create Portal</h2>
      <form onSubmit={createPortal}>
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
        <button type="submit">Create</button>
      </form>

      <h2>Existing Portals</h2>
      <ul>
        {portals.map((p, idx) => (
          <li key={idx}>{p.source} → {p.target}</li>
        ))}
      </ul>
      <p><Link href="/">Home</Link></p>
    </div>
  );
}
