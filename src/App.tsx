import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Linkedin, Twitter } from 'lucide-react';
import Globe from 'react-globe.gl';

function App() {
  const [freelancersCount, setFreelancersCount] = useState(0);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [typedText, setTypedText] = useState('');
  const fullText = 'WorkNest';
  const globeEl = useRef<any>();

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
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-green-400">WorkNest</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
  <div>A platform designed</div>
  <div>specifically for</div>
  <div>first-time freelancers.</div>
  <div className="mt-2">It's <span className="text-green-400">{typedText}<span className="animate-pulse">|</span></span></div>
</h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
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
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
              {/* Join Waitlist Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-600/25 w-full sm:w-auto"
                >
                  Join the Waitlist
                  <ChevronDown className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
                </button>
                
                <div className="absolute top-full mt-2 w-full min-w-max bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfoicOAJu7zyzKU8305i3IaEbf7kVWqSjTqZuOvj8G3ymKVWA/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 sm:px-6 py-3 hover:bg-gray-700 transition-colors duration-200 whitespace-nowrap"
                  >
                    As a Freelancer
                  </a>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfVqFNT3n1XaFphNEi3CTDUBb482dzMMHYhW5iGqC-KwSBr8A/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 sm:px-6 py-3 hover:bg-gray-700 transition-colors duration-200 border-t border-gray-700 whitespace-nowrap"
                  >
                    As a Company
                  </a>
                </div>
              </div>

              {/* Social Media Button */}
              <div className="flex gap-3 justify-center lg:justify-start">
                <a
                  href="https://linkedin.com/company/worknest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/worknest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-blue-400 rounded-lg transition-all duration-300 transform hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 pt-8">
              <div className="text-center min-w-0">
                <div className="text-3xl font-bold text-white">{freelancersCount.toLocaleString()}+</div>
                <div className="text-gray-400 text-sm sm:text-base">Freelancers</div>
              </div>
              <div className="text-center min-w-0">
                <div className="text-3xl font-bold text-white">{companiesCount.toLocaleString()}+</div>
                <div className="text-gray-400 text-sm sm:text-base">Companies</div>
              </div>
              <div className="text-center min-w-0">
                <div className="text-3xl font-bold text-white">January 2026</div>
                <div className="text-gray-400 text-sm sm:text-base">Launch</div>
              </div>
            </div>
          </div>

          {/* Right Content - Pure Rotating Globe Only */}
          <div className="flex justify-center items-center order-first lg:order-last">
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
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center text-gray-400 text-sm">
            © 2025 WorkNest. All rights reserved. Made by rajneesh
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;