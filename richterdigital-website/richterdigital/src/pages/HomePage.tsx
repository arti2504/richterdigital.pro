import Navigation        from '../components/Navigation';
import HeroSection       from '../sections/HeroSection';
import IntroSection      from '../sections/IntroSection';
import ServicesSection   from '../sections/ServicesSection';
import PortfolioSection  from '../sections/PortfolioSection';
import ProcessSection    from '../sections/ProcessSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import AboutSection      from '../sections/AboutSection';
import ContactSection    from '../sections/ContactSection';
import Footer            from '../sections/Footer';

const HomePage = () => (
  <>
    <Navigation />
    <main>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default HomePage;
