'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { getUserProfile } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'orders' | 'products' | 'users'>('orders');

  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [messagesCount, setMessagesCount] = useState(0);

  useEffect(() => {
    loadAdmin();
  }, []);

  async function loadAdmin() {
    const profile = await getUserProfile();
    if (!profile || profile.role !== 'admin') {
      router.push('/');
      return;
    }

    const [
      ordersRes,
      productsRes,
      usersRes,
      messagesRes,
    ] = await Promise.all([
      supabase.from('orders').select('*').eq('is_deleted', false),
      supabase.from('products').select('*'),
      supabase.from('profiles').select('*'),
      supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true }),
    ]);

    if (ordersRes.data) setOrders(ordersRes.data);
    if (productsRes.data) setProducts(productsRes.data);
    if (usersRes.data) setUsers(usersRes.data);
    if (messagesRes.count !== null)
      setMessagesCount(messagesRes.count);

    setLoading(false);
  }

  async function updateOrderStatus(id: string, status: string) {
    await supabase.from('orders').update({ status }).eq('id', id);
    loadAdmin();
  }

  async function deleteOrder(id: string) {
    await supabase.from('orders').update({ is_deleted: true }).eq('id', id);
    loadAdmin();
  }

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-3">
          <Button onClick={() => router.push('/admin/analytics')}>
            📊 Analytics
          </Button>

          <Button onClick={() => router.push('/admin/messages')}>
            📩 Messages ({messagesCount})
          </Button>
        </div>
      </div>

      {/* TABS */}
      <Tabs value={tab} onValueChange={v => setTab(v as any)}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        {/* ORDERS */}
        <TabsContent value="orders">
          {orders.map(o => (
            <Card key={o.id} className="mb-3">
              <CardContent className="grid grid-cols-6 gap-3 pt-4 text-sm items-center">
                <span>{o.id.slice(0, 6)}...</span>
                <span>Rs. {o.total}</span>

                <select
                  value={o.status}
                  onChange={e =>
                    updateOrderStatus(o.id, e.target.value)
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option>pending</option>
                  <option>processing</option>
                  <option>completed</option>
                  <option>cancelled</option>
                </select>

                <span>{o.payment_status}</span>
                <span>{o.items?.length || 0} items</span>

                <Button
                  variant="destructive"
                  onClick={() => deleteOrder(o.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* PRODUCTS */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 font-medium">
                Total Products: {products.length}
              </p>

              <table className="w-full text-sm border">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Price</th>
                    <th className="p-2 text-left">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b">
                      <td className="p-2">{p.name}</td>
                      <td className="p-2">Rs. {p.price}</td>
                      <td className="p-2">{p.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* USERS */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 font-medium">
                Total Users: {users.length}
              </p>

              <table className="w-full text-sm border">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b">
                      <td className="p-2">{u.name}</td>
                      <td className="p-2">{u.email}</td>
                      <td className="p-2 capitalize">{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
