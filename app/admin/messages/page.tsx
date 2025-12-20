'use client';

import dynamic from 'next/dynamic';

const AdminMessagesClient = dynamic(
  () => import('./page.client'),
  { ssr: false }
);

export default function AdminMessagesPage() {
  return <AdminMessagesClient />;
}
