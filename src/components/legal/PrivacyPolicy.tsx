import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-indigo">
        <h2>1. Introduction</h2>
        <p>
          This Privacy Policy explains how ZocMLM ("we," "us," or "our") collects, uses, and protects
          your personal information when you use our platform.
        </p>

        <h2>2. Information We Collect</h2>
        <ul>
          <li>Personal identification information (Name, email address, phone number, etc.)</li>
          <li>Business information</li>
          <li>Transaction data</li>
          <li>Technical data (IP address, browser type, device information)</li>
          <li>Usage data</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and maintain our services</li>
          <li>Process transactions</li>
          <li>Send administrative information</li>
          <li>Provide customer support</li>
          <li>Analyze and improve our services</li>
        </ul>

        <h2>4. Data Protection</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data
          against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Data portability</li>
        </ul>

        <h2>6. Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our platform and hold
          certain information. You can instruct your browser to refuse all cookies or to indicate when
          a cookie is being sent.
        </p>

        <h2>7. Third-Party Services</h2>
        <p>
          We may employ third-party companies and individuals to facilitate our service, provide
          service on our behalf, perform service-related services, or assist us in analyzing how our
          service is used.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page and updating the "effective date" at the top of
          this Privacy Policy.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
          privacy@zocmlm.com
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;