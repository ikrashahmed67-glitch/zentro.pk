'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { getUserProfile } from '@/lib/auth';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AnalyticsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [sales, setSales] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    const profile = await getUserProfile();
    if (!profile || profile.role !== 'admin') {
      router.push('/');
      return;
    }

    const [
      salesData,
      usersData,
      productsData,
      ordersData,
    ] = await Promise.all([
      supabase.from('analytics_sales').select('*').order('date'),
      supabase.from('analytics_users').select('*').order('date'),
      supabase.from('analytics_products').select('*').order('date'),
      supabase.from('analytics_orders').select('*').order('date'),
    ]);

    setSales(salesData.data || []);
    setUsers(usersData.data || []);
    setProducts(productsData.data || []);
    setOrders(ordersData.data || []);

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-12 w-12 rounded-full border-b-2 border-black animate-spin" />
      </div>
    );
  }

  const totalRevenue = sales.reduce((s, x) => s + x.total_sales, 0);
  const totalOrders = sales.reduce((s, x) => s + x.total_orders, 0);
  const avgOrder = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;

  return (
    <div className="min-h-screen bg-[#F4F6F8] p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Button onClick={() => router.push('/admin')}>⬅ Back to Admin</Button>
      </div>

      {/* TOP METRICS */}
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        <Metric title="Total Revenue" value={`Rs. ${totalRevenue}`} />
        <Metric title="Total Orders" value={totalOrders} />
        <Metric title="Avg Order Value" value={`Rs. ${avgOrder}`} />
        <Metric title="Total Users" value={users.at(-1)?.total_users || 0} />
      </div>

      {/* SALES TREND */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sales}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total_sales"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* USERS + ORDERS */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={users}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line dataKey="new_users" stroke="#16a34a" />
                <Line dataKey="returning_users" stroke="#9333ea" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orders}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pending" fill="#f59e0b" />
                <Bar dataKey="completed" fill="#22c55e" />
                <Bar dataKey="cancelled" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* PRODUCTS */}
      <Card>
        <CardHeader>
          <CardTitle>Top Products Revenue</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={products}>
              <XAxis dataKey="product_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function Metric({ title, value }: any) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-bold">{value}</CardContent>
    </Card>
  );
}
