'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-12 pb-8 text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          {orderId && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Order ID</p>
              <p className="font-mono text-lg font-bold text-[#0B2545]">{orderId}</p>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2 text-sm">
            <p>
              <strong>What's next?</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>You'll receive a confirmation email shortly</li>
              <li>Your order will be processed and prepared for shipment</li>
              <li>We'll send you tracking information once it ships</li>
              <li>Visit your account to track your order status</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              asChild
              className="w-full bg-[#FF7A2D] hover:bg-[#FF7A2D]/90 h-12"
            >
              <Link href="/account">View Order</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
