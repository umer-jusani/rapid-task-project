

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const carriers = [
  { id: 1, name: "FedEx", logo: "/carriers/fedex.png" },
  { id: 2, name: "DHL Express", logo: "/carriers/dhl.png" },
  { id: 3, name: "UPS", logo: "/carriers/ups.png" },
  { id: 4, name: "Canpar Courier", logo: "/carriers/canpar.png" },
  { id: 5, name: "Aramex", logo: "/carriers/aramex.png" },
  { id: 6, name: "Leopard Courier", logo: "/carriers/leopard.png" },
  { id: 7, name: "TCS", logo: "/carriers/tcs.png" },
];

const VISIBLE_COUNT = 5;

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = carriers.length;

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
    const handle = (e) => {
      e.preventDefault();
      handleWheel(e);
    };
    window.addEventListener("wheel", handle, { passive: false });
    return () => window.removeEventListener("wheel", handle);
  }, []);

  return (
    <main className="h-screen w-full bg-white overflow-hidden">
      <section className="container mx-auto h-full grid grid-cols-2 items-center">
        {/* Left Side */}
        <div>
          <div className="w-min space-y-4">
            <h5 className="uppercase text-[18px] font-semibold">Carrier</h5>
            <h1 className="gradient-text text-6xl font-bold text-nowrap">
              Carrier Partners
            </h1>
            <p className="text-[18px] font-semibold">
              Utilizing State-Of-The-Art Technology For Real-Time Tracking And Efficiency.
            </p>
            <button className="mt-12 btn py-2 px-8 rounded-4xl cursor-pointer font-semibold">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Side - Custom Vertical Swiper */}
        <div className="relative h-[900px] flex items-center justify-center">
          <div className="relative h-[500px] w-full flex flex-col items-center justify-center">
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
                      left: (Fourth || Second) ? "-100px" : isCenter ? "-200px" : (Fifth || First) ? "0" : "0"
                    }}
                    exit={{ opacity: 0, y: baseY - 30 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute w-full flex items-center justify-center gap-6"
                    style={{ zIndex: 10 - Math.abs(offset), }}
                  >
                    <img
                      src={logo}
                      alt={name}
                      className={`w-[150px] h-auto object-contain bg-white p-4 drop-shadow-lg rounded-full transition-all`}
                    />
                    <span
                      className="text-2xl font-bold"
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




