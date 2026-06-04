import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../sections/Footer';

const PrivacyPage = () => {
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
              Privacy Policy
            </h1>
            <p className="text-cream-muted">Datenschutzerklärung</p>
            <p className="text-sm text-cream-muted/60 mt-2">Last updated: May 2025</p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-3">1. Introduction</h2>
              <p className="text-cream-muted leading-relaxed">
                This privacy policy applies to the <strong className="text-cream">Smile4Me</strong> mobile application 
                and the <strong className="text-cream">richterdigital.pro</strong> website. It explains how we collect, 
                use, and protect your personal data when you use our services.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-3">2. Data Controller</h2>
              <p className="text-cream-muted leading-relaxed">
                <strong className="text-cream">Richter Digital</strong><br />
                Bad Driburg, Germany<br />
                <a 
                  href="mailto:richterdigitals@gmail.com" 
                  className="text-electric hover:underline inline-flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  richterdigitals@gmail.com
                </a>
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-3">3. What Data We Collect</h2>
              <p className="text-cream-muted leading-relaxed mb-3">
                When you use Smile4Me, we may collect the following data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-cream-muted">
                <li><strong className="text-cream">App usage data</strong> — How you interact with the app (analytics)</li>
                <li><strong className="text-cream">Device information</strong> — OS version, device model, app version</li>
                <li><strong className="text-cream">Advertising ID</strong> — For personalized advertising via Google AdMob</li>
                <li><strong className="text-cream">Crash logs</strong> — Technical data to improve app stability</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-3">4. How We Use Your Data</h2>
              <ul className="list-disc list-inside space-y-2 text-cream-muted">
                <li>To improve and optimize the app experience</li>
                <li>To display relevant advertisements (via Google AdMob)</li>
                <li>To diagnose and fix technical issues</li>
                <li>To analyze app usage and performance</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-3">5. Advertising</h2>
              <p className="text-cream-muted leading-relaxed">
                We use <strong className="text-cream">Google AdMob</strong> to display ads in our app. 
                AdMob may use your device's advertising ID to show personalized ads based on your interests. 
                You can opt out of personalized advertising at any time in your device settings 
                (Settings → Privacy → Ads on Android, or Settings → Privacy → Apple Advertising on iOS).
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-3">6. Third-Party Services</h2>
              <p className="text-cream-muted leading-relaxed mb-3">
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-cream-muted">
                <li><strong className="text-cream">Google AdMob</strong> — For advertising</li>
                <li><strong className="text-cream">Google Firebase Analytics</strong> — For usage analytics</li>
                <li><strong className="text-cream">Google Firebase Crashlytics</strong> — For crash reporting</li>
              </ul>
              <p className="text-cream-muted leading-relaxed mt-3">
                These services may collect and process data according to their own privacy policies. 
                You can find more information at{' '}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-electric hover:underline"
                >
                  Google's Privacy Policy
                </a>.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-3">7. Data Storage & Security</h2>
              <p className="text-cream-muted leading-relaxed">
                We take appropriate technical and organizational measures to protect your data. 
                Data is stored securely on Google's Firebase servers. We do not sell your personal 
                data to third parties.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-3">8. Your Rights (GDPR)</h2>
              <p className="text-cream-muted leading-relaxed mb-3">
                Under the General Data Protection Regulation (GDPR), you have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-cream-muted">
                <li><strong className="text-cream">Right to access</strong> — Request a copy of your data</li>
                <li><strong className="text-cream">Right to deletion</strong> — Request deletion of your data</li>
                <li><strong className="text-cream">Right to rectification</strong> — Correct inaccurate data</li>
                <li><strong className="text-cream">Right to data portability</strong> — Receive data in a structured format</li>
                <li><strong className="text-cream">Right to object</strong> — Object to data processing</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-3">9. Children's Privacy</h2>
              <p className="text-cream-muted leading-relaxed">
                Smile4Me is not intended for children under the age of 13. We do not knowingly 
                collect personal data from children under 13. If you believe we have collected 
                data from a child under 13, please contact us.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-3">10. Changes to This Policy</h2>
              <p className="text-cream-muted leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any 
                changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="font-display text-xl font-bold text-cream mb-3">11. Contact Us</h2>
              <p className="text-cream-muted leading-relaxed">
                If you have any questions about this privacy policy or our data practices, 
                please contact us at:{" "}
                <a 
                  href="mailto:richterdigitals@gmail.com" 
                  className="text-electric hover:underline inline-flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  richterdigitals@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPage;
