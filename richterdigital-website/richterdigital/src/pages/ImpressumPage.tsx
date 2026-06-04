import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../sections/Footer';

const ImpressumPage = () => {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-cream-muted hover:text-electric transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-cream mb-2">
              Impressum
            </h1>
            <p className="text-cream-muted">Legal Notice</p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {/* Angaben gemäß § 5 TMG */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-4">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="bg-navy-800/40 rounded-2xl border border-white/5 p-6">
                <p className="text-cream-muted leading-relaxed">
                  <strong className="text-cream">Richter Digital</strong><br />
                  Arthur Richter<br />
                  Schmechtener Str. 13<br />
                  33014 Bad Driburg<br />
                  Germany
                </p>
              </div>
            </section>

            {/* Kontakt */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-4">Contact</h2>
              <p className="text-cream-muted leading-relaxed">
                Email:{" "}
                <a 
                  href="mailto:richterdigitals@gmail.com" 
                  className="text-electric hover:underline inline-flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  richterdigitals@gmail.com
                </a>
              </p>
            </section>

            {/* Verantwortlich für Inhalt */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-4">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <div className="bg-navy-800/40 rounded-2xl border border-white/5 p-6">
                <p className="text-cream-muted leading-relaxed">
                  Arthur Richter<br />
                  Schmechtener Str. 13, 33014 Bad Driburg, Germany
                </p>
              </div>
            </section>

            {/* Hinweis */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-4">Notice</h2>
              <p className="text-cream-muted leading-relaxed">
                This website serves as the developer presence for the mobile app <strong className="text-cream">Smile4Me</strong>,
                developed by Richter Digital. The content on this page was created with the utmost care.
                However, we cannot guarantee the accuracy, completeness, or timeliness of the content.
              </p>
            </section>

            {/* Haftungsausschluss */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-4">Liability Disclaimer</h2>
              <div className="space-y-4 text-cream-muted leading-relaxed">
                <p>
                  <strong className="text-cream">Liability for content:</strong> As a service provider, we are responsible 
                  for our own content on these pages in accordance with § 7(1) TMG under general laws. 
                  According to §§ 8 to 10 TMG, however, we are not obligated to monitor transmitted or 
                  stored third-party information or to investigate circumstances that indicate illegal activity.
                </p>
                <p>
                  <strong className="text-cream">Liability for links:</strong> Our offer contains links to external 
                  websites of third parties, over whose content we have no influence. Therefore, we cannot 
                  assume any liability for this external content. The respective provider or operator of the 
                  linked pages is always responsible for their content.
                </p>
              </div>
            </section>

            {/* Streitschlichtung */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-4">Dispute Resolution</h2>
              <p className="text-cream-muted leading-relaxed">
                The European Commission provides a platform for online dispute resolution (ODR):{' '}
                <a 
                  href="https://ec.europa.eu/consumers/odr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-electric hover:underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                .<br />
                We are neither willing nor obliged to participate in dispute resolution proceedings 
                before a consumer arbitration board.
              </p>
            </section>

            {/* Urheberrecht */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-4">Copyright</h2>
              <p className="text-cream-muted leading-relaxed">
                The content and works created by the site operators on these pages are subject to German 
                copyright law. Reproduction, processing, distribution, and any kind of exploitation outside 
                the limits of copyright law require the written consent of the respective author or creator.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ImpressumPage;
