import React from 'react';
import { X } from 'lucide-react';

interface ConnectionGuideProps {
  platform: string;
  onClose: () => void;
}

const ConnectionGuide: React.FC<ConnectionGuideProps> = ({ platform, onClose }) => {
  const guides = {
    wordpress: {
      title: 'WordPress Integration Guide',
      steps: [
        {
          title: 'Install Required Plugin',
          content: 'Install and activate the "MLM Platform SSO" plugin from the WordPress plugin directory.',
        },
        {
          title: 'Configure Plugin Settings',
          content: 'Go to Settings > MLM Platform SSO and enter your Client ID and Client Secret.',
        },
        {
          title: 'Set Callback URL',
          content: 'Copy the callback URL from the plugin settings and paste it in the Connection Manager.',
        },
        {
          title: 'Test Connection',
          content: 'Click "Test Connection" to verify the integration is working properly.',
        },
      ],
      code: `
// Add to wp-config.php
define('MLM_SSO_CLIENT_ID', 'your-client-id');
define('MLM_SSO_CLIENT_SECRET', 'your-client-secret');
define('MLM_SSO_CALLBACK_URL', 'https://your-site.com/mlm-sso/callback');
      `,
    },
    laravel: {
      title: 'Laravel Integration Guide',
      steps: [
        {
          title: 'Install SSO Package',
          content: 'Install the MLM Platform SSO package via Composer.',
        },
        {
          title: 'Publish Configuration',
          content: 'Run the publish command to create the configuration file.',
        },
        {
          title: 'Configure Environment',
          content: 'Add the required environment variables to your .env file.',
        },
        {
          title: 'Set Up Routes',
          content: 'Add the necessary routes to handle SSO authentication.',
        },
      ],
      code: `
// Install package
composer require mlm-platform/laravel-sso

// Publish config
php artisan vendor:publish --provider="MLMPlatform\\SSO\\ServiceProvider"

// Add to .env
MLM_SSO_CLIENT_ID=your-client-id
MLM_SSO_CLIENT_SECRET=your-client-secret
MLM_SSO_CALLBACK_URL=https://your-site.com/auth/mlm/callback

// Add to routes/web.php
Route::get('auth/mlm', [MLMAuthController::class, 'redirect']);
Route::get('auth/mlm/callback', [MLMAuthController::class, 'callback']);
      `,
    },
    drupal: {
      title: 'Drupal Integration Guide',
      steps: [
        {
          title: 'Install MLM SSO Module',
          content: 'Download and install the MLM Platform SSO module.',
        },
        {
          title: 'Configure Module Settings',
          content: 'Navigate to Configuration > MLM Platform SSO to set up the integration.',
        },
        {
          title: 'Set Up Permissions',
          content: 'Configure user permissions for SSO authentication.',
        },
        {
          title: 'Test Integration',
          content: 'Verify the SSO functionality is working as expected.',
        },
      ],
      code: `
// settings.php
$settings['mlm_sso_client_id'] = 'your-client-id';
$settings['mlm_sso_client_secret'] = 'your-client-secret';
$settings['mlm_sso_callback_url'] = 'https://your-site.com/mlm-sso/callback';
      `,
    },
  };

  const guide = guides[platform as keyof typeof guides] || guides.wordpress;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">{guide.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              {guide.steps.map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-1 text-gray-500">{step.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Code Example</h3>
              <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-gray-800">{guide.code}</code>
              </pre>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-yellow-400">⚠️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Important Notes</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Keep your Client ID and Client Secret secure</li>
                      <li>Use HTTPS for all SSO endpoints</li>
                      <li>Regularly update integration packages</li>
                      <li>Test SSO in a staging environment first</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionGuide;