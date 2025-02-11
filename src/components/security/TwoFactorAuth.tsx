import React, { useState } from 'react';
import { Shield, Smartphone, Mail, Key } from 'lucide-react';

interface TwoFactorAuthProps {
  enabled: boolean;
  methods: string[];
  onToggle: (enabled: boolean) => void;
  onMethodChange: (methods: string[]) => void;
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({
  enabled,
  methods,
  onToggle,
  onMethodChange,
}) => {
  const [showSetup, setShowSetup] = useState(false);

  const availableMethods = [
    {
      id: 'authenticator',
      name: 'Authenticator App',
      description: 'Use an authenticator app like Google Authenticator',
      icon: Key,
    },
    {
      id: 'sms',
      name: 'SMS',
      description: 'Receive codes via text message',
      icon: Smartphone,
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Receive codes via email',
      icon: Mail,
    },
  ];

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Shield className={`h-6 w-6 ${enabled ? 'text-green-500' : 'text-gray-400'}`} />
          </div>
          <div className="ml-3 w-full">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Two-Factor Authentication
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>
              <button
                type="button"
                onClick={() => onToggle(!enabled)}
                className={`
                  relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer 
                  transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  ${enabled ? 'bg-indigo-600' : 'bg-gray-200'}
                `}
              >
                <span className="sr-only">Toggle 2FA</span>
                <span
                  className={`
                    pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 
                    transition ease-in-out duration-200
                    ${enabled ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>

            {enabled && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Authentication Methods</h4>
                <div className="mt-4 space-y-4">
                  {availableMethods.map((method) => (
                    <div key={method.id} className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id={method.id}
                          type="checkbox"
                          checked={methods.includes(method.id)}
                          onChange={(e) => {
                            const newMethods = e.target.checked
                              ? [...methods, method.id]
                              : methods.filter(m => m !== method.id);
                            onMethodChange(newMethods);
                          }}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor={method.id} className="text-sm font-medium text-gray-700">
                          {method.name}
                        </label>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {showSetup && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-md">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Setup Instructions</h4>
                    {/* Add setup instructions based on selected methods */}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setShowSetup(!showSetup)}
                  className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {showSetup ? 'Hide Setup Instructions' : 'Show Setup Instructions'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;