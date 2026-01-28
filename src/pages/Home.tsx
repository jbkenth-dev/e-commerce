import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Truck, ShieldCheck, Mail, Quote, Check, Loader2, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ui/ProductCard';
import { PaymentMethods } from '../components/ui/PaymentMethods';
import productsData from '../data/products.json';
import { Product } from '../types';

export const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Get top 4 rated products
  const featuredProducts = (productsData as Product[])
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 4);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }

    setStatus('loading');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setEmail('');

    // Reset after showing success
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 10,
            ease: "easeOut"
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Fashion Editorial"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight"
            >
              Entdecke deinen <span className="text-accent italic">Stil</span>.<br />
              Definiere deine <span className="text-accent italic">Zukunft</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Die neue Kollektion ist da. Minimalistisches Design trifft auf maximale Eleganz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/shop">
                <Button size="xl" className="w-full sm:w-auto text-lg px-8 py-6 bg-white text-black hover:bg-white/90 border-none">
                  Kollektion entdecken <ArrowRight className="ml-3 w-5 h-5 inline" />
                </Button>
              </Link>
              <Link to="/shop?category=Neuheiten">
                <Button variant="outline" size="xl" className="w-full sm:w-auto text-lg px-8 py-6 border-white text-white hover:bg-white/10 backdrop-blur-sm">
                  Neuheiten ansehen
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-slate-50 rounded-xl text-center"
            >
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Kostenloser Versand</h3>
              <p className="text-gray-600">Kostenloser Versand für alle Bestellungen über 50€ innerhalb Deutschlands.</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-slate-50 rounded-xl text-center"
            >
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Sichere Zahlung</h3>
              <p className="text-gray-600">100% sichere Zahlungsmethoden und verschlüsselte Übertragung.</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-slate-50 rounded-xl text-center"
            >
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Top Qualität</h3>
              <p className="text-gray-600">Wir garantieren beste Qualität und Langlebigkeit unserer Produkte.</p>
            </motion.div>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-4xl">
              <PaymentMethods />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Beliebte Produkte</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Unsere Bestseller, die von unseren Kunden am besten bewertet wurden.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="outline" size="lg">Alle Produkte ansehen</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">Nach Kategorien shoppen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/shop?category=Herren" className="group relative h-64 md:h-80 overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1000" alt="Herren" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white">Herren</h3>
              </div>
            </Link>
            <Link to="/shop?category=Damen" className="group relative h-64 md:h-80 overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1525845859779-54d477ff291f?auto=format&fit=crop&q=80&w=1000" alt="Damen" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white">Damen</h3>
              </div>
            </Link>
            <Link to="/shop?category=Accessoires" className="group relative h-64 md:h-80 overflow-hidden rounded-2xl md:col-span-2">
              <img src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1000" alt="Accessoires" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white">Accessoires</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">Das sagen unsere Kunden</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </div>
        </div>

        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          <motion.div
            className="flex gap-8"
            animate={{ x: "-50%" }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-8 shrink-0">
                {[
                  {
                    name: "Sarah M.",
                    role: "Mode-Enthusiastin",
                    text: "Die Qualität der Kleidung ist außergewöhnlich. Endlich habe ich einen Shop gefunden, der Stil und Komfort perfekt verbindet.",
                    rating: 5
                  },
                  {
                    name: "Michael K.",
                    role: "Verifizierter Käufer",
                    text: "Blitzschneller Versand und die Passform ist genau wie beschrieben. Der Kundenservice war auch super hilfreich.",
                    rating: 5
                  },
                  {
                    name: "Lisa B.",
                    role: "Stammkundin",
                    text: "Ich liebe die nachhaltigen Materialien. Jedes Teil fühlt sich hochwertig an und sieht auch nach mehrmaligem Waschen noch top aus.",
                    rating: 5
                  },
                  {
                    name: "Thomas H.",
                    role: "Business Kunde",
                    text: "Die Anzüge sitzen perfekt. Für meine Geschäftstermine genau das Richtige. Werde definitiv wieder bestellen.",
                    rating: 5
                  },
                  {
                    name: "Emma S.",
                    role: "Trendsetterin",
                    text: "Die Accessoires sind einzigartig und werten jedes Outfit auf. Bekomme ständig Komplimente für die Handtasche!",
                    rating: 5
                  },
                  {
                    name: "David R.",
                    role: "Sportler",
                    text: "Die Sportkollektion ist der Hammer. Atmungsaktiv und trotzdem stylisch. Perfekt fürs Fitnessstudio.",
                    rating: 4
                  },
                  {
                    name: "Julia W.",
                    role: "Mutter",
                    text: "Tolle Auswahl auch für Kinder. Die Sachen sind robust und sehen trotzdem süß aus. Preis-Leistung stimmt.",
                    rating: 5
                  },
                  {
                    name: "Felix M.",
                    role: "Student",
                    text: "Coole Streetwear zu fairen Preisen. Der Studentenrabatt ist auch ein netter Bonus. Weiter so!",
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <div
                    key={`${setIndex}-${index}`}
                    className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative w-[400px] shrink-0"
                  >
                    <Quote className="absolute top-8 right-8 w-8 h-8 text-gray-100" />
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic leading-relaxed line-clamp-3">"{testimonial.text}"</p>
                    <div>
                      <h4 className="font-bold text-primary">{testimonial.name}</h4>
                      <span className="text-sm text-gray-400">{testimonial.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-3xl border border-white/10"
          >
            <Mail className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Bleib immer up to date</h2>
            <p className="text-gray-200 mb-8 text-lg max-w-2xl mx-auto">
              Melde dich für unseren Newsletter an und erhalte exklusive Angebote, Style-Tipps und 10% Rabatt auf deine erste Bestellung.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative" onSubmit={handleSubscribe}>
              <motion.input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Deine E-Mail Adresse"
                animate={status === 'error' ? { x: [-10, 10, -10, 10, 0] } : {}}
                className={`flex-1 px-6 py-4 rounded-xl bg-white/10 border backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:bg-white/20 transition-all ${
                  status === 'error'
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-white/20 focus:ring-accent'
                }`}
                disabled={status === 'loading' || status === 'success'}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center min-w-[160px] ${
                  status === 'success'
                    ? 'bg-green-500 shadow-green-500/30'
                    : 'bg-accent hover:bg-accent/90 shadow-accent/20'
                }`}
              >
                <AnimatePresence mode="wait">
                  {status === 'loading' ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <Loader2 className="w-6 h-6 animate-spin" />
                    </motion.div>
                  ) : status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center"
                    >
                      <Check className="w-6 h-6 mr-2" />
                      Abonniert
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center"
                    >
                      <span>Abonnieren</span>
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
            <p className="text-xs text-gray-400 mt-4">
              Mit der Anmeldung akzeptierst du unsere Datenschutzbestimmungen. Du kannst dich jederzeit abmelden.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
