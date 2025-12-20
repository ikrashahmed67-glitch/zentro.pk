'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminMessagesClient() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      const { data } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      setMessages(data || []);
      setLoading(false);
    }

    loadMessages();
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading messages...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Contact Messages
      </h1>

      {messages.length === 0 && <p>No messages yet.</p>}

      {messages.map((msg) => (
        <div
          key={msg.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: 6,
            padding: 12,
            marginBottom: 12,
            background: '#fff',
          }}
        >
          <p><b>Name:</b> {msg.name}</p>
          <p><b>Email:</b> {msg.email}</p>
          <p><b>Subject:</b> {msg.subject}</p>
          <p style={{ marginTop: 8 }}>{msg.message}</p>

          <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
            {new Date(msg.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
