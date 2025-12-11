'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/lib/cart-context';
import { useState, useEffect } from 'react';
import { getCurrentUser, getUserProfile, signOut } from '@/lib/auth';
import type { Profile } from '@/lib/types';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadUser();
  }, [pathname]);

  async function loadUser() {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      const userProfile = await getUserProfile();
      setProfile(userProfile);
    } else {
      setProfile(null);
    }
  }

  async function handleSignOut() {
    await signOut();
    setUser(null);
    setProfile(null);
    router.push('/');
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#0B2545] text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-white">Zentro</span>
              <span className="text-[#FF7A2D]">.</span>
            </div>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="flex w-full">
              <Input
                type="search"
                placeholder="Search products..."
                className="rounded-r-none bg-white text-black border-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                className="rounded-l-none bg-[#FF7A2D] hover:bg-[#FF7A2D]/90"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <nav className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {profile?.name}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  {profile?.role === 'seller' && (
                    <DropdownMenuItem asChild>
                      <Link href="/seller">Seller Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  {profile?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" asChild className="text-white hover:bg-white/10">
                <Link href="/login">
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative text-white hover:bg-white/10"
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF7A2D] text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>
          </nav>
        </div>

        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="flex w-full">
            <Input
              type="search"
              placeholder="Search products..."
              className="rounded-r-none bg-white text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              className="rounded-l-none bg-[#FF7A2D] hover:bg-[#FF7A2D]/90"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
