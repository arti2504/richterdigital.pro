import Navigation from '../components/Navigation';
import HeroSection from '../sections/HeroSection';
import MarqueeSection from '../sections/MarqueeSection';
import ServicesSection from '../sections/ServicesSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import PortfolioSection from '../sections/PortfolioSection';
import AboutSection from '../sections/AboutSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';

const HomePage = () => {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <MarqueeSection />
        <ServicesSection />
        <HowItWorksSection />
        <PortfolioSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
