import React from 'react';

const TermsConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
      
      <div className="prose prose-indigo">
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using ZocMLM, you agree to be bound by these Terms and Conditions and our
          Privacy Policy. If you disagree with any part of the terms, you may not access the service.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or
          software) on ZocMLM for personal, non-commercial transitory viewing only.
        </p>

        <h2>3. User Accounts</h2>
        <ul>
          <li>You must be 18 years or older to use this service</li>
          <li>You are responsible for maintaining the confidentiality of your account</li>
          <li>You are responsible for all activities under your account</li>
          <li>You must notify us immediately of any unauthorized use</li>
        </ul>

        <h2>4. Prohibited Activities</h2>
        <p>You may not:</p>
        <ul>
          <li>Use the service for any illegal purpose</li>
          <li>Violate any laws in your jurisdiction</li>
          <li>Infringe upon any intellectual property rights</li>
          <li>Harass, abuse, or harm another person</li>
          <li>Spam or flood the service</li>
        </ul>

        <h2>5. Payment Terms</h2>
        <p>
          All payments are processed securely through our payment providers. By making a payment, you
          agree to provide current, complete, and accurate purchase and account information.
        </p>

        <h2>6. Intellectual Property</h2>
        <p>
          The service and its original content, features, and functionality are owned by ZocMLM and
          are protected by international copyright, trademark, patent, trade secret, and other
          intellectual property laws.
        </p>

        <h2>7. Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior notice or liability,
          for any reason whatsoever, including without limitation if you breach the Terms.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          In no event shall ZocMLM be liable for any indirect, incidental, special, consequential,
          or punitive damages, including without limitation, loss of profits, data, use, goodwill,
          or other intangible losses.
        </p>

        <h2>9. Changes</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any
          time. We will provide notice of any changes by posting the new Terms on this page.
        </p>

        <h2>10. Contact Information</h2>
        <p>
          Questions about the Terms should be sent to us at: legal@zocmlm.com
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;