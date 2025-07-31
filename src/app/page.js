"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { carriers } from "../../constant";
import CarrierTextBlock from "@/components/CarrierTextBlock";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  const total = carriers.length;

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      const desktop = width >= 1240;
      setIsDesktop(desktop);
      setVisibleCount(width <= 768 ? 1 : desktop ? 5 : 3);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const visibleItems = Array.from({ length: visibleCount }, (_, i) => {
    const offset = i - Math.floor(visibleCount / 2);
    const index = (currentIndex + offset + total) % total;
    return { ...carriers[index], offset };
  });

  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      setCurrentIndex((prev) => (prev + 1) % total);
    } else {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
    }
  };

  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
      handleWheel(e);
    };
    window.addEventListener("wheel", preventScroll, { passive: false });
    return () => window.removeEventListener("wheel", preventScroll);
  }, []);

  const getLeftOffset = ({ First, Second, isCenter, Fourth, Fifth }) => {
    if (!isDesktop) return "0";
    if (Fourth || Second) return "-100px";
    if (isCenter) return "-200px";
    if (Fifth || First) return "0";
    return "0";
  };

  return (
    <main className="h-screen w-full bg-white overflow-hidden">
      <section className="md:container h-full mx-auto grid md:grid-cols-2 px-5 items-center">
        {/* Left Side */}
        <CarrierTextBlock />

        {/* Right Side - Custom Vertical Swiper */}
        <div className="relative h-[200px] md:h-[900px] md:flex md:items-center md:justify-center">
          <div className="w-full flex flex-col items-center justify-center">
            <AnimatePresence initial={false}>
              {visibleItems.map(({ id, name, logo, offset }) => {
                const First = offset === -2;
                const Second = offset === -1;
                const isCenter = offset === 0;
                const Fourth = offset === 1;
                const Fifth = offset === 2;
                const baseY = offset * 170;

                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: baseY + 30 }}
                    animate={{
                      y: baseY,
                      opacity: isCenter ? 1 : 0.4,
                      scale: isCenter ? 1 : 0.85,
                      left: getLeftOffset({ First, Second, Fourth, Fifth, isCenter }),
                    }}
                    exit={{ opacity: 0, y: baseY - 30 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute w-full flex items-center justify-center gap-6"
                    style={{ zIndex: 10 - Math.abs(offset) }}
                  >
                    <img
                      src={logo}
                      alt={name}
                      className="md:w-[150px] w-[120px] h-auto object-contain bg-white p-4 drop-shadow-lg rounded-full transition-all"
                    />
                    <span
                      className="md:text-2xl font-bold"
                      style={{
                        background: "linear-gradient(90deg, #E05E47 0%, #9B65E4 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {name}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}




