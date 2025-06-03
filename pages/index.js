import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Internal File Portal</h1>
      <p><Link href="/dashboard">Go to Dashboard</Link></p>
    </div>
  );
}
