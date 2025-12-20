'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

type Message = {
  id: string;
  full_name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
};

export default function MessagesClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  }

  async function deleteMessage(id: string) {
    await supabase.from('contact_messages').delete().eq('id', id);
    fetchMessages();
  }

  if (loading) return <p>Loading messages...</p>;

  if (messages.length === 0) {
    return <p>No messages yet.</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="border rounded p-4">
          <p><strong>Name:</strong> {msg.full_name}</p>
          <p><strong>Email:</strong> {msg.email}</p>
          <p><strong>Subject:</strong> {msg.subject || '-'}</p>
          <p className="mt-2">{msg.message}</p>

          <div className="flex gap-2 mt-3">
            <Button
              variant="destructive"
              onClick={() => deleteMessage(msg.id)}
            >
              Delete
            </Button>

            <a
              href={`mailto:${msg.email}?subject=Reply`}
              className="text-sm underline"
            >
              Reply via Email
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
