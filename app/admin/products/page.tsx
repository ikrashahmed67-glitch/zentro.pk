'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { AuthGuard } from '@/components/auth-guard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AdminProductsPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('products').insert({
      name: form.name,
      description: form.description,
      price: Number(form.price),
      image: form.image,
      category: form.category,
      is_active: true,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Product added successfully');
      setForm({ name: '', description: '', price: '', image: '', category: '' });
    }

    setLoading(false);
  }

  return (
    <AuthGuard requiredRole="admin">
      <div className="max-w-xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Product name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <Input placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />

          <Input placeholder="Price" type="number" value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })} />

          <Input placeholder="Image URL" value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })} />

          <Input placeholder="Category" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })} />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Add Product'}
          </Button>
        </form>
      </div>
    </AuthGuard>
  );
}
