import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../sections/Footer';
import { openConsentSettings } from '../components/ConsentBanner';
import { TRACKING_ENABLED } from '../lib/pixel';
import { useLang, tr } from '../i18n';

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-electric hover:underline">{children}</a>
);
const S = ({ children }: { children: ReactNode }) => <strong className="text-cream">{children}</strong>;

const PrivacyPage = () => {
  const { lang } = useLang();

  const sections: { h: string; body: ReactNode }[] = [
    {
      h: tr(lang, '1. Verantwortlicher', '1. Data Controller'),
      body: (
        <p>
          <S>Arthur Richter — Richter Digital</S><br />
          Schmechtener Str. 13, 33014 Bad Driburg, {tr(lang, 'Deutschland', 'Germany')}<br />
          <a href="mailto:richterdigitals@gmail.com" className="text-electric hover:underline inline-flex items-center gap-1.5 mt-1">
            <Mail className="w-4 h-4" /> richterdigitals@gmail.com
          </a>
        </p>
      ),
    },
    {
      h: tr(lang, '2. Hosting', '2. Hosting'),
      body: (
        <p>
          {tr(lang,
            'Diese Website wird bei GitHub Pages gehostet, einem Dienst der GitHub Inc., USA (Tochterunternehmen der Microsoft Corporation). Beim Aufruf der Seite verarbeitet GitHub technisch notwendige Verbindungsdaten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Datei, übertragene Datenmenge und Browserkennung. Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und zuverlässigen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO). Die Übermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework. Näheres in der ',
            'This website is hosted on GitHub Pages, a service of GitHub Inc., USA (a subsidiary of Microsoft Corporation). When you access the site, GitHub processes technically necessary connection data such as IP address, date and time, requested file, data volume transferred and browser identifier. The legal basis is our legitimate interest in providing the website securely and reliably (Art. 6(1)(f) GDPR). Transfer to the USA takes place on the basis of the EU-US Data Privacy Framework. For details see the ')}
          <A href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement">
            {tr(lang, 'Datenschutzerklärung von GitHub', 'GitHub privacy statement')}
          </A>.
        </p>
      ),
    },
    {
      h: tr(lang, '3. Kontaktformular', '3. Contact Form'),
      body: (
        <>
          <p>
            {tr(lang,
              'Wenn du unser Kontaktformular nutzt, verarbeiten wir die von dir eingegebenen Daten (Name, E-Mail-Adresse, Projektart, Budgetrahmen, Nachricht), um deine Anfrage zu beantworten. Die Übermittlung erfolgt über den Formulardienst ',
              'When you use our contact form, we process the data you enter (name, email address, project type, budget range, message) in order to answer your inquiry. Submission runs through the form service ')}
            <A href="https://web3forms.com/privacy">Web3Forms</A>
            {tr(lang,
              ', der die Nachricht an unser E-Mail-Postfach weiterleitet. Dabei kann eine Verarbeitung außerhalb der EU stattfinden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO (Anbahnung eines Vertragsverhältnisses bzw. berechtigtes Interesse an der Bearbeitung von Anfragen).',
              ', which forwards the message to our mailbox. Processing outside the EU may occur. The legal basis is Art. 6(1)(b) or (f) GDPR (pre-contractual communication or legitimate interest in handling inquiries).')}
          </p>
          <p>
            {tr(lang,
              'Wir speichern deine Anfrage, bis sie abschließend bearbeitet ist, und darüber hinaus nur, soweit gesetzliche Aufbewahrungsfristen es erfordern. Eine Angabe deiner Daten ist freiwillig; ohne E-Mail-Adresse können wir dir jedoch nicht antworten. Alternativ kannst du uns jederzeit direkt per E-Mail schreiben.',
              'We store your inquiry until it has been fully processed, and beyond that only where statutory retention periods require it. Providing your data is voluntary; however, without an email address we cannot reply. Alternatively you can email us directly at any time.')}
          </p>
        </>
      ),
    },
    {
      h: tr(lang, '4. Cookies und Einwilligung', '4. Cookies and Consent'),
      body: (
        <>
          <p>
            {tr(lang,
              'Technisch notwendige Speicherungen setzen wir ein, damit die Seite funktioniert und deine Datenschutz-Entscheidung erhalten bleibt. Dafür ist keine Einwilligung erforderlich (§ 25 Abs. 2 TTDSG). Alles darüber hinaus — insbesondere der unten beschriebene Meta-Pixel — wird erst nach deiner ausdrücklichen Einwilligung geladen (§ 25 Abs. 1 TTDSG, Art. 6 Abs. 1 lit. a DSGVO).',
              'We use technically necessary storage so that the site works and your privacy choice is retained. No consent is required for this (§ 25(2) TTDSG). Anything beyond that — in particular the Meta pixel described below — is only loaded after your explicit consent (§ 25(1) TTDSG, Art. 6(1)(a) GDPR).')}
          </p>
          <p>
            {tr(lang, 'Du kannst deine Entscheidung jederzeit ändern oder widerrufen',
              'You can change or withdraw your decision at any time')}
            {TRACKING_ENABLED && (
              <>
                {': '}
                <button onClick={openConsentSettings} className="text-electric hover:underline font-semibold">
                  {tr(lang, 'Cookie-Einstellungen öffnen', 'Open cookie settings')}
                </button>
              </>
            )}
            {tr(lang, '. Der Widerruf wirkt für die Zukunft; die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung bleibt unberührt.',
              '. Withdrawal takes effect for the future; the lawfulness of processing carried out until then remains unaffected.')}
          </p>
        </>
      ),
    },
    {
      h: tr(lang, '5. Meta-Pixel (Facebook und Instagram)', '5. Meta Pixel (Facebook and Instagram)'),
      body: (
        <>
          <p>
            {tr(lang,
              'Nur wenn du eingewilligt hast, setzen wir den Meta-Pixel der Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland ein. Damit messen wir den Erfolg unserer Anzeigen auf Facebook und Instagram: Wir erkennen, ob ein Besuch oder eine Anfrage auf eine Anzeige zurückgeht, und können Anzeigen an passende Zielgruppen ausliefern.',
              'Only if you have given consent do we use the Meta pixel of Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Ireland. We use it to measure the success of our ads on Facebook and Instagram: we can tell whether a visit or inquiry originated from an ad, and can deliver ads to suitable audiences.')}
          </p>
          <p>
            {tr(lang,
              'Dabei werden Cookies (unter anderem _fbp und _fbc) gesetzt und Daten wie IP-Adresse, Browser- und Geräteinformationen, besuchte Seiten sowie ausgelöste Ereignisse (etwa das Anschauen der Preise oder das Absenden des Kontaktformulars) an Meta übertragen. Sendest du das Kontaktformular ab, werden zusätzlich deine E-Mail-Adresse und dein Name in verschlüsselter Form (SHA-256-Hash, erzeugt in deinem Browser) übermittelt, damit Meta die Anfrage der passenden Anzeige zuordnen kann („Advanced Matching“); der Klartext verlässt dein Gerät dabei nicht. Meta kann diese Daten mit einem bestehenden Facebook- oder Instagram-Konto verknüpfen und für eigene Zwecke verarbeiten. Eine Übermittlung an die Meta Platforms Inc. in die USA findet statt; Grundlage ist das EU-US Data Privacy Framework. Auf die weitere Verarbeitung durch Meta haben wir keinen Einfluss.',
              'This sets cookies (including _fbp and _fbc) and transmits data such as IP address, browser and device information, pages visited and events triggered (for example submitting the contact form) to Meta. Meta may link this data to an existing Facebook or Instagram account and process it for its own purposes. Data is transferred to Meta Platforms Inc. in the USA on the basis of the EU-US Data Privacy Framework. We have no influence over Meta’s further processing.')}
          </p>
          <p>
            {tr(lang, 'Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Weitere Informationen findest du in der ',
              'The legal basis is your consent (Art. 6(1)(a) GDPR). Further information is available in ')}
            <A href="https://www.facebook.com/privacy/policy">{tr(lang, 'Datenschutzrichtlinie von Meta', 'Meta’s privacy policy')}</A>
            {tr(lang, ' sowie in den ', ' and in the ')}
            <A href="https://www.facebook.com/settings?tab=ads">{tr(lang, 'Werbeeinstellungen deines Meta-Kontos', 'ad settings of your Meta account')}</A>.
          </p>
        </>
      ),
    },
    {
      h: tr(lang, '6. Schriftarten', '6. Fonts'),
      body: (
        <p>
          {tr(lang,
            'Die verwendeten Schriftarten werden von unserem eigenen Server geladen. Es findet kein Verbindungsaufbau zu Google-Servern statt und deine IP-Adresse wird dabei nicht an Dritte übermittelt.',
            'The fonts used are served from our own server. No connection to Google servers is established and your IP address is not transmitted to third parties for this purpose.')}
        </p>
      ),
    },
    {
      h: tr(lang, '7. Smile4Me App', '7. Smile4Me App'),
      body: (
        <>
          <p>
            {tr(lang,
              'Für unsere Android-App Smile4Me gilt ergänzend: Wir verarbeiten Nutzungsdaten, Geräteinformationen (Betriebssystemversion, Modell, App-Version), die Werbe-ID sowie Fehlerberichte.',
              'The following applies additionally to our Android app Smile4Me: we process usage data, device information (OS version, model, app version), the advertising ID and crash reports.')}
          </p>
          <p>
            {tr(lang, 'Eingesetzte Dienste sind Google AdMob (Werbung), Firebase Analytics (Nutzungsanalyse) und Firebase Crashlytics (Fehlerberichte), jeweils der Google Ireland Limited, Dublin, Irland. Personalisierte Werbung kannst du in den Einstellungen deines Geräts deaktivieren. Näheres in der ',
              'The services used are Google AdMob (advertising), Firebase Analytics (usage analytics) and Firebase Crashlytics (crash reporting), each provided by Google Ireland Limited, Dublin, Ireland. You can disable personalised advertising in your device settings. For details see ')}
            <A href="https://policies.google.com/privacy">{tr(lang, 'Datenschutzerklärung von Google', 'Google’s privacy policy')}</A>.
            {' '}
            {tr(lang, 'Die App richtet sich nicht an Kinder unter 13 Jahren.', 'The app is not directed at children under the age of 13.')}
          </p>
        </>
      ),
    },
    {
      h: tr(lang, '8. Deine Rechte', '8. Your Rights'),
      body: (
        <>
          <p>{tr(lang, 'Du hast jederzeit das Recht auf:', 'You have the right at any time to:')}</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>{tr(lang, 'Auskunft über die zu deiner Person gespeicherten Daten (Art. 15 DSGVO)', 'access the data stored about you (Art. 15 GDPR)')}</li>
            <li>{tr(lang, 'Berichtigung unrichtiger Daten (Art. 16 DSGVO)', 'rectification of inaccurate data (Art. 16 GDPR)')}</li>
            <li>{tr(lang, 'Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO)', 'erasure (Art. 17 GDPR) and restriction of processing (Art. 18 GDPR)')}</li>
            <li>{tr(lang, 'Datenübertragbarkeit (Art. 20 DSGVO)', 'data portability (Art. 20 GDPR)')}</li>
            <li>{tr(lang, 'Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)', 'object to processing (Art. 21 GDPR)')}</li>
            <li>{tr(lang, 'Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)', 'withdraw consent you have given (Art. 7(3) GDPR)')}</li>
          </ul>
          <p className="mt-3">
            {tr(lang,
              'Wende dich dazu einfach per E-Mail an uns. Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren, für uns zuständig ist die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf.',
              'Simply contact us by email. You may also lodge a complaint with a data protection authority; the authority responsible for us is the State Commissioner for Data Protection and Freedom of Information North Rhine-Westphalia, Kavalleriestraße 2–4, 40213 Düsseldorf, Germany.')}
          </p>
        </>
      ),
    },
    {
      h: tr(lang, '9. Änderungen dieser Erklärung', '9. Changes to This Policy'),
      body: (
        <p>
          {tr(lang,
            'Wir passen diese Datenschutzerklärung an, wenn sich unsere Website oder die eingesetzten Dienste ändern. Es gilt jeweils die hier veröffentlichte Fassung.',
            'We update this privacy policy when our website or the services we use change. The version published here always applies.')}
        </p>
      ),
    },
  ];

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <Link to="/" className="inline-flex items-center gap-2 text-cream-muted hover:text-electric transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            {tr(lang, 'Zurück zur Startseite', 'Back to home')}
          </Link>

          <div className="mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-cream mb-2">
              {tr(lang, 'Datenschutzerklärung', 'Privacy Policy')}
            </h1>
            <p className="text-cream-muted">{tr(lang, 'richterdigital.pro und Smile4Me App', 'richterdigital.pro and Smile4Me app')}</p>
            <p className="text-sm text-cream-muted/60 mt-2">{tr(lang, 'Stand: Juli 2026', 'Last updated: July 2026')}</p>
          </div>

          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-display text-xl font-bold text-cream mb-3">{s.h}</h2>
                <div className="text-cream-muted leading-relaxed space-y-3">{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPage;
