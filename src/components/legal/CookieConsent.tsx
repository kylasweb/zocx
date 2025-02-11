import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Cookie } from 'lucide-react';

const CookieConsent: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowButton(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowDialog(false);
    setShowButton(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShowDialog(false);
    setShowButton(false);
  };

  if (!showButton) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShowDialog(true)}
        className="fixed bottom-4 right-4 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 z-50 flex items-center justify-center group"
        aria-label="Cookie Settings"
      >
        <Cookie className="h-6 w-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-200 ease-in-out">
          Cookie Settings
        </span>
      </button>

      {/* Cookie Consent Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Cookie Settings</h2>
                <button
                  onClick={() => setShowDialog(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="prose prose-sm text-gray-500 mb-6">
                <p>
                  We use cookies to enhance your experience. By continuing to visit this site you
                  agree to our use of cookies.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="essential"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked
                      disabled
                    />
                    <label htmlFor="essential" className="ml-2 block text-sm text-gray-900">
                      Essential Cookies
                      <span className="block text-xs text-gray-500">
                        Required for the website to function properly
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="analytics"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="analytics" className="ml-2 block text-sm text-gray-900">
                      Analytics Cookies
                      <span className="block text-xs text-gray-500">
                        Help us improve our website by collecting usage information
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="marketing"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="marketing" className="ml-2 block text-sm text-gray-900">
                      Marketing Cookies
                      <span className="block text-xs text-gray-500">
                        Used to deliver more relevant advertisements
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <button
                  onClick={handleAccept}
                  className="w-full sm:w-auto flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Accept All
                </button>
                <button
                  onClick={handleDecline}
                  className="w-full sm:w-auto flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Decline All
                </button>
              </div>

              <div className="mt-4 text-center text-xs text-gray-500">
                <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</Link>
                {' · '}
                <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">Terms & Conditions</Link>
                {' · '}
                <Link to="/cookies" className="text-indigo-600 hover:text-indigo-500">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;