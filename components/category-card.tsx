import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import type { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/?category=${category.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg cursor-pointer">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#0B2545] to-[#1a3a5f]">
          <Image
            src={category.image || '/placeholder.png'}
            alt={category.name}
            fill
            className="object-cover opacity-70 transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-xl font-bold">{category.name}</h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}
