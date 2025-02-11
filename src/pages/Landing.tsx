import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Network, 
  ArrowRight,
  MessageSquare,
  Video,
  ShoppingBag,
  QrCode,
  Gamepad,
  CandlestickChart,
  Shield,
  Zap,
  Users,
  Globe,
  Star,
  CheckCircle
} from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import ThemeToggle from '../components/ThemeToggle';
import MainNav from '../components/layout/MainNav';
import Footer from '../components/layout/Footer';

const Landing: React.FC = () => {
  const [isDark, setIsDark] = useDarkMode();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      heroRef.current.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 10}deg)
        translateZ(20px)
      `;
    };

    const handleMouseLeave = () => {
      if (!heroRef.current) return;
      heroRef.current.style.transform = 'none';
    };

    const element = heroRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const features = [
    {
      icon: Network,
      title: 'Zocial Network',
      description: 'A decentralized social network powered by blockchain technology',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: CandlestickChart,
      title: 'Trading Exchange',
      description: 'Advanced crypto trading platform with powerful tools and features',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Video,
      title: 'OTT Platform',
      description: 'Stream and share content with enhanced security and monetization',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: MessageSquare,
      title: 'Chat Platform',
      description: 'Secure messaging platform with video conferencing capabilities',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: ShoppingBag,
      title: 'Coupon Platform',
      description: 'Digital coupon marketplace with blockchain verification',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      icon: QrCode,
      title: 'QR Payments',
      description: 'Seamless QR-based parallel payment system',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Gamepad,
      title: 'Game Platform',
      description: 'Play-to-earn gaming ecosystem with NFT integration',
      color: 'from-fuchsia-500 to-rose-500',
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Advanced encryption and blockchain-based security',
      color: 'from-sky-500 to-blue-500',
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience instant transactions and real-time interactions across all platforms',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'End-to-end encryption and blockchain security for all your data',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Governed by the community through DAO mechanisms',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Available worldwide with multi-language support',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Digital Creator',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      quote: 'Zocial ecosystem has transformed how I create and monetize content.',
    },
    {
      name: 'Michael Chen',
      role: 'Crypto Trader',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      quote: 'The trading platform is incredibly powerful and user-friendly.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      quote: 'QR payments have revolutionized how we handle transactions.',
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <MainNav />
      <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />

      {/* Hero Section */}
      <div className="relative pt-20 bg-gradient-to-b from-indigo-900 to-indigo-800 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-30 dark:opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/30 to-indigo-900/80 dark:via-gray-900/30 dark:to-gray-900/80" />
        </div>

        <div 
          ref={heroRef}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center"
        >
          <div className="relative z-10 bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl transform-gpu">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Welcome to the</span>
              <span className="block text-indigo-400 dark:text-indigo-300">Zocial Ecosystem</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Experience the future of digital interaction with our integrated blockchain-powered platforms.
            </p>
            <div className="mt-10 flex justify-center space-x-6">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200 transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-100 bg-indigo-800/50 hover:bg-indigo-700/50 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 backdrop-blur-sm transition-all duration-200 transform hover:scale-105"
              >
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Integrated Ecosystem
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Discover our comprehensive suite of blockchain-powered platforms
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="relative group"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-50 dark:opacity-30 transition-opacity duration-300 group-hover:opacity-70`} />
                  <div className="relative p-6">
                    <feature.icon className="h-12 w-12 text-white mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Why Choose Zocial?
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Experience the benefits of our integrated ecosystem
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
                    <benefit.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              What Our Users Say
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "{testimonial.quote}"
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 dark:bg-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Join the Future?
            </h2>
            <p className="mt-4 text-xl text-indigo-200">
              Be part of the next generation of digital interaction
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 dark:hover:bg-gray-100"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;