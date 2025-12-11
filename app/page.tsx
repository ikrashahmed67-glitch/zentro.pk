'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { ProductCard } from '@/components/product-card';
import { CategoryCard } from '@/components/category-card';
import type { Product, Category } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const searchQuery = searchParams.search || '';
  const categoryId = searchParams.category || '';

  useEffect(() => {
    loadData();
  }, [searchQuery, categoryId]);

  async function loadData() {
    setLoading(true);
    try {
      let query = supabase.from('products').select('*');

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data: productsData, error: productsError } = await query;

      if (productsError) throw productsError;

      if (searchQuery) {
        const filtered = productsData?.filter((p: Product) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];
        setProducts(filtered);
      } else {
        setProducts(productsData || []);
      }

      const { data: categoriesData, error: categoriesError } =
        await supabase.from('categories').select('*');

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="bg-gradient-to-r from-[#0B2545] to-[#1a3a5f] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to Zentro</h1>
          <p className="text-lg text-gray-200 mb-6">
            Discover amazing products at unbeatable prices
          </p>
          <div className="flex gap-2 max-w-2xl">
            <Input
              type="search"
              placeholder="Search products..."
              defaultValue={searchQuery}
              className="bg-white text-black"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  window.location.href = `/?search=${encodeURIComponent(
                    e.currentTarget.value
                  )}`;
                }
              }}
            />
            <Button className="bg-[#FF7A2D] hover:bg-[#FF7A2D]/90">
              Search
            </Button>
          </div>
        </div>
      </div>

      {categories.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Featured Products'}
          </h2>
          {searchQuery && (
            <Link href="/" className="text-[#FF7A2D] hover:underline">
              Clear
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A2D]"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
            {searchQuery && (
              <p className="text-gray-400 mt-2">Try different search terms</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
