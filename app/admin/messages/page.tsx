import MessagesClient from "./page.client";

export default function AdminMessagesPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>
      <MessagesClient />
    </main>
  );
}
