import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { US_STATES, US_VIEWBOX } from './usStates';
import { useLang } from '../i18n';

/* ===================================================================
 *  KASSE: HIER DEN GUMROAD-PRODUKTLINK EINTRAGEN.
 *  Verkauf auf dieser Seite fuer $19.99 ueber Gumroad (Merchant of
 *  Record, PDF mit Kaeufer-E-Mail). Jeder Kaufknopf auf dieser Seite
 *  benutzt diese eine Konstante, ein Wechsel ist also eine Zeile.
 * =================================================================== */
const CHECKOUT_URL = 'https://therichtergroup.gumroad.com/l/plague?wanted=true';

/** Preis an einer Stelle, damit Knoepfe, Preisblock und FAQ nie auseinanderlaufen. */
const PRICE = '$19.99';

/* Rueckgabe: keine Garantie. Digitaler Download, Verkauf endgueltig,
   Kapitel 14 steht vorher frei auf der Seite (Arthur, 09.10.2026).
   In Gumroad unter Produkt > Settings dieselbe Regel eintragen, sonst
   widersprechen sich Seite und Kasse. */

/* -------------------------------------------------------------------
 *  Rueckmeldungen von Leserinnen und Lesern.
 *
 *  ACHTUNG: Hier kommen ausschliesslich echte, belegbare Rueckmeldungen
 *  hinein, mit Namen und Erlaubnis der Person. Erfundene Rezensionen und
 *  erfundene Sternebewertungen sind in den USA ausdruecklich verboten
 *  (FTC-Regel 16 CFR Part 465, in Kraft seit Oktober 2024, zivilrechtliche
 *  Strafe je Verstoss, und jede einzelne Rezension zaehlt als eigener
 *  Verstoss). Solange hier nur Platzhalter stehen, bleibt
 *  SHOW_READER_NOTES auf false.
 * ------------------------------------------------------------------- */
const SHOW_READER_NOTES = false;
const READER_NOTES = [
  { name: '[Reader name]', place: '[City, State]', quote: '[Quote goes here once the first readers have reported back.]' },
  { name: '[Reader name]', place: '[City, State]', quote: '[Quote goes here once the first readers have reported back.]' },
  { name: '[Reader name]', place: '[City, State]', quote: '[Quote goes here once the first readers have reported back.]' },
];

/* Die beiden Regionen, die die CDC nennt. Ganze Staaten eingefaerbt; die
   Bildunterschrift sagt dazu, dass es Teilgebiete dieser Staaten sind. */
const FOCUS_STATES = ['NM', 'AZ', 'CO', 'CA', 'OR', 'NV'];

/** Beschriftungen auf der Karte, Position im Koordinatensystem 1000 x 620. */
const MAP_LABELS: Array<[string, number, number]> = [
  ['OR', 92, 118],
  ['CA', 78, 300],
  ['NV', 140, 265],
  ['AZ', 178, 372],
  ['CO', 322, 288],
  ['NM', 312, 400],
];

/** Die Karte der 48 zusammenhaengenden Staaten, einmal mit den CDC-Regionen, einmal als Frage. */
const UsMap = ({ question = false }: { question?: boolean }) => (
  <svg
    viewBox={US_VIEWBOX}
    className="pl-map"
    role="img"
    aria-label={
      question
        ? 'Outline of the contiguous United States with a large question mark across it'
        : 'Map of the contiguous United States with New Mexico, Arizona, Colorado, California, Oregon and Nevada marked, the states where the CDC places most human plague cases'
    }
  >
    {Object.entries(US_STATES).map(([abbr, d]) => (
      <path
        key={abbr}
        d={d}
        fill={!question && FOCUS_STATES.includes(abbr) ? '#A4512F' : question ? '#18212C' : '#1E2835'}
        stroke={question ? '#2A3646' : '#3A475A'}
        strokeWidth={1.1}
      />
    ))}
    {!question &&
      MAP_LABELS.map(([abbr, x, y]) => (
        <text key={abbr} x={x} y={y} className="pl-map-label" textAnchor="middle">
          {abbr}
        </text>
      ))}
    {question && (
      <text x="500" y="440" textAnchor="middle" className="pl-map-q">
        ?
      </text>
    )}
  </svg>
);

/* "Read it before you need it": bedingt formuliert, keine Vorhersage.
   Jede Zeile verweist auf das Kapitel, in dem es steht. */
const IF_ROWS: Array<{ when: string; know: string; ch: string }> = [
  {
    when: 'A case is announced in your county.',
    know: 'You know what the announcement means and whom to call about dead squirrels or prairie dogs near your home.',
    ch: 'Chapters 15 and 21',
  },
  {
    when: 'Your cat falls suddenly ill.',
    know: 'You know why cats matter so much with plague, and that you call the vet before you arrive.',
    ch: 'Chapters 13 and 15',
  },
  {
    when: 'You come home from a trip with a fever.',
    know: 'You know what to tell the doctor about where you were and what you touched, and the sentence for the lab.',
    ch: 'Chapters 14 and 16',
  },
  {
    when: 'Headlines report thousands of cases somewhere.',
    know: 'You know how to tell a suspected case from a confirmed one, and how to check a rumor before you share it.',
    ch: 'Chapters 18 and 23',
  },
];

/* "After Part Two you will know": acht Ergebnisse, jedes gegen den Buchtext geprueft. */
const OUTCOMES: Array<[string, string]> = [
  ['The four situations in which you stop waiting and go to the emergency room.', '13'],
  ['What to write down before you leave, and what to say first at the desk.', '14'],
  ['The sentence that tells the lab to handle your sample as possible plague.', '14'],
  ['Why pets in plague country stay out of the bed, and what to do when one falls ill.', '15'],
  ['Why you never poison a rodent colony yourself, and whom to call instead.', '15'],
  ['What to tell a doctor after a trip to the rural West or to a plague region abroad.', '16'],
  ['Which antibiotics work against plague, and why a home stockpile does more harm than good.', '17'],
  ['How to spot fake plague cures and where to report them.', '23'],
];

const AUDIENCE: Array<[string, string]> = [
  ['Families with pets in New Mexico, Arizona, Colorado, California, Oregon or Nevada', 'The states where the CDC places most human cases. Chapters 13 and 15.'],
  ['Hikers and campers in Western parks', 'Where to pitch a tent, and why you never feed the squirrels. Chapter 16.'],
  ['Hunters and trappers', 'How to handle and dress animals in plague country. Chapter 15.'],
  ['Travelers to plague regions abroad', 'Madagascar, Mongolia, Peru and Bolivia, and what to say if you fall ill after coming home. Chapter 16.'],
  ['Anyone following the news from Russia', 'What the Irkutsk reports showed by 9 October 2026, and how to read the next headline. Chapters 10 and 18.'],
];

/* Inhaltsverzeichnis nach book.xhtml und nav.xhtml (Endstand, 24 Kapitel).
   Der Titel von Kapitel Zwoelf steht im Buch mit zwei Gedankenstrichen um
   "and Cannot"; hier mit Kommas, weil auf der Seite keine Gedankenstriche stehen. */
const PART_ONE = [
  'The Name That Outlived the Disease (Prologue)',
  'When the First Pandemic Reached the Sea',
  'The Organism Beneath the Story',
  'Fleas, Mammals, and the Roads of Empire',
  "Justinian's Plague and the Limits of the Chronicle",
  'The Black Death and the Second Pandemic',
  'From the Third Pandemic to the Laboratory Age',
  'Three Forms, One Bacterium',
  'The Narrow Window Between Suspicion and Treatment',
  "Russia's Natural Foci",
  'Russia in October 2026: A Report, Not a Verdict',
  'Protection Begins with Knowing the Route',
  'What the Plague Can, and Cannot, Tell Us',
];
const PART_TWO = [
  'Recognizing the Three Forms',
  'The First Twenty-Four Hours',
  'The Household, the Yard, and the Animals You Live With',
  'Travel in Plague Regions',
  'Antibiotics, Resistance, and Preventive Treatment',
  'How to Read an Outbreak Report',
  'Plague in America',
  'Common Beliefs About Plague, Checked',
  'When a Case Is Reported',
  'Quarantine, From Dubrovnik to the Port Health Station',
  'False Cures and Frightening Rumors',
  'Plague in Literature and Memory',
];
const BACK_MATTER = [
  'Epilogue: The Quiet Work of Vigilance',
  'Appendix A: A Timeline of Plague',
  'Appendix B: Where to Find Reliable Information',
  'Glossary',
  'Sources and Further Reading',
];

/** Kapitel Vierzehn im Wortlaut aus book.xhtml (Endstand), mit den Quellennummern des Buchs. */
const SAMPLE: Array<{ h?: string; p?: string; refs?: string }> = [
  {"p": "There is a sentence that belongs near the front of any honest book about plague, and it is this. For pneumonic plague, the difference between a treatable infection and a fatal one is usually measured in hours, not days."},
  {"p": "Untreated, the pneumonic form is almost always fatal, and it can kill within a day or two of the first symptom. Treated early with an appropriate antibiotic, the outlook changes entirely. The antibiotics that work are not rare, expensive or experimental. They are stocked in every hospital in the developed world.", "refs": "[1] [12] [21]"},
  {"p": "This is why the chapter that follows is not about medicine. It is about the twenty minutes in which a patient or a relative either does or does not say a particular word to a particular person."},
  {"h": "The decision, stated plainly"},
  {"p": "If you have a possible exposure and you develop fever with breathlessness or a cough, you go to an emergency department. You go the same day. You do not wait for a morning appointment with a family doctor, and you do not wait to see whether it improves overnight."},
  {"p": "That is the whole of the advice, and the rest of this chapter is about carrying it out well."},
  {"h": "Before you leave"},
  {"p": "Call ahead if you can. An emergency department that knows a possible plague patient is on the way can prepare a room and protective equipment, which protects staff and other patients and speeds up everything that follows. If you are told to come in through a particular entrance, do so."},
  {"p": "Wear a well-fitting mask from the moment you decide to go, and put one on anyone who is driving you. If a surgical mask is all you have, use it. This matters only for the pneumonic form, but at this stage nobody knows which form it is."},
  {"p": "Write down four things, or have someone write them for you, because fever makes people vague and emergency departments are noisy."},
  {"p": "The date your symptoms began, and the hour if you can recall it. Where you have been in the last two weeks, with places and dates. What animals you have had contact with, including pets, livestock, wildlife and anything dead you handled or moved. Whether anyone around you has been ill, and whether any animal around you has been ill or has died."},
  {"p": "Bring any medication you already take. Do not bring the animal."},
  {"h": "What to say, in the order that works"},
  {"p": "Clinical staff triage by what they hear first. Say the exposure before the symptoms, because the exposure is what makes the symptoms mean something."},
  {"p": "A workable form of words is this."},
  {"p": "“I may have been exposed to plague. I was in [place] on [dates] and I [handled a dead rodent / was bitten by fleas / have a cat that became ill / work with Yersinia pestis]. My fever started [when]. I now have [cough, breathlessness, a painful swelling].”"},
  {"p": "Then the sentence that does the most work of all."},
  {"p": "“Please tell the laboratory that plague is being considered.”"},
  {"h": "Why that last sentence matters"},
  {"p": "Most people assume that if a sample is sent, the laboratory will simply find whatever is there. With Yersinia pestis that assumption is unsafe, for two separate reasons."},
  {"p": "The first is identification. Automated bacterial identification systems used in routine hospital laboratories have a documented history of misidentifying Y. pestis as other organisms, because it is rare enough that it sits at the margins of their reference databases. A laboratory that has been told plague is under consideration will handle the isolate differently and will involve a reference or public-health laboratory. One that has not been told may report something else entirely, and the clinical team will act on that report.", "refs": "[23] [11]"},
  {"p": "The danger is not theoretical. In 2010 two members of one household in Oregon fell ill with plague. Automated systems identified the bacterium from one patient as three different organisms in turn, Acinetobacter lwoffii, Pseudomonas luteola and a related Yersinia species. Plague had not been suspected, and confirmation came only weeks later from a reference laboratory. Both patients recovered. The CDC report on the cases advised that an automated identification of a Yersinia species from blood should prompt clinicians to consider plague.", "refs": "[23]"},
  {"p": "The second is safety. Y. pestis is hazardous to laboratory staff, and handling it requires precautions that are not routine for an ordinary sputum or blood culture. Telling the laboratory is not only a diagnostic step. It protects the people processing the sample."},
  {"p": "Neither of these is a criticism of hospital laboratories. They are a consequence of rarity. The remedy is a sentence from the patient."},
  {"h": "What should happen next"},
  {"p": "A clinician who suspects plague does not wait for confirmation before treating. Samples are taken, from blood, from sputum, or by aspirating a bubo, and antibiotic treatment begins on suspicion. Waiting for a laboratory result before starting treatment would defeat the purpose, because the result arrives after the window has closed.", "refs": "[12] [21]"},
  {"p": "The drugs used are aminoglycosides such as gentamicin or streptomycin, fluoroquinolones such as ciprofloxacin or levofloxacin, and tetracyclines such as doxycycline. Choice depends on the patient, the form of disease and local guidance. A patient with suspected pneumonic plague will also be isolated with droplet precautions until they have had effective treatment for a period and are improving.", "refs": "[12] [21]"},
  {"p": "Public-health authorities will be notified. Plague is a notifiable disease, and that notification is what triggers the tracing of contacts."},
  {"h": "If you are the contact rather than the patient"},
  {"p": "People who have been in close contact with a pneumonic plague patient may be offered preventive antibiotics and will be asked to monitor their temperature for a defined period. This is a decision for a clinician or a public-health officer, who will specify the drug, the dose and the duration.", "refs": "[21] [12]"},
  {"p": "Cooperate with contact tracing even if it is inconvenient. The last urban plague epidemic in the United States was in Los Angeles in 1924 and 1925. Contact tracing is one of the tools that has kept plague from spreading between people here ever since, and it works only when people take part.", "refs": "[25]"},
  {"h": "Three things not to do"},
  {"p": "Do not take antibiotics you already have in the house. A leftover course is unlikely to be the right drug, is certainly the wrong duration, and can make the laboratory diagnosis harder by suppressing growth in culture without curing the infection. In the United States these drugs require a prescription, and that requirement exists for good reasons."},
  {"p": "Do not travel past a near hospital to reach a better one. For pneumonic plague the first hours matter more than the facility. Any emergency department can begin appropriate antibiotics and can arrange transfer afterwards."},
  {"p": "Do not keep the suspicion to yourself out of embarrassment. Clinicians would far rather assess twenty people with influenza who mentioned a dead squirrel than miss the one who did not. Raising it costs nothing. Not raising it has, historically, cost a great deal."},
  {"h": "A note on proportion"},
  {"p": "Everything in this chapter is written for a situation that will not arise for the overwhelming majority of readers. Human plague in the United States is uncommon, averaging a handful of cases a year, and the measures in the following chapters reduce the chance of exposure further still.", "refs": "[25]"},
  {"p": "The purpose of knowing this is not to live in expectation of it. It is that the knowledge costs nothing to hold and is worthless if acquired afterwards."},
  {"p": "Sources for this chapter are listed at the end of the book. Medical content here is educational. It does not replace examination, diagnosis or treatment by a qualified clinician. If you believe you may have been exposed to plague, seek urgent medical care and follow the guidance of your local public-health authority."},
];
/** Bis hier ist die Leseprobe sofort sichtbar (bis zum Satz fuer das Labor), der Rest klappt auf. */
const SAMPLE_FOLD = 18;

/** Die 46 Quellen aus book.xhtml (Endstand), gekuerzt auf Autor, Titel, Ort und Jahr. Bereiche mit "to" statt Strich. */
const SOURCES = [
  'World Health Organization. Plague, fact sheet, 29 September 2026.',
  'U.S. Centers for Disease Control and Prevention. How Plague Spreads, updated 15 May 2024.',
  'Barbieri, R. et al. Yersinia pestis: The Natural History of Plague. Clinical Microbiology Reviews, 2021.',
  'Feldman, M. et al. A High-Coverage Yersinia pestis Genome from a Sixth-Century Burial. Molecular Biology and Evolution, 2016.',
  'Spyrou, M. A. et al. Ancient Yersinia pestis Genomes from across Western Europe Reveal Early Diversification during the First Pandemic (541 to 750). PNAS, 2019.',
  'Adapa, S. R. et al. Genetic Evidence of Yersinia pestis from the First Pandemic. Genes, 2025.',
  'Procopius. The Plague. History of the Wars, Book II, translated by H. B. Dewing.',
  'Mordechai, L. et al. The Justinianic Plague: An Inconsequential Pandemic? PNAS, 2019.',
  'Dean, K. R. et al. Human Ectoparasites and the Spread of Plague in Europe during the Second Pandemic. PNAS, 2018.',
  'U.S. Centers for Disease Control and Prevention. Signs and Symptoms of Plague.',
  'U.S. Centers for Disease Control and Prevention. Clinical Testing and Diagnosis for Plague, reviewed 7 October 2026.',
  'U.S. Centers for Disease Control and Prevention. Clinical Care of Plague.',
  'Popov, N. V. et al. The Epidemiological Situation on Plague in the World and the Forecast of its Development in the Russian Federation for 2025. Problems of Particularly Dangerous Infections, 2025.',
  'U.S. Centers for Disease Control and Prevention. Preventing Plague, updated 5 March 2025.',
  'UN News. Testing and Monitoring Underway in Suspected Russia Plague Death, 6 October 2026.',
  'UN News. "No Plague Case" in Siberia, Russia Tells WHO as Assessments Continue, 7 October 2026.',
  "Osborn, A. and J. Rigby. What Do We Know about the Plague Institute Lab Worker's Death in Russia? Reuters, 6 October 2026, updated 8 October 2026.",
  'Glatter, K. A. and P. Finkelman. History of the Plague: An Ancient Pandemic for the Age of COVID-19. The American Journal of Medicine, 2021.',
  'White, L. A. and L. Mordechai. Modeling the Justinianic Plague: Comparing Hypothesized Transmission Routes. PLOS ONE, 2020.',
  'Spyrou, M. A. et al. Historical Y. pestis Genomes Reveal the European Black Death as the Source of Ancient and Modern Plague Pandemics. Cell Host & Microbe, 2016.',
  'Nelson, C. A. et al. Antimicrobial Treatment and Prophylaxis of Plague: Recommendations for Naturally Acquired Infections and Bioterrorism Response. MMWR Recommendations and Reports, 2021.',
  'Galimand, M. et al. Multidrug Resistance in Yersinia pestis Mediated by a Transferable Plasmid. New England Journal of Medicine, 1997.',
  'Tourdjman, M. et al. Misidentification of Yersinia pestis by Automated Systems, Resulting in Delayed Diagnoses of Human Plague Infections: Oregon and New Mexico, 2010 to 2011. Clinical Infectious Diseases, 2012.',
  'Randremanana, R. et al. Epidemiological Characteristics of an Urban Plague Epidemic in Madagascar, August to November 2017: An Outbreak Report. The Lancet Infectious Diseases, 2019.',
  'U.S. Centers for Disease Control and Prevention. Plague: Maps and Statistics.',
  'Kehrmann, J. et al. Two Fatal Cases of Plague after Consumption of Raw Marmot Organs. Emerging Microbes & Infections, 2020.',
  "Risse, G. B. Plague, Fear, and Politics in San Francisco's Chinatown. Johns Hopkins University Press, 2012.",
  'California Department of Public Health. California Plague Compendium.',
  'U.S. Geological Survey, Fort Collins Science Center. Ecology of Plague.',
  'Boccaccio, G. The Decameron. Florence, composed c. 1349 to 1353.',
  'Defoe, D. A Journal of the Plague Year. London, 1722.',
  'Hektoen International. The Bubonic Plague in Eyam, 11 March 2020.',
  'Camus, A. La Peste (The Plague). Paris: Gallimard, 1947.',
  'Pepys, S. The Diary of Samuel Pepys, entries for 1665.',
  'Institut Pasteur. Alexandre Yersin, the Man Who Discovered the Bacterium Responsible for the Plague.',
  'Institut Pasteur. Paul-Louis Simond, World Traveler Working on Multiple Diseases.',
  'Tognotti, E. Lessons from the History of Quarantine, from Plague to Influenza A. Emerging Infectious Diseases, 2013.',
  'U.S. Centers for Disease Control and Prevention. History of Port Health.',
  'U.S. Centers for Disease Control and Prevention. Legal Authorities for Isolation and Quarantine.',
  'Jew Ho v. Williamson, 103 F. 10 (C.C.N.D. Cal. 1900).',
  "Mohr, J. C. Plague and Fire: Battling Black Death and the 1900 Burning of Honolulu's Chinatown. Oxford University Press, 2005.",
  'U.S. Federal Trade Commission. FTC, FDA Send Warning Letters to Seven Companies about Unsupported Claims that Products Can Treat or Prevent Coronavirus. Press release, 9 March 2020.',
  'U.S. Food and Drug Administration. Health Fraud Scams.',
  'World Health Organization. Infodemic.',
  'Devaux, C. A. Small Oversights That Led to the Great Plague of Marseille (1720 to 1723): Lessons from the Past. Infection, Genetics and Evolution, 2013.',
  'Bos, K. I. et al. Eighteenth Century Yersinia pestis Genomes Reveal the Long-Term Persistence of an Historical Plague Focus. eLife, 2016.',
];

/* FAQ als Einwandbehandlung direkt vor dem letzten Knopf. */
const FAQ = [
  {
    q: 'How do I get the book?',
    a: "Right after payment you can download it, and Gumroad also emails you the link. You don't need an account, and there is nothing to ship.",
  },
  {
    q: 'Which formats do I get?',
    a: 'Both a PDF and an EPUB. The PDF carries your email address on each page.',
  },
  {
    q: 'Will it work on my phone?',
    a: 'Yes. The PDF opens on phones and computers alike, and the EPUB suits e-readers and reading apps such as Apple Books.',
  },
  {
    q: 'Can I get a refund?',
    a: 'No. The book is a digital download that reaches you as soon as payment goes through, so all sales are final. Chapter 14 is on this page in full, so you can read a whole chapter before you decide. If your download does not arrive or will not open, reply to your receipt and we will sort it out.',
  },
  {
    q: 'Is this medical advice?',
    a: 'No. The book is for general information and education. It does not replace a physician, and it points you to public-health authorities for anything current. A suspected exposure belongs with a doctor.',
  },
  {
    q: 'Who is The Richter Group?',
    a: 'An independent publisher. The book is not affiliated with or endorsed by the WHO, the United Nations, the CDC or any government or research institute.',
  },
];

const BuyButton = ({ children, wide = false }: { children: ReactNode; wide?: boolean }) => (
  <a href={CHECKOUT_URL} className={wide ? 'pl-buy pl-buy-wide' : 'pl-buy'}>
    {children}
  </a>
);

/** Schluessel im sessionStorage fuer die Sprache, mit der der Besucher kam. */
const ORIG_LANG_KEY = 'plague-orig-lang';

/* Einstieg fuer Besucher, die wegen der Berichte aus Russland kommen.
   Anzeigen mit Russland-Bezug haengen angle=russia an den Link (oder ein
   utm-Wert enthaelt "russia"). Dann spricht die Hero-Zeile zuerst Russland an
   und schlaegt die Bruecke zu den USA. Ohne Parameter bleibt alles wie gehabt. */
const kommtWegenRussland = () => {
  try {
    const p = new URLSearchParams(window.location.search);
    return p.get('angle') === 'russia' || Array.from(p.values()).some((v) => /russia/i.test(v));
  } catch {
    return false;
  }
};

const PlaguePage = () => {
  const heroCta = useRef<HTMLDivElement>(null);
  const [russland] = useState(kommtWegenRussland);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sampleOpen, setSampleOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [bannerUp, setBannerUp] = useState(false);

  const { setLang } = useLang();

  /* Die Seite ist englisch. Die Sprache der Website wird fuer die Dauer des
     Besuchs auf Englisch gestellt, damit auch das Einwilligungsbanner englisch
     spricht und html lang="en" stimmt.
     Die urspruengliche Sprache merkt sich die Seite beim ersten Aufruf im
     Tab (sessionStorage). Beim Wechsel auf die Startseite und beim Schliessen
     des Tabs kommt sie zurueck, sonst stuende die deutsche Startseite beim
     naechsten Besuch auf Englisch. Nur wer von hier auf Datenschutz oder
     Impressum klickt, liest dort weiter auf Englisch. */
  useEffect(() => {
    const prevTitle = document.title;
    let orig = 'none';
    try {
      const saved = sessionStorage.getItem(ORIG_LANG_KEY);
      if (saved !== null) orig = saved;
      else {
        orig = localStorage.getItem('lang') ?? 'none';
        sessionStorage.setItem(ORIG_LANG_KEY, orig);
      }
    } catch { /* ohne Speicher bleibt es beim Standard */ }
    const restoreStored = () => {
      try {
        if (orig === 'none') localStorage.removeItem('lang');
        else localStorage.setItem('lang', orig);
      } catch { /* ohne Speicher egal */ }
    };

    document.title = 'The Secret Knowledge of the Plague | The Richter Group';
    setLang('en');
    window.scrollTo(0, 0);
    window.addEventListener('pagehide', restoreStored);
    return () => {
      window.removeEventListener('pagehide', restoreStored);
      document.title = prevTitle;
      if (/^#\/(privacy|impressum)/.test(window.location.hash)) {
        window.addEventListener('pagehide', restoreStored, { once: true });
      } else {
        setLang(orig === 'en' ? 'en' : 'de');
      }
    };
  }, [setLang]);

  /* Feste Kaufleiste auf dem Handy: erscheint erst, wenn der Kaufknopf im
     ersten Bildschirm nach oben weggescrollt ist. */
  useEffect(() => {
    const el = heroCta.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Solange das Einwilligungsbanner steht (fest unten, z-[60], auf dem Handy
     rund 244 px), gibt es dem body ein padding-bottom. Dann bleibt die Leiste
     weg, damit kein Kaufknopf hinter dem Banner liegt. Der Knopf in der
     Kopfzeile bleibt sichtbar. */
  useEffect(() => {
    const read = () => setBannerUp(parseInt(document.body.style.paddingBottom || '0', 10) > 0);
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => mo.disconnect();
  }, []);

  /* Die Seite laeuft unter dem HashRouter. Ein normaler Anker wie #sample
     wuerde dort als Route gelesen und auf die Startseite umleiten, deshalb
     springt der Knopf per scrollIntoView. */
  const toSample = () => document.getElementById('sample')?.scrollIntoView({ behavior: 'smooth' });

  const shown = sampleOpen ? SAMPLE : SAMPLE.slice(0, SAMPLE_FOLD);

  return (
    <div className="pl-root">
      <style>{`
        .pl-root {
          --page: #0D141C;
          --panel: #121B26;
          --edge: #253244;
          --fg: #E9E2D2;
          --soft: #C6CED8;
          --muted: #8E9AAA;
          --brick: #A4512F;
          --gold: #C8974B;
          --light: #ECE5D5;
          --light-ink: #24211B;
          --serif: Georgia, 'Iowan Old Style', 'Times New Roman', serif;
          background: var(--page);
          color: var(--fg);
          font-family: Inter, system-ui, sans-serif;
          overflow-x: clip;
        }
        @media (max-width: 759px) { .pl-root { padding-bottom: 76px; } }
        .pl-root h1, .pl-root h2, .pl-root h3 { font-family: var(--serif); font-weight: 400; letter-spacing: -0.012em; }
        .pl-wrap { width: 100%; max-width: 1120px; margin: 0 auto; padding: 0 20px; }
        .pl-col { max-width: 720px; }

        .pl-bar { position: sticky; top: 0; z-index: 40; background: rgba(13,20,28,.94); border-bottom: 1px solid var(--edge); }
        .pl-bar-in { display: flex; align-items: center; justify-content: space-between; gap: 14px; height: 60px; }
        .pl-bar-id { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .pl-bar-id img { width: 30px; height: 45px; object-fit: cover; border: 1px solid rgba(233,226,210,.18); flex: 0 0 auto; }
        .pl-bar-title { font-family: var(--serif); font-size: 14px; line-height: 1.25; max-width: 170px; }
        @media (min-width: 640px) { .pl-bar-title { max-width: none; font-size: 15px; } }
        .pl-wide-only { display: none; }
        @media (min-width: 640px) { .pl-wide-only { display: inline; } }

        .pl-buy {
          display: inline-flex; align-items: center; justify-content: center;
          background: var(--gold); color: #10161E; border: 1px solid #D9AD66;
          font-weight: 650; font-size: 15px; line-height: 1.1; text-align: center;
          padding: 15px 22px; border-radius: 3px; white-space: nowrap;
          transition: background-color .15s ease;
        }
        .pl-buy:hover { background: #DAAE68; }
        .pl-buy:focus-visible, .pl-link:focus-visible, .pl-faq-q:focus-visible, .pl-more:focus-visible { outline: 2px solid var(--fg); outline-offset: 3px; }
        .pl-buy-wide { display: flex; width: 100%; padding: 18px 22px; font-size: 17px; }
        .pl-bar .pl-buy { padding: 10px 14px; font-size: 13.5px; }
        .pl-cta { margin-top: 32px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; }
        .pl-cta-note { font-size: 13px; color: var(--muted); }

        .pl-link { color: var(--fg); border-bottom: 1px solid rgba(233,226,210,.4); padding-bottom: 2px; font-size: 15px; background: none; cursor: pointer; }
        .pl-link:hover { color: var(--gold); border-color: var(--gold); }

        .pl-note-s { font-size: 13px; line-height: 1.6; color: var(--muted); }
        .pl-lede { font-size: clamp(17px, 2.1vw, 19px); line-height: 1.65; color: var(--soft); }
        .pl-body { font-size: 16.5px; line-height: 1.7; color: var(--soft); }

        .pl-hero { padding: 40px 0 56px; }
        .pl-hero h1 { font-size: clamp(36px, 6vw, 64px); line-height: 1.04; margin-bottom: 20px; }
        .pl-hero-grid { display: grid; gap: 44px; }
        .pl-by { font-family: var(--serif); font-style: italic; color: var(--gold); font-size: 17px; margin-bottom: 14px; }
        @media (min-width: 900px) {
          .pl-hero { padding: 76px 0 92px; }
          .pl-hero-grid { grid-template-columns: 1.2fr .8fr; align-items: center; gap: 64px; }
        }
        .pl-cover { width: 100%; max-width: 300px; height: auto; display: block; margin: 0 auto;
          box-shadow: 0 28px 64px rgba(0,0,0,.6); border: 1px solid rgba(233,226,210,.14); }
        @media (min-width: 900px) { .pl-cover { max-width: 100%; } }

        .pl-sec { padding: 56px 0; border-top: 1px solid var(--edge); }
        @media (min-width: 900px) { .pl-sec { padding: 84px 0; } }
        .pl-sec h2 { font-size: clamp(28px, 3.8vw, 42px); line-height: 1.12; }

        .pl-maps { display: grid; gap: 18px; }
        @media (min-width: 760px) { .pl-maps { grid-template-columns: 1fr 1fr; } }
        .pl-mapcard { background: var(--panel); border: 1px solid var(--edge); padding: 18px 18px 20px; }
        .pl-mapcard h3 { font-size: 19px; margin-bottom: 12px; }
        .pl-map { width: 100%; height: auto; display: block; }
        .pl-map-label { font-family: Inter, sans-serif; font-weight: 600; font-size: 24px; fill: #F4EADF; }
        .pl-map-q { font-family: var(--serif); font-size: 330px; fill: #C8974B; opacity: .9; }
        .pl-question { font-size: clamp(26px, 3.6vw, 40px); line-height: 1.18; max-width: 820px; }

        /* Lies es, bevor du es brauchst */
        .pl-before { display: grid; gap: 28px; }
        @media (min-width: 900px) { .pl-before { grid-template-columns: .9fr 1.1fr; gap: 64px; align-items: start; } }
        .pl-quote { margin-top: 26px; padding: 22px 24px; background: var(--light); color: var(--light-ink); border: 1px solid #C9BFA7; }
        .pl-quote blockquote { font-family: var(--serif); font-size: 21px; line-height: 1.35; color: #1C1A15; }
        .pl-quote figcaption { margin-top: 10px; font-family: var(--serif); font-style: italic; font-size: 14px; color: #6E6654; }
        .pl-if { border-top: 1px solid var(--edge); }
        .pl-if-row { padding: 18px 0; border-bottom: 1px solid var(--edge); }
        .pl-if-row dt { font-family: var(--serif); font-size: 20px; line-height: 1.3; color: var(--fg); }
        .pl-if-row dd { margin: 6px 0 0; font-size: 15.5px; line-height: 1.6; color: var(--soft); }
        .pl-if-ch { display: block; margin-top: 4px; font-size: 13px; color: var(--gold); }

        /* Was du danach weisst */
        .pl-know { margin-top: 32px; display: grid; gap: 0 48px; counter-reset: k; }
        @media (min-width: 900px) { .pl-know { grid-template-columns: 1fr 1fr; } }
        .pl-know li { display: grid; grid-template-columns: 34px 1fr; gap: 10px; padding: 16px 0; border-bottom: 1px solid var(--edge); }
        .pl-know li::before { counter-increment: k; content: counter(k); font-family: var(--serif); font-size: 22px; line-height: 1.1; color: var(--gold); }
        .pl-know p { font-size: 17px; line-height: 1.5; color: var(--fg); }
        .pl-know small { display: block; margin-top: 4px; font-size: 13px; color: var(--muted); }
        .pl-proof { margin-top: 28px; padding: 18px 20px; border: 1px solid #3A4A60; font-size: 15px; line-height: 1.65; color: var(--soft); max-width: 820px; }
        .pl-proof b { color: var(--fg); font-weight: 600; }

        /* Fuer wen */
        .pl-who { margin-top: 30px; border-top: 1px solid var(--edge); }
        .pl-who li { padding: 16px 0; border-bottom: 1px solid var(--edge); }
        @media (min-width: 900px) { .pl-who li { display: grid; grid-template-columns: 420px 1fr; gap: 40px; align-items: baseline; } }
        .pl-who strong { font-family: var(--serif); font-weight: 400; font-size: 19px; line-height: 1.35; color: var(--fg); }
        .pl-who span { display: block; margin-top: 4px; font-size: 15px; line-height: 1.6; color: var(--soft); }
        @media (min-width: 900px) { .pl-who span { margin-top: 0; } }

        /* Warum jetzt */
        .pl-now { display: grid; gap: 28px; }
        @media (min-width: 900px) { .pl-now { grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; } }

        /* Leseprobe */
        .pl-page { background: var(--light); color: var(--light-ink); font-family: var(--serif); padding: 30px 22px 18px; border: 1px solid #C9BFA7; box-shadow: 0 22px 56px rgba(0,0,0,.45); position: relative; }
        @media (min-width: 760px) { .pl-page { padding: 54px 60px 34px; } }
        .pl-page-head { font-size: 13px; color: #6E6654; font-style: italic; margin-bottom: 8px; }
        .pl-page h3 { font-size: 25px; line-height: 1.2; margin-bottom: 22px; color: #1C1A15; }
        .pl-page h4 { font-family: var(--serif); font-size: 19px; line-height: 1.3; margin: 28px 0 12px; color: #1C1A15; }
        .pl-page p { font-size: 17px; line-height: 1.75; margin-bottom: 16px; }
        .pl-page p.pl-first::first-letter { float: left; font-size: 60px; line-height: .8; padding: 6px 8px 0 0; color: #7E3A22; }
        .pl-page p.pl-said { padding-left: 16px; border-left: 2px solid #B9AE95; font-style: italic; }
        .pl-ref { font-family: Inter, sans-serif; font-size: 11.5px; color: #8A8170; white-space: nowrap; }
        .pl-fade { position: absolute; left: 0; right: 0; bottom: 0; height: 120px; background: linear-gradient(rgba(236,229,213,0), var(--light)); pointer-events: none; }
        .pl-more { display: block; margin: 8px auto 0; position: relative; font-family: Inter, sans-serif; font-size: 15px; font-weight: 600; color: #7E3A22; border-bottom: 1px solid #7E3A22; padding-bottom: 2px; }

        /* Preis */
        .pl-offer { display: grid; gap: 32px; }
        @media (min-width: 900px) { .pl-offer { grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; } }
        .pl-price { background: var(--panel); border: 1px solid var(--edge); padding: 28px 22px; }
        @media (min-width: 760px) { .pl-price { padding: 38px; } }
        .pl-price-head { display: flex; gap: 18px; align-items: center; }
        .pl-price-head img { width: 64px; height: 96px; object-fit: cover; border: 1px solid rgba(233,226,210,.18); flex: 0 0 auto; }
        .pl-amount { font-family: var(--serif); font-size: 60px; line-height: 1; }
        .pl-incl li { padding: 11px 0; border-bottom: 1px solid var(--edge); color: var(--soft); line-height: 1.55; }
        .pl-incl li:last-child { border-bottom: 0; }
        .pl-details { border-top: 1px solid var(--edge); }
        .pl-details summary { cursor: pointer; list-style: none; padding: 18px 0; display: flex; justify-content: space-between; gap: 16px; font-family: var(--serif); font-size: 19px; color: var(--fg); }
        .pl-details summary::-webkit-details-marker { display: none; }
        .pl-details summary::after { content: '+'; color: var(--gold); font-family: Inter, sans-serif; font-size: 22px; line-height: 1; }
        .pl-details[open] summary::after { content: '\\2212'; }
        .pl-details:last-of-type { border-bottom: 1px solid var(--edge); }
        .pl-part { font-size: 13px; color: var(--gold); margin: 6px 0 6px; }
        .pl-toc { margin-bottom: 18px; counter-reset: c; }
        .pl-toc li { padding: 6px 0; font-family: var(--serif); font-size: 16px; line-height: 1.4; color: var(--soft); }
        .pl-sources { padding-bottom: 18px; }
        .pl-sources li { display: grid; grid-template-columns: 30px 1fr; font-size: 13.5px; line-height: 1.55; color: var(--soft); padding: 5px 0; }
        .pl-sources li span:first-child { color: var(--muted); }

        .pl-faq-q { width: 100%; text-align: left; display: flex; justify-content: space-between; gap: 16px; align-items: baseline; padding: 18px 0; font-family: var(--serif); font-size: 19px; color: var(--fg); }
        .pl-faq-q i { font-style: normal; color: var(--gold); font-family: Inter, sans-serif; font-size: 22px; line-height: 1; }
        .pl-faq-a { padding: 0 0 20px; color: var(--soft); line-height: 1.7; max-width: 62ch; }
        .pl-faq-item { border-bottom: 1px solid var(--edge); }

        .pl-medical { background: var(--light); color: var(--light-ink); padding: 26px 22px; border: 2px solid var(--brick); }
        @media (min-width: 760px) { .pl-medical { padding: 34px 38px; } }
        .pl-medical h2 { font-size: 24px !important; line-height: 1.25; margin-bottom: 12px; color: #1C1A15; }
        .pl-medical p { font-size: 16.5px; line-height: 1.7; }
        .pl-medical strong { color: #7E3A22; }

        /* Feste Kaufleiste, nur auf dem Handy */
        .pl-sticky { position: fixed; left: 0; right: 0; bottom: 0; z-index: 45; display: flex; align-items: center; justify-content: space-between; gap: 12px;
          padding: 10px 16px calc(10px + env(safe-area-inset-bottom)); background: rgba(13,20,28,.97); border-top: 1px solid var(--edge); }
        .pl-sticky b { display: block; font-family: var(--serif); font-weight: 400; font-size: 20px; line-height: 1.1; }
        .pl-sticky span { display: block; font-size: 12px; color: var(--muted); }
        .pl-sticky .pl-buy { padding: 12px 18px; }
        @media (min-width: 760px) { .pl-sticky { display: none; } }

        .pl-foot { padding: 34px 0 60px; border-top: 1px solid var(--edge); color: var(--muted); font-size: 13.5px; line-height: 1.8; }
        .pl-foot a { color: var(--fg); text-decoration: underline; text-underline-offset: 3px; }
      `}</style>

      <header className="pl-bar">
        <div className="pl-wrap pl-bar-in">
          <div className="pl-bar-id">
            <img src="/images/plague-cover-sm.webp" alt="" width={30} height={45} />
            <p className="pl-bar-title">The Secret Knowledge of the Plague</p>
          </div>
          <BuyButton>
            Get the book<span className="pl-wide-only">, {PRICE}</span>
          </BuyButton>
        </div>
      </header>

      <main>
        <section className="pl-hero">
          <div className="pl-wrap pl-hero-grid">
            <div>
              {russland ? (
                <>
                  <p className="pl-by">The plague reports from Russia, October 2026</p>
                  <h1>Plague is in the news from Russia. In America it never left.</h1>
                  <p className="pl-lede">
                    By 9 October Russia had found no evidence of plague in the Irkutsk case. The CDC still
                    counts about five U.S. cases a year. This book tells you what to do if it ever comes
                    close to you.
                  </p>
                </>
              ) : (
                <>
                  <p className="pl-by">A history and public-health book from The Richter Group</p>
                  <h1>Plague is still an American disease.</h1>
                  <p className="pl-lede">
                    The CDC counts an average of five new human cases a year in the United States, almost
                    all of them in the rural West. This book tells you what to do if it ever comes close
                    to you, down to the sentence you say at the ER desk.
                  </p>
                </>
              )}
              <div className="pl-cta" ref={heroCta}>
                <BuyButton>Get the book for {PRICE}</BuyButton>
                <button type="button" className="pl-link" onClick={toSample}>
                  Read Chapter 14 free
                </button>
              </div>
              <p className="pl-note-s mt-5">Instant download as PDF and EPUB. Current to 9 October 2026.</p>
            </div>

            <div>
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/plague-cover-sm.webp 380w, /images/plague-cover.webp 760w"
                  sizes="(min-width: 900px) 360px, 300px"
                />
                <img
                  src="/images/plague-cover.jpg"
                  srcSet="/images/plague-cover-sm.jpg 380w, /images/plague-cover.jpg 760w"
                  sizes="(min-width: 900px) 360px, 300px"
                  width={760}
                  height={1140}
                  fetchPriority="high"
                  alt="Book cover: a parchment map of the Mediterranean breaking apart into an engraved flea above the walls of Constantinople"
                  className="pl-cover"
                />
              </picture>
            </div>
          </div>
        </section>

        {/* Zwei Karten, die Frage darunter. Die Frage betrifft den Leser und
            behauptet nichts ueber die Zukunft. Bewusst ohne COVID-Vergleich und
            ohne "wenn es die USA erreicht": Die Pest ist seit 1900 hier. */}
        <section className="pl-sec">
          <div className="pl-wrap">
            <div className="pl-maps">
              <figure className="pl-mapcard">
                <h3>Where plague turns up in the U.S.</h3>
                <UsMap />
                <figcaption className="pl-note-s mt-4">
                  Most human cases come from two areas: northern New Mexico, northern Arizona and
                  southern Colorado, and a second one reaching from California into southern Oregon and
                  far western Nevada. Whole states are shaded. The cases come from rural parts of them.
                  Source: the CDC page Plague Maps and Statistics.
                </figcaption>
              </figure>

              <figure className="pl-mapcard">
                <h3>What you would do on day one</h3>
                <UsMap question />
                <figcaption className="pl-note-s mt-4">
                  No agency publishes this map. It depends on what you notice and what you say when
                  you reach a doctor.
                </figcaption>
              </figure>
            </div>

            <h2 className="pl-question mt-12">
              Would you recognize it in time, and would you know what to tell the ER?
            </h2>
            <p className="pl-lede pl-col mt-5">
              Plague has lived in the wild rodents of the West since the early 1900s, and it can be
              cured with antibiotics when they start early. The danger is the delay. The first fever
              can look like flu, and a patient may never mention the dead animal they handled. Part
              Two of the book is about closing that gap.
            </p>
            <div className="pl-cta">
              <BuyButton>Get the book for {PRICE}</BuyButton>
            </div>
          </div>
        </section>

        {/* Kaufgrund 1: Nutzen im Ernstfall, und dass man es VORHER gelesen haben
            muss. Bedingt formuliert. 18 bis 24 Stunden: WHO-Faktenblatt
            29.09.2026. Das Zitat steht am Ende von Kapitel 14. */}
        <section className="pl-sec">
          <div className="pl-wrap pl-before">
            <div>
              <h2>Read it before you need it.</h2>
              <p className="pl-lede mt-5">
                Untreated pneumonic plague can be fatal within 18 to 24 hours of the first symptom,
                according to the WHO. Nobody reads a book then. The right moment is now,
                while nothing is wrong.
              </p>
              <figure className="pl-quote">
                <blockquote>&ldquo;&hellip;the knowledge costs nothing to hold and is worthless if acquired afterwards.&rdquo;</blockquote>
                <figcaption>From Chapter Fourteen</figcaption>
              </figure>
            </div>
            <div>
              <p className="pl-body">If plague ever turns up near you or in the news, this is what you will already have:</p>
              <dl className="pl-if mt-4">
                {IF_ROWS.map((r) => (
                  <div className="pl-if-row" key={r.when}>
                    <dt>{r.when}</dt>
                    <dd>
                      {r.know}
                      <span className="pl-if-ch">{r.ch}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="pl-note-s mt-4">
                The book does not replace a doctor and protects nobody on its own. It helps you reach
                the right care with the right words.
              </p>
              <div className="pl-cta">
                <BuyButton>Get the book now for {PRICE}</BuyButton>
              </div>
            </div>
          </div>
        </section>

        {/* Kaufgrund 2: konkrete Ergebnisse aus Teil Zwei. Oregon-Beleg nach CDC
            MMWR vom 25.02.2011 (mm6007a4). */}
        <section className="pl-sec">
          <div className="pl-wrap">
            <h2 className="pl-col">After Part Two, you will know</h2>
            <ol className="pl-know">
              {OUTCOMES.map(([text, ch]) => (
                <li key={text}>
                  <p>
                    {text}
                    <small>Chapter {ch}</small>
                  </p>
                </li>
              ))}
            </ol>
            <p className="pl-proof">
              <b>Why the lab sentence matters.</b> In Oregon in 2010, automated lab systems named the
              bacterium in one patient&rsquo;s blood as three different wrong organisms. Plague had not
              been suspected. A reference laboratory confirmed it 25 days after the sample was taken.
              Source: CDC, MMWR, 25 February 2011.
            </p>
            <div className="pl-cta">
              <BuyButton>Get the book for {PRICE}</BuyButton>
              <button type="button" className="pl-link" onClick={toSample}>
                Read Chapter 14 first
              </button>
            </div>
          </div>
        </section>

        <section className="pl-sec">
          <div className="pl-wrap">
            <h2 className="pl-col">Who this book is for</h2>
            <ul className="pl-who">
              {AUDIENCE.map(([who, why]) => (
                <li key={who}>
                  <strong>{who}</strong>
                  <span>{why}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ehrlicher Zeitbezug. Keine Countdown-Uhr, keine kuenstliche Knappheit.
            Zahlen: UN News 6./7.10.2026, Reuters 8.10.2026. */}
        <section className="pl-sec">
          <div className="pl-wrap pl-now">
            <div>
              <h2>Why now</h2>
              <p className="pl-body mt-5">
                In early October 2026 a lab worker at a Russian institute that studies dangerous
                pathogens died of pneumonia of unknown cause. The rumors came fast. Plague has been
                in the headlines since. By 7 October Russia had told the WHO it found no evidence of plague, and about
                200 contacts were in quarantine as a precaution. On 9 October the cause of death was
                still unresolved.
              </p>
              <p className="pl-note-s mt-4">Sources: UN News, 6 and 7 October 2026. Reuters, updated 8 October 2026.</p>
            </div>
            <div>
              <p className="pl-body">
                The book covers it. It is current to 9 October 2026, and Chapter Ten sets out what was reported and
                what was not, under the title A Report, Not a Verdict. Chapter Eighteen shows how to
                read the next report that comes along.
              </p>
              <p className="pl-body mt-4">
                That is the honest reason to read it this month. There is no countdown and no limited
                stock.
              </p>
              <div className="pl-cta">
                <BuyButton>Get the book for {PRICE}</BuyButton>
              </div>
            </div>
          </div>
        </section>

        <section className="pl-sec" id="sample">
          <div className="pl-wrap">
            <div className="pl-col">
              <h2>Read Chapter 14 free.</h2>
              <p className="pl-lede mt-5">
                The First Twenty-Four Hours is the chapter Part Two is built around. It is printed
                here in full, with the book&rsquo;s source numbers.
              </p>
            </div>

            <div className="pl-col mt-10">
              <article className="pl-page" aria-label="Free sample: Chapter Fourteen">
                <p className="pl-page-head">Chapter Fourteen</p>
                <h3>The First Twenty-Four Hours</h3>
                {shown.map((b, i) =>
                  b.h ? (
                    <h4 key={i}>{b.h}</h4>
                  ) : (
                    <p
                      key={i}
                      className={i === 0 ? 'pl-first' : b.p && b.p.startsWith('“') ? 'pl-said' : undefined}
                    >
                      {b.p}
                      {b.refs && <span className="pl-ref"> {b.refs}</span>}
                    </p>
                  ),
                )}
                {!sampleOpen && <div className="pl-fade" aria-hidden />}
              </article>
              {!sampleOpen && (
                <button type="button" className="pl-more pl-link" onClick={() => setSampleOpen(true)}>
                  Read the rest of Chapter 14
                </button>
              )}
              <div className="pl-cta">
                <BuyButton>Get the other 23 chapters for {PRICE}</BuyButton>
              </div>
            </div>
          </div>
        </section>

        {SHOW_READER_NOTES && (
          <section className="pl-sec">
            <div className="pl-wrap pl-col">
              <h2>What readers say</h2>
              {READER_NOTES.map((n, i) => (
                <figure key={i} className="mt-6">
                  <blockquote className="pl-body">{n.quote}</blockquote>
                  <figcaption className="pl-note-s">{n.name}, {n.place}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Preis begruenden: was es fuer $19.99 gibt. Inhalt und Quellen klappen auf. */}
        <section className="pl-sec" id="buy">
          <div className="pl-wrap pl-offer">
            <div className="pl-price">
              <div className="pl-price-head">
                <img src="/images/plague-cover-sm.webp" alt="" width={64} height={96} />
                <div>
                  <h2 style={{ fontSize: '25px', lineHeight: 1.2 }}>What {PRICE} gets you</h2>
                  <p className="pl-note-s mt-1">The Secret Knowledge of the Plague, The Richter Group</p>
                </div>
              </div>
              <ul className="pl-incl mt-6">
                <li>24 chapters in two parts: the history of plague, then what to do</li>
                <li>Two appendices: a timeline of plague and a guide to reliable information</li>
                <li>A glossary of 51 terms and 46 numbered sources</li>
                <li>PDF and EPUB, ready to download the moment you pay</li>
                <li>Readable on any phone, tablet, e-reader or computer</li>
              </ul>
              <p className="mt-6">
                <span className="pl-amount">{PRICE}</span>
                <span className="pl-note-s ml-2">USD, paid once</span>
              </p>
              <div className="mt-6">
                <BuyButton wide>Get the book for {PRICE}</BuyButton>
              </div>
              <p className="pl-note-s mt-3 text-center">
                Secure checkout by Gumroad. Sales tax, if any, is shown before you pay.
              </p>
            </div>

            <div>
              <details className="pl-details">
                <summary>See all 24 chapters</summary>
                <p className="pl-part">Part One: The Disease and Its History</p>
                <ol className="pl-toc">
                  {PART_ONE.map((t) => <li key={t}>{t}</li>)}
                </ol>
                <p className="pl-part">Part Two: What to Do</p>
                <ol className="pl-toc">
                  {PART_TWO.map((t) => <li key={t}>{t}</li>)}
                </ol>
                <p className="pl-part">After the chapters</p>
                <ul className="pl-toc">
                  {BACK_MATTER.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </details>
              <details className="pl-details">
                <summary>See all {SOURCES.length} sources</summary>
                <ol className="pl-sources">
                  {SOURCES.map((s, i) => (
                    <li key={s}>
                      <span>{i + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </details>
              <p className="pl-note-s mt-5">
                Every claim in the book carries a numbered reference. The news sources carry their
                dates, because an investigation can change after a book goes out.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ als Einwandbehandlung, direkt vor dem letzten Knopf. */}
        <section className="pl-sec">
          <div className="pl-wrap pl-col">
            <h2 className="mb-6">Before you buy</h2>
            {FAQ.map((item, i) => (
              <div className="pl-faq-item" key={item.q}>
                <button
                  type="button"
                  className="pl-faq-q"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <i aria-hidden>{openFaq === i ? '−' : '+'}</i>
                </button>
                {openFaq === i && <p className="pl-faq-a">{item.a}</p>}
              </div>
            ))}
            <div className="mt-9">
              <BuyButton wide>Get the book for {PRICE}</BuyButton>
            </div>
            <p className="pl-note-s mt-3 text-center">
              Digital download, so all sales are final. Chapter 14 is free to read above.
            </p>
          </div>
        </section>

        {/* Pflichthinweis. Inhalt nach dem Rechtshinweis des Buchs
            (title.xhtml, "Important notice"). */}
        <section className="pl-sec">
          <div className="pl-wrap pl-col">
            <div className="pl-medical" role="note">
              <h2>This book is for general information and education. It is not medical advice.</h2>
              <p>
                It does not replace a physician, and reading it creates no doctor-patient
                relationship. Do not use it to diagnose or treat any illness, and do not stock or take
                prescription medicines because of anything in it.
              </p>
              <p className="mt-4">
                If you think you may have been exposed to plague, or you get a sudden fever after
                handling a wild animal or being near someone with a severe cough,{' '}
                <strong>get medical help now.</strong> Call 911 or your doctor, say where you have been
                and what you touched, and follow the instructions of your care team and public-health
                authorities.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="pl-foot">
        <div className="pl-wrap">
          <p>Copyright 2026 The Richter Group. Current-event reporting in the book is assessed through 9 October 2026.</p>
          <p className="mt-2 flex flex-wrap gap-x-5">
            <Link to="/impressum">Imprint</Link>
            <Link to="/privacy">Privacy</Link>
          </p>
        </div>
      </footer>

      {pastHero && !bannerUp && (
        <div className="pl-sticky">
          <div>
            <b>{PRICE}</b>
            <span>PDF and EPUB, instant download</span>
          </div>
          <BuyButton>Get the book</BuyButton>
        </div>
      )}
    </div>
  );
};

export default PlaguePage;
