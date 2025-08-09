"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { easeInOut } from "framer-motion"; 
import ChatPage from "@/app/chat/page";

const Loading = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    const timer = setTimeout(() => {
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
        <motion.div
          ref={ref}
          key="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
    <LoadIcon/>
        </motion.div>

    </AnimatePresence>
  );
};

export default Loading



export const LoadIcon = () => {

const controls = useAnimation();
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


  return (
         <motion.div
            className="w-16 h-16 drop-shadow-2xl"
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
  )
}
