import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export const PaymentMethods: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pt-8 mt-8 border-t border-gray-100"
    >
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-center md:text-left shrink-0 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-xl border border-gray-100/50 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="pr-4">
              <h3 className="font-bold text-gray-900 whitespace-nowrap">Sichere Bezahlung</h3>
              <p className="text-xs text-gray-500">SSL-verschlüsselt</p>
            </div>
          </div>

          <div className="flex-1 overflow-hidden relative mask-gradient w-full">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />

            <motion.div
              className="flex gap-4 items-center w-max"
              animate={{ x: [0, -500] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {/* First Set */}
              <IconsSet />
              {/* Duplicate Set for Seamless Loop */}
              <IconsSet />
              {/* Triplicate Set for safety on wide screens */}
              <IconsSet />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const IconsSet = () => (
  <div className="flex gap-4 items-center">
    <PaymentIcon name="Visa" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" />
    <PaymentIcon name="Mastercard" src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" />
    <PaymentIcon name="PayPal" src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" />
    <PaymentIcon name="Apple Pay" src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" />
    <PaymentIcon name="Google Pay" src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo_%282020%29.svg" />
    <PaymentIcon name="Klarna" src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Klarna_Logo_black.svg" />
  </div>
);

const PaymentIcon: React.FC<{ src: string; name: string }> = ({ src, name }) => {
  return (
    <div
      className="w-14 h-9 bg-white rounded-lg border border-gray-100 flex items-center justify-center p-1.5 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group relative z-10 shrink-0"
      title={name}
    >
      <img
        src={src}
        alt={name}
        className="w-full h-full object-contain"
      />
    </div>
  );
};
