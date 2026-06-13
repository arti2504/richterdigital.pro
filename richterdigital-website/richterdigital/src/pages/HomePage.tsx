import Navigation        from '../components/Navigation';
import HeroSection       from '../sections/HeroSection';
import IntroSection      from '../sections/IntroSection';
import LogoMarqueeSection from '../sections/LogoMarqueeSection';
import ServicesSection   from '../sections/ServicesSection';
import PortfolioSection  from '../sections/PortfolioSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import ProcessSection    from '../sections/ProcessSection';
import FAQSection        from '../sections/FAQSection';
import AboutSection      from '../sections/AboutSection';
import ContactSection    from '../sections/ContactSection';
import Footer            from '../sections/Footer';

const HomePage = () => (
  <>
    <Navigation />
    <main>
      <HeroSection />
      <IntroSection />
      <LogoMarqueeSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ProcessSection />
      <FAQSection />
      <AboutSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default HomePage;
