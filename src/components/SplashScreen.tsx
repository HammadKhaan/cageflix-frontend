import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  onFinish: () => void;
};

const SplashScreen: React.FC<Props> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black flex flex-col justify-center items-center z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-red-600 text-5xl font-extrabold"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          CAGEFLIX
        </motion.h1>
        <motion.p
          className="text-white/80 font-semibold mt-8 text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Nicolas Cage fans assemble!
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
