import React from 'react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="prose prose-indigo">
        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small pieces of text sent by your web browser by a website you visit. A cookie
          file is stored in your web browser and allows the service or a third-party to recognize
          you and make your next visit easier and more useful to you.
        </p>

        <h2>2. How We Use Cookies</h2>
        <p>We use cookies for the following purposes:</p>
        <ul>
          <li>Authentication - We use cookies to identify you when you visit our website</li>
          <li>Security - We use cookies to help identify and prevent security risks</li>
          <li>Performance - We use cookies to understand and improve our services</li>
          <li>Analytics - We use cookies to understand how visitors interact with our website</li>
          <li>Preferences - We use cookies to remember your preferences and settings</li>
        </ul>

        <h2>3. Types of Cookies We Use</h2>
        <h3>Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function and cannot be switched off. They
          are usually only set in response to actions made by you which amount to a request for
          services.
        </p>

        <h3>Performance Cookies</h3>
        <p>
          These cookies allow us to count visits and traffic sources so we can measure and improve
          the performance of our site.
        </p>

        <h3>Functionality Cookies</h3>
        <p>
          These cookies enable the website to provide enhanced functionality and personalisation.
          They may be set by us or by third party providers.
        </p>

        <h3>Targeting Cookies</h3>
        <p>
          These cookies may be set through our site by our advertising partners. They may be used
          by those companies to build a profile of your interests.
        </p>

        <h2>4. Your Cookie Choices</h2>
        <p>
          You can control and/or delete cookies as you wish. You can delete all cookies that are
          already on your computer and you can set most browsers to prevent them from being placed.
        </p>

        <h2>5. Managing Cookie Preferences</h2>
        <p>
          Most browsers allow you to refuse to accept cookies and to delete cookies. The methods
          for doing so vary from browser to browser, and from version to version.
        </p>

        <h2>6. Changes to This Policy</h2>
        <p>
          We may update our Cookie Policy from time to time. We will notify you of any changes by
          posting the new Cookie Policy on this page.
        </p>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about our Cookie Policy, please contact us at: privacy@zocmlm.com
        </p>
      </div>
    </div>
  );
};

export default CookiePolicy;