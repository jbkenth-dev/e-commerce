import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">FASHION<span className="text-accent">SHOP</span></h3>
            <p className="text-sm leading-relaxed mb-4">
              Ihr Ziel für moderne Mode und Lifestyle. Wir bieten Qualität, Stil und Komfort für jeden Anlass.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Einkaufen</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/shop?category=Herren" className="hover:text-accent transition-colors">Herren</a></li>
              <li><a href="/shop?category=Damen" className="hover:text-accent transition-colors">Damen</a></li>
              <li><a href="/shop?category=Kinder" className="hover:text-accent transition-colors">Kinder</a></li>
              <li><a href="/shop?category=Accessoires" className="hover:text-accent transition-colors">Accessoires</a></li>
              <li><a href="/shop" className="hover:text-accent transition-colors">Neuheiten</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/service/contact" className="hover:text-accent transition-colors">Kontakt</Link></li>
              <li><Link to="/service/shipping" className="hover:text-accent transition-colors">Versand & Rückgabe</Link></li>
              <li><Link to="/service/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link to="/service/sizes" className="hover:text-accent transition-colors">Größentabelle</Link></li>
              <li><Link to="/service/privacy" className="hover:text-accent transition-colors">Datenschutz</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-accent shrink-0" />
                <span>Musterstraße 123<br />10115 Berlin, Deutschland</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-accent shrink-0" />
                <span>+49 30 12345678</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-accent shrink-0" />
                <span>info@fashionshop.de</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} FashionShop. Alle Rechte vorbehalten.</p>
          <p>
            Developed by: <a href="https://jbkenth.dev" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition-colors font-medium">John Kenneth Balutan</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
