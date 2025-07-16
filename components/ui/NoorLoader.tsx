"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { easeInOut } from "framer-motion"; 
import ChatPage from "@/components/chatpage"; // Ensure this import path is correct

const NoorLoader = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5s preload
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("animate");
    } else {
      controls.start("initial");
    }
  }, [isInView, controls]);

  const logoVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      rotate: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 360,
      transition: {
        duration: 2,
        ease: easeInOut,
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.8, ease: easeInOut },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          ref={ref}
          key="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="w-32 h-32 drop-shadow-2xl"
            variants={logoVariants}
            initial="initial"
            animate={controls}>
            <img
              src="/NoorLogo.png"
              alt="Noor AI Loader"
              width={128}
              height={128}
            />
          </motion.div>
          <motion.p
            className="text-white mt-6 text-sm tracking-wide opacity-80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Noor AI is thinking...
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          key="chat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ChatPage />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoorLoader;
