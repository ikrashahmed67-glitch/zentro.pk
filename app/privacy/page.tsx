export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: December 2024</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Zentro ("we", "us", "our", or "Company") operates the Zentro marketplace website
              and mobile application (collectively, the "Service"). This page informs you of our
              policies regarding the collection, use, and disclosure of personal data when you use
              our Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">2. Information Collection and Use</h2>
            <p className="text-gray-700 leading-relaxed">
              We collect several different types of information for various purposes to provide and
              improve our Service to you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Personal identification information (name, email, phone number, address)</li>
              <li>Payment information (securely processed through our payment providers)</li>
              <li>Browsing history and preferences</li>
              <li>Device information and IP address</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">3. Use of Data</h2>
            <p className="text-gray-700 leading-relaxed">
              Zentro uses the collected data for various purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so we can improve the Service</li>
              <li>To monitor the usage of the Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">4. Security of Data</h2>
            <p className="text-gray-700 leading-relaxed">
              The security of your data is important to us but remember that no method of transmission
              over the Internet or method of electronic storage is 100% secure. While we strive to use
              commercially acceptable means to protect your Personal Data, we cannot guarantee its
              absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">5. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the "Last updated" date at the
              top of this Privacy Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">6. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
              support@zentro.pk
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
