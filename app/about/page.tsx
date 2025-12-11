import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">About Zentro</h1>
            <p className="text-xl text-gray-600">
              Your trusted marketplace for quality products in Pakistan
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                At Zentro, we're committed to revolutionizing online shopping in Pakistan.
                We believe in making quality products accessible to everyone while supporting
                local sellers and entrepreneurs. Our platform is designed to be fast, secure,
                and user-friendly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Why Choose Zentro?</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-[#FF7A2D] font-bold">✓</span>
                  <span>Wide selection of products from verified sellers</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FF7A2D] font-bold">✓</span>
                  <span>Secure and reliable payment options</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FF7A2D] font-bold">✓</span>
                  <span>Fast and free shipping on most orders</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FF7A2D] font-bold">✓</span>
                  <span>24/7 customer support</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FF7A2D] font-bold">✓</span>
                  <span>Easy returns and refunds</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-2">Trust</h3>
                  <p className="text-gray-600">
                    We prioritize transparency and honest dealings
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-2">Quality</h3>
                  <p className="text-gray-600">
                    Only verified products from trusted sellers
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-2">Innovation</h3>
                  <p className="text-gray-600">
                    Continuously improving the shopping experience
                  </p>
                </div>
              </div>
            </section>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Contact Our Team</h3>
              <p className="text-gray-700 mb-4">
                Have questions? We're here to help!
              </p>
              <Button asChild className="bg-[#FF7A2D] hover:bg-[#FF7A2D]/90">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
