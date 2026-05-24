import Navigation from '../components/Navigation';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import AppShowcaseSection from '../sections/AppShowcaseSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';

const HomePage = () => {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <AppShowcaseSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
