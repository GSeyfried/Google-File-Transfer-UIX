import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Internal File Portal</h1>
      {session ? (
        <>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
          <p><Link href="/dashboard">Go to Dashboard</Link></p>
        </>
      ) : (
        <button onClick={() => signIn()}>Sign in with Google</button>
      )}
    </div>
  );
}
