import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Linkedin, Twitter, Menu, X } from 'lucide-react';
import Globe from 'react-globe.gl';

function App() {
  const [freelancersCount, setFreelancersCount] = useState(0);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fullText = 'WorkNest';
  const globeEl = useRef<any>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Animated counter effect
  useEffect(() => {
    const animateCounter = (setValue: (value: number) => void, targetValue: number, duration: number) => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setValue(Math.floor(progress * targetValue));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => {
      animateCounter(setFreelancersCount, 500, 2000);
      animateCounter(setCompaniesCount, 100, 2000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  // Globe initialization - pure rotation only
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.8;
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 1.8 });
      
      // Disable all interactions
      globeEl.current.controls().enableZoom = false;
      globeEl.current.controls().enableRotate = false;
      globeEl.current.controls().enablePan = false;
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && 
          event.target instanceof Node && 
          !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-green-400">WorkNest</h1>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation (empty for now) */}
          <nav className="hidden lg:block">
            {/* Add navigation items here when needed */}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 lg:pt-12">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[70vh] sm:min-h-[80vh]">
          
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left order-last lg:order-first">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-snug">
                <div>A platform designed</div>
                <div>specifically for</div>
                <div>first-time freelancers.</div>
                <div className="mt-1 sm:mt-2">It's <span className="text-green-400">{typedText}<span className="animate-pulse">|</span></span></div>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We're building a freelancing platform that solves the "first project problem" for beginners. 
                Get started without a portfolio and earn from your very first project, with our simplified system that handles everything from matching 
                to payments.
              </p>
            </div>

            {/* Launch Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/30 rounded-full border border-green-700/50">
              <span className="text-xl">🛠️</span>
              <span className="text-green-300 font-medium">Launching January 2026</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
              {/* Join Waitlist Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center justify-center gap-2 px-5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-600/25 w-full sm:w-auto"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Join the Waitlist
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 left-0 right-0 sm:left-auto sm:right-auto w-full sm:w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-30">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfoicOAJu7zyzKU8305i3IaEbf7kVWqSjTqZuOvj8G3ymKVWA/viewform?usp=header"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 sm:px-6 py-3 hover:bg-gray-700 transition-colors duration-200 text-sm sm:text-base"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      As a Freelancer
                    </a>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfVqFNT3n1XaFphNEi3CTDUBb482dzMMHYhW5iGqC-KwSBr8A/viewform?usp=header"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 sm:px-6 py-3 hover:bg-gray-700 transition-colors duration-200 border-t border-gray-700 text-sm sm:text-base"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      As a Company
                    </a>
                  </div>
                )}
              </div>

              {/* Social Media Button */}
              <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start">
                <a
                  href="https://linkedin.com/company/worknest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-gray-800 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://twitter.com/worknest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-gray-800 hover:bg-blue-400 rounded-lg transition-all duration-300 transform hover:scale-110"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 lg:gap-8 pt-6 sm:pt-8">
              <div className="text-center min-w-0 flex-1 sm:flex-none">
                <div className="text-2xl sm:text-3xl font-bold text-white">{freelancersCount.toLocaleString()}+</div>
                <div className="text-gray-400 text-xs sm:text-sm md:text-base">Freelancers</div>
              </div>
              <div className="text-center min-w-0 flex-1 sm:flex-none">
                <div className="text-2xl sm:text-3xl font-bold text-white">{companiesCount.toLocaleString()}+</div>
                <div className="text-gray-400 text-xs sm:text-sm md:text-base">Companies</div>
              </div>
              <div className="text-center min-w-0 flex-1 sm:flex-none">
                <div className="text-2xl sm:text-3xl font-bold text-white">January 2026</div>
                <div className="text-gray-400 text-xs sm:text-sm md:text-base">Launch</div>
              </div>
            </div>
          </div>

          {/* Right Content - Pure Rotating Globe Only */}
          <div className="flex justify-center items-center order-first lg:order-last mb-4 sm:mb-6 lg:mb-0">
            <div className="w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-full lg:h-full max-w-full">
              <Globe
                ref={globeEl}
                width={400}
                height={400}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                showAtmosphere={true}
                atmosphereColor="rgba(100, 200, 255, 0.2)"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-8 sm:mt-12 md:mt-16 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center text-gray-400 text-xs sm:text-sm">
            © 2025 WorkNest. All rights reserved. Made by rajneesh
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;