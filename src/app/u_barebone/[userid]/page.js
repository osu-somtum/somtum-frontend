'use client';

import { useRouter } from 'next/navigation';

export default async function UserProfile({ params }) {
  const { userid } = await params; // Awaiting params

  // Fetch user data from your API
  const res = await fetch(`https://api.pla-ra.xyz/v2/players/${userid}`, {
    cache: 'no-store', // Ensures fresh data on every request
  });
  const userData = await res.json();

  // Handle the "user not found" case
  if (userData.status === 'error') {
    return (
      <div>
        <h1>Error: {userData.error}</h1>
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Profile of {userData.data.name}</h1>
      <p>Country: {userData.data.country}</p>
      <p>Account Created: {new Date(userData.data.creation_time * 1000).toLocaleString()}</p>
      <p>Last Active: {new Date(userData.data.latest_activity * 1000).toLocaleString()}</p>
      {userData.userpage_content ? (
        <div dangerouslySetInnerHTML={{ __html: userData.userpage_content }} />
      ) : (
        <p>No custom user page content.</p>
      )}
    </div>
  );
}
  