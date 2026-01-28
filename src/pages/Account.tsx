import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';
import { Package, User, MapPin, CreditCard, LogOut, ChevronRight, Edit2, Plus, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'orders' | 'profile' | 'addresses' | 'payment';

export const Account: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>('orders');

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const menuItems = [
    { id: 'orders', label: 'Bestellungen', icon: Package },
    { id: 'profile', label: 'Persönliche Daten', icon: User },
    { id: 'addresses', label: 'Adressen', icon: MapPin },
    { id: 'payment', label: 'Zahlungsarten', icon: CreditCard },
  ];

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        const orders = [
          { id: '#4521', date: '25.01.2024', status: 'Geliefert', total: 129.99, items: 3, image: 'https://picsum.photos/seed/101/100/100' },
          { id: '#4490', date: '12.01.2024', status: 'Versendet', total: 54.50, items: 1, image: 'https://picsum.photos/seed/102/100/100' },
          { id: '#4102', date: '15.12.2023', status: 'Geliefert', total: 210.00, items: 4, image: 'https://picsum.photos/seed/103/100/100' },
        ];
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">Meine Bestellungen</h2>
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        <img src={order.image} alt="Order Item" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-primary text-lg">{order.id}</span>
                          <span className="text-sm text-gray-500">• {order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${order.status === 'Geliefert' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {order.status}
                          </span>
                          <span className="text-sm text-gray-600">{order.items} Artikel</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-6 flex-1">
                      <span className="font-bold text-lg text-primary">{order.total.toFixed(2)} €</span>
                      <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                        Details <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">Persönliche Daten</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold">
                    {user?.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">{user?.name}</h3>
                    <p className="text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Edit2 className="w-4 h-4 mr-2" /> Bearbeiten
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Vorname</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 font-medium">
                    {user?.name.split(' ')[0] || 'Max'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Nachname</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 font-medium">
                    {user?.name.split(' ').slice(1).join(' ') || 'Mustermann'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">E-Mail Adresse</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 font-medium">
                    {user?.email}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Telefonnummer</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 font-medium">
                    +49 123 45678900
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">Adressen</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" /> Neue Adresse
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-accent/20 relative group">
                <div className="absolute top-4 right-4 bg-accent/10 text-accent text-xs font-bold px-2 py-1 rounded">Standard</div>
                <h3 className="font-bold text-lg text-primary mb-1">Zuhause</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {user?.name}<br />
                  Musterstraße 123<br />
                  10115 Berlin<br />
                  Deutschland
                </p>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-sm font-medium text-primary hover:underline">Bearbeiten</button>
                  <span className="text-gray-300">|</span>
                  <button className="text-sm font-medium text-red-500 hover:underline">Löschen</button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                <h3 className="font-bold text-lg text-primary mb-1">Büro</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {user?.name}<br />
                  Firmenweg 99<br />
                  20095 Hamburg<br />
                  Deutschland
                </p>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-sm font-medium text-primary hover:underline">Bearbeiten</button>
                  <span className="text-gray-300">|</span>
                  <button className="text-sm font-medium text-red-500 hover:underline">Löschen</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">Zahlungsarten</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" /> Neue Karte
              </Button>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center font-bold text-gray-600 text-xs">VISA</div>
                  <div>
                    <p className="font-medium text-primary">Visa endend auf 4242</p>
                    <p className="text-xs text-gray-500">Läuft ab 12/25</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center font-bold text-gray-600 text-xs">MC</div>
                  <div>
                    <p className="font-medium text-primary">Mastercard endend auf 8899</p>
                    <p className="text-xs text-gray-500">Läuft ab 09/24</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <aside className="w-full md:w-72 space-y-4 shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {user?.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-gray-900 truncate">{user?.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as Tab)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                        ${isActive
                          ? 'bg-primary text-white shadow-md shadow-primary/20 translate-x-1'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />}
                    </button>
                  );
                })}
              </nav>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Abmelden</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};
