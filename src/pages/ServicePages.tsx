import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';

// --- Shared Layout ---
const ServiceLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="bg-primary px-8 py-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
          </div>
          <div className="p-8 md:p-12">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Contact Page ---
export const Contact: React.FC = () => {
  return (
    <ServiceLayout title="Kontaktieren Sie uns">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Unsere Kontaktdaten</h3>
            <p className="text-gray-600 mb-6">
              Haben Sie Fragen oder Anregungen? Unser Team steht Ihnen gerne zur Verfügung.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary shrink-0 mr-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-gray-900">Adresse</span>
                  <span className="text-gray-600">Musterstraße 123<br />10115 Berlin, Deutschland</span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary shrink-0 mr-4">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-gray-900">Telefon</span>
                  <span className="text-gray-600">+49 30 12345678</span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary shrink-0 mr-4">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-gray-900">E-Mail</span>
                  <span className="text-gray-600">info@fashionshop.de</span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary shrink-0 mr-4">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-gray-900">Öffnungszeiten</span>
                  <span className="text-gray-600">Mo - Fr: 09:00 - 18:00 Uhr</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl">
          <h3 className="text-xl font-bold text-primary mb-6">Nachricht senden</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none" placeholder="Ihr Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none" placeholder="ihre@email.de" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Betreff</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none" placeholder="Worum geht es?" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nachricht</label>
              <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none" placeholder="Ihre Nachricht an uns..."></textarea>
            </div>
            <Button className="w-full">Nachricht absenden</Button>
          </form>
        </div>
      </div>
    </ServiceLayout>
  );
};

// --- Shipping Page ---
export const Shipping: React.FC = () => {
  return (
    <ServiceLayout title="Versand & Rückgabe">
      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Versandinformationen</h2>
          <p className="mb-4">
            Wir versenden unsere Produkte weltweit. Die Versandkosten und Lieferzeiten variieren je nach Zielort.
            Bestellungen, die vor 14:00 Uhr eingehen, werden in der Regel noch am selben Tag bearbeitet.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 font-bold text-primary">Region</th>
                  <th className="pb-3 font-bold text-primary">Kosten</th>
                  <th className="pb-3 font-bold text-primary">Lieferzeit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3">Deutschland</td>
                  <td className="py-3">4,95 € (Kostenlos ab 50 €)</td>
                  <td className="py-3">2-3 Werktage</td>
                </tr>
                <tr>
                  <td className="py-3">Österreich & Schweiz</td>
                  <td className="py-3">9,95 €</td>
                  <td className="py-3">3-5 Werktage</td>
                </tr>
                <tr>
                  <td className="py-3">Restliches Europa</td>
                  <td className="py-3">14,95 €</td>
                  <td className="py-3">5-7 Werktage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Rückgaberecht</h2>
          <p className="mb-4">
            Sie können Artikel innerhalb von <strong>30 Tagen</strong> nach Erhalt ohne Angabe von Gründen an uns zurücksenden.
            Die Artikel müssen ungetragen, ungewaschen und mit allen Originaletiketten versehen sein.
          </p>
          <h3 className="text-lg font-bold text-primary mb-2">So funktioniert die Rücksendung:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Melden Sie die Rücksendung in Ihrem Kundenkonto an.</li>
            <li>Drucken Sie das Rücksendeetikett aus.</li>
            <li>Verpacken Sie die Artikel sicher im Originalkarton.</li>
            <li>Kleben Sie das Etikett auf das Paket und bringen Sie es zur Post.</li>
          </ol>
        </section>
      </div>
    </ServiceLayout>
  );
};

// --- FAQ Page ---
export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "Wie kann ich meine Bestellung verfolgen?",
      a: "Nach dem Versand erhalten Sie eine E-Mail mit einer Sendungsverfolgungsnummer, mit der Sie den Status Ihrer Lieferung jederzeit einsehen können."
    },
    {
      q: "Welche Zahlungsarten werden akzeptiert?",
      a: "Wir akzeptieren Kreditkarten (Visa, Mastercard), PayPal, Sofortüberweisung und Kauf auf Rechnung."
    },
    {
      q: "Kann ich meine Bestellung ändern oder stornieren?",
      a: "Solange die Bestellung noch nicht versandt wurde, können Sie Änderungen vornehmen. Bitte kontaktieren Sie dazu schnellstmöglich unseren Kundenservice."
    },
    {
      q: "Wie fallen die Größen aus?",
      a: "Unsere Kleidung fällt in der Regel normal aus. Detaillierte Maße finden Sie in unserer Größentabelle auf der jeweiligen Produktseite oder im Service-Bereich."
    },
    {
      q: "Gibt es einen Mindestbestellwert?",
      a: "Nein, bei uns gibt es keinen Mindestbestellwert."
    }
  ];

  return (
    <ServiceLayout title="Häufig gestellte Fragen">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.q} answer={faq.a} />
        ))}
      </div>
    </ServiceLayout>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-bold text-primary">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-accent" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden bg-gray-50"
      >
        <div className="p-4 text-gray-600 text-sm leading-relaxed border-t border-gray-200">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

// --- Size Guide Page ---
export const SizeGuide: React.FC = () => {
  return (
    <ServiceLayout title="Größentabelle">
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
            <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">H</span>
            Herren
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center border-collapse border border-gray-200">
              <thead className="bg-gray-50 text-primary">
                <tr>
                  <th className="p-3 border border-gray-200">Größe</th>
                  <th className="p-3 border border-gray-200">Brustumfang (cm)</th>
                  <th className="p-3 border border-gray-200">Taillenumfang (cm)</th>
                  <th className="p-3 border border-gray-200">Hüftumfang (cm)</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr><td className="p-3 border border-gray-200 font-bold">S</td><td className="p-3 border border-gray-200">88-96</td><td className="p-3 border border-gray-200">73-81</td><td className="p-3 border border-gray-200">88-96</td></tr>
                <tr><td className="p-3 border border-gray-200 font-bold">M</td><td className="p-3 border border-gray-200">96-104</td><td className="p-3 border border-gray-200">81-89</td><td className="p-3 border border-gray-200">96-104</td></tr>
                <tr><td className="p-3 border border-gray-200 font-bold">L</td><td className="p-3 border border-gray-200">104-112</td><td className="p-3 border border-gray-200">89-97</td><td className="p-3 border border-gray-200">104-112</td></tr>
                <tr><td className="p-3 border border-gray-200 font-bold">XL</td><td className="p-3 border border-gray-200">112-124</td><td className="p-3 border border-gray-200">97-109</td><td className="p-3 border border-gray-200">112-120</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
            <span className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm mr-3">D</span>
            Damen
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center border-collapse border border-gray-200">
              <thead className="bg-gray-50 text-primary">
                <tr>
                  <th className="p-3 border border-gray-200">Größe</th>
                  <th className="p-3 border border-gray-200">Brustumfang (cm)</th>
                  <th className="p-3 border border-gray-200">Taillenumfang (cm)</th>
                  <th className="p-3 border border-gray-200">Hüftumfang (cm)</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr><td className="p-3 border border-gray-200 font-bold">XS (34)</td><td className="p-3 border border-gray-200">76-80</td><td className="p-3 border border-gray-200">60-64</td><td className="p-3 border border-gray-200">84-88</td></tr>
                <tr><td className="p-3 border border-gray-200 font-bold">S (36)</td><td className="p-3 border border-gray-200">80-84</td><td className="p-3 border border-gray-200">64-68</td><td className="p-3 border border-gray-200">88-92</td></tr>
                <tr><td className="p-3 border border-gray-200 font-bold">M (38)</td><td className="p-3 border border-gray-200">84-88</td><td className="p-3 border border-gray-200">68-72</td><td className="p-3 border border-gray-200">92-96</td></tr>
                <tr><td className="p-3 border border-gray-200 font-bold">L (40)</td><td className="p-3 border border-gray-200">88-92</td><td className="p-3 border border-gray-200">72-76</td><td className="p-3 border border-gray-200">96-100</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </ServiceLayout>
  );
};

// --- Privacy Page ---
export const Privacy: React.FC = () => {
  return (
    <ServiceLayout title="Datenschutzerklärung">
      <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
        <p>Stand: 26. Januar 2026</p>

        <section>
          <h3 className="text-lg font-bold text-primary mb-2">1. Datenschutz auf einen Blick</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
            Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-primary mb-2">2. Datenerfassung auf unserer Website</h3>
          <p className="mb-2"><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-primary mb-2">3. Analyse-Tools und Tools von Drittanbietern</h3>
          <p>
            Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-primary mb-2">4. Ihre Rechte</h3>
          <p>
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.
            Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
          </p>
        </section>
      </div>
    </ServiceLayout>
  );
};
