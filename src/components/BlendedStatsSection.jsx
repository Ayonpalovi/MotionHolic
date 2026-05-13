import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const stats = [
  { value: 250, suffix: "%", label: "More Engagement" },
  { value: 4, suffix: "X", label: "More Reach" },
  { value: 60, suffix: "%", label: "More Sales" },
];

function findStatsContainer() {
  const candidates = Array.from(document.querySelectorAll("section, div"))
    .filter((element) => {
      const text = element.textContent || "";
      return text.includes("More Engagement") && text.includes("More Reach") && text.includes("More Sales");
    })
    .sort((a, b) => (a.textContent || "").length - (b.textContent || "").length);

  return candidates[0] || null;
}

function AnimatedStat({ value, suffix, label, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let animationFrame;
    const startTime = performance.now();
    const duration = 1300;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  const valueText = suffix === "X" ? `${displayValue}X` : `${displayValue}${suffix}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center text-center"
    >
      <motion.div
        whileHover={{ scale: 1.03, y: -2 }}
        transition={{ duration: 0.25 }}
        className="bg-gradient-to-b from-[#0051FF] via-white to-[#7AA7FF] bg-clip-text text-5xl font-black leading-none tracking-[-0.06em] text-transparent sm:text-6xl md:text-7xl lg:text-[6.25rem]"
      >
        {valueText}
      </motion.div>
      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-base md:text-lg">
        {label}
      </p>
    </motion.div>
  );
}

export default function BlendedStatsSection() {
  const [mountNode, setMountNode] = useState(null);

  useEffect(() => {
    let timeoutId;

    const mountStats = () => {
      const section = findStatsContainer();
      if (!section) return false;

      section.setAttribute("data-blended-stats-section", "true");

      let host = section.querySelector("[data-blended-stats-host]");
      if (!host) {
        host = document.createElement("div");
        host.setAttribute("data-blended-stats-host", "true");
        section.appendChild(host);
      }

      setMountNode(host);
      return true;
    };

    if (!mountStats()) {
      timeoutId = window.setTimeout(mountStats, 300);
    }

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!mountNode) return null;

  return createPortal(
    <>
      <style>{`
        [data-blended-stats-section="true"] > :not([data-blended-stats-host]) {
          display: none !important;
        }

        [data-blended-stats-section="true"] {
          position: relative !important;
          overflow: hidden !important;
          border: none !important;
          background: #05070b !important;
          box-shadow: none !important;
        }
      `}</style>

      <section className="relative overflow-hidden bg-[#05070b] px-4 py-14 sm:px-6 lg:px-8">
        <div className="relative mx-auto grid max-w-5xl gap-9 md:grid-cols-3 md:gap-7">
          {stats.map((stat, index) => (
            <AnimatedStat key={stat.label} {...stat} delay={index * 0.07} />
          ))}
        </div>
      </section>
    </>,
    mountNode,
  );
}
