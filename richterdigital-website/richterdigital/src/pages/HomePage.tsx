import Navigation       from '../components/Navigation';
import HeroSection      from '../sections/HeroSection';
import IntroSection     from '../sections/IntroSection';
import StatsSection     from '../sections/StatsSection';
import MarqueeSection   from '../sections/MarqueeSection';
import ServicesSection  from '../sections/ServicesSection';
import PortfolioSection from '../sections/PortfolioSection';
import AboutSection     from '../sections/AboutSection';
import FAQSection       from '../sections/FAQSection';
import ContactSection   from '../sections/ContactSection';
import Footer           from '../sections/Footer';

const HomePage = () => (
  <>
    <Navigation />
    <main>
      <HeroSection />
      <IntroSection />
      <StatsSection />
      <MarqueeSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default HomePage;
