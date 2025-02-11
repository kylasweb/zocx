import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Network, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface FormData {
  // Personal Details
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;

  // Work Profile
  occupation: string;
  company: string;
  experience: string;
  skills: string[];

  // Nominee Details
  nomineeName: string;
  nomineeRelation: string;
  nomineePhone: string;
  nomineeEmail: string;

  // KYC Information
  idType: string;
  idNumber: string;
  addressProof: string;
  panNumber: string;

  // Sponsor Details
  sponsorId: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = navigate();
  const { register, loading, error } = useAuthStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    occupation: '',
    company: '',
    experience: '',
    skills: [],
    nomineeName: '',
    nomineeRelation: '',
    nomineePhone: '',
    nomineeEmail: '',
    idType: '',
    idNumber: '',
    addressProof: '',
    panNumber: '',
    sponsorId: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
      return;
    }

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-6">Personal Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-6">Work Profile</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-6">Nominee Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nominee Name</label>
              <input
                type="text"
                name="nomineeName"
                value={formData.nomineeName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Relationship</label>
              <input
                type="text"
                name="nomineeRelation"
                value={formData.nomineeRelation}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nominee Phone</label>
              <input
                type="tel"
                name="nomineePhone"
                value={formData.nomineePhone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nominee Email</label>
              <input
                type="email"
                name="nomineeEmail"
                value={formData.nomineeEmail}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-6">KYC Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">ID Type</label>
              <select
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select ID Type</option>
                <option value="passport">Passport</option>
                <option value="driving_license">Driving License</option>
                <option value="national_id">National ID</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ID Number</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address Proof</label>
              <input
                type="text"
                name="addressProof"
                value={formData.addressProof}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">PAN Number</label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-6">Sponsor & Security</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sponsor ID</label>
              <input
                type="text"
                name="sponsorId"
                value={formData.sponsorId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Network className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-8">
            <div className="relative">
              <div className="absolute left-0 top-2 w-full">
                <div className="h-0.5 w-full bg-gray-200">
                  <div
                    className="h-0.5 bg-indigo-600 transition-all duration-500"
                    style={{ width: `${(step / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="relative flex justify-between">
                {[1, 2, 3, 4, 5].map((index) => (
                  <button
                    key={index}
                    onClick={() => setStep(index)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      step >= index
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-gray-200 bg-white text-gray-400'
                    }`}
                  >
                    {index}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStep()}

            {error && (
              <div className="mt-4 bg-red-50 p-4 rounded-md">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ml-auto"
              >
                {step === 5 ? (
                  loading ? (
                    'Creating Account...'
                  ) : (
                    'Create Account'
                  )
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;