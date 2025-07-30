"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { carriers } from "../../constant";


export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const total = carriers.length;
  const VISIBLE_COUNT = isDesktop ? 5 : 1;

  const visibleItems = Array.from({ length: VISIBLE_COUNT }, (_, i) => {
    const offset = i - Math.floor(VISIBLE_COUNT / 2);
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
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const handle = (e) => {
      e.preventDefault();
      handleWheel(e);
    };
    window.addEventListener("wheel", handle, { passive: false });
    return () => window.removeEventListener("wheel", handle);
  }, []);

  return (
    <main className="h-screen w-full bg-white overflow-hidden">
      <section className="container h-full mx-auto grid md:grid-cols-2 px-5 md:items-center">
        {/* Left Side */}
        <div className="h-fit">
          <div className="w-min md:space-y-4 space-y-2">
            <h5 className="uppercase | text-[16px] md:text-[18px] | font-semibold">Carrier</h5>
            <h1 className="gradient-text | text-9xl sm:text-4xl md:text-5xl lg:text-6xl | font-bold">
              Carrier Partners
            </h1>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] | font-semibold">
              Utilizing State-Of-The-Art Technology For Real-Time Tracking And Efficiency.
            </p>
            <button className="mt-6 sm:mt-10 md:mt-12 | btn | py-2 px-6 sm:px-8 | rounded-4xl cursor-pointer font-semibold text-sm sm:text-base">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Side - Custom Vertical Swiper */}
        <div className="relative h-[200px] md:h-[900px]  flex items-center justify-center">
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
                      left: isDesktop
                        ? (Fourth || Second)
                          ? "-100px"
                          : isCenter
                            ? "-200px"
                            : (Fifth || First)
                              ? "0"
                              : "0"
                        : "0"
                    }}
                    exit={{ opacity: 0, y: baseY - 30 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute w-full flex items-center justify-center gap-6"
                    style={{ zIndex: 10 - Math.abs(offset) }}
                  >
                    <img
                      src={logo}
                      alt={name}
                      className={`md:w-[150px] w-[120px] | h-auto object-contain bg-white p-4 drop-shadow-lg rounded-full transition-all`}
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




