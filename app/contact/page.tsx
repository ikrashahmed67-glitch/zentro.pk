'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from('contact_messages').insert({
      full_name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    if (error) {
      console.error(error);
      toast.error('Failed to send message');
    } else {
      toast.success('Message sent! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }

    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-xl text-gray-600">
              We'd love to hear from you. Let us know how we can help!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6 flex gap-4">
                  <MapPin className="h-6 w-6 text-[#FF7A2D] mt-1" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600">Karachi, Pakistan</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 flex gap-4">
                  <Phone className="h-6 w-6 text-[#FF7A2D] mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+92 300 1234567</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 flex gap-4">
                  <Mail className="h-6 w-6 text-[#FF7A2D] mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">support@zentro.pk</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 flex gap-4">
                  <Clock className="h-6 w-6 text-[#FF7A2D] mt-1" />
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="text-gray-600">Mon - Fri: 9 AM - 6 PM</p>
                    <p className="text-gray-600">Sat - Sun: 10 AM - 4 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />

                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />

                  <Input
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                  />

                  <Textarea
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#FF7A2D]"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
