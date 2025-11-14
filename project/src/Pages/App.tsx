import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import { Certificaciones } from "../components/Certificaciones";
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import AndyChat from '../components/AndyChat';
import { translations } from '../translations';
import Dashboard from '../Pages/Dashboard';

function App() {
  const isDashboard = window.location.pathname === '/dashboard';

  if (isDashboard) return <Dashboard />;

  const [language, setLanguage] = useState<'es' | 'en'>('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'es' | 'en';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = translations[language];

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    window.gtag = gtag;
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar t={t} language={language} toggleLanguage={toggleLanguage} />
      <Hero t={t} language={language} />
      <About t={t} />
      <Certificaciones t={t} />
      <Experience t={t} />
      <Projects t={t} />
      <Contact t={t} />
      <Footer t={t} />
  <AndyChat />
  <CookieBanner t={t} />
    </div>
  );
}

export default App;
