'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getUserProfile } from '@/lib/auth';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import type { Product, Profile } from '@/lib/types';
import { toast } from 'sonner';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function SellerPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    category_id: '',
  });

  const router = useRouter();

  useEffect(() => {
    loadSellerData();
  }, []);

  async function loadSellerData() {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/login');
        return;
      }

      setUser(currentUser);

      const userProfile = await getUserProfile();
      if (!userProfile || (userProfile.role !== 'seller' && userProfile.role !== 'admin')) {
        router.push('/');
        return;
      }

      setProfile(userProfile);

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', currentUser.id);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading seller data:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveProduct() {
    if (!user) return;

    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        description: formData.description,
        image: formData.image,
        category_id: formData.category_id || null,
        seller_id: user.id,
      };

      if (editingId) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Product updated successfully!');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        toast.success('Product added successfully!');
      }

      setFormData({
        name: '',
        price: '',
        stock: '',
        description: '',
        image: '',
        category_id: '',
      });
      setShowForm(false);
      setEditingId(null);
      loadSellerData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save product');
    }
  }

  async function handleDeleteProduct(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Product deleted successfully!');
      loadSellerData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete product');
    }
  }

  function handleEditProduct(product: Product) {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      image: product.image,
      category_id: product.category_id || '',
    });
    setEditingId(product.id);
    setShowForm(true);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A2D]"></div>
      </div>
    );
  }

  const totalSales = products.reduce((sum, p) => sum + p.price * (100 - p.stock), 0);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <Button
            onClick={() => {
              setFormData({
                name: '',
                price: '',
                stock: '',
                description: '',
                image: '',
                category_id: '',
              });
              setEditingId(null);
              setShowForm(true);
            }}
            className="bg-[#FF7A2D] hover:bg-[#FF7A2D]/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{products.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Inventory Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Rs. {totalSales.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Average Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                Rs. {products.length > 0
                  ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toLocaleString('en-US', {
                    maximumFractionDigits: 0,
                  })
                  : 0}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {products.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500 mb-4">You haven't added any products yet</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-[#FF7A2D] hover:bg-[#FF7A2D]/90"
                >
                  Add Your First Product
                </Button>
              </CardContent>
            </Card>
          ) : (
            products.map((product) => (
              <Card key={product.id}>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-sm text-gray-600">Product</p>
                      <p className="font-medium">{product.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="font-bold">Rs. {product.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Stock</p>
                      <p>{product.stock} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingId ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter product name"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter product description"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSaveProduct}
                className="flex-1 bg-[#FF7A2D] hover:bg-[#FF7A2D]/90"
              >
                {editingId ? 'Update' : 'Add'} Product
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
