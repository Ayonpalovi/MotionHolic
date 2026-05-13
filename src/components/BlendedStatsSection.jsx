import { useEffect, useMemo, useState } from "react";
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
    const duration = 1500;

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
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center justify-center text-center"
    >
      <motion.div
        whileHover={{ scale: 1.04, y: -3 }}
        transition={{ duration: 0.25 }}
        className="bg-gradient-to-b from-[#0051FF] via-white to-[#7AA7FF] bg-clip-text text-7xl font-black leading-none tracking-[-0.08em] text-transparent sm:text-8xl md:text-9xl lg:text-[9.5rem]"
      >
        {valueText}
      </motion.div>
      <p className="mt-3 text-xl font-semibold text-white/70 sm:text-2xl md:text-3xl">
        {label}
      </p>
    </motion.div>
  );
}

export default function BlendedStatsSection() {
  const [mountNode, setMountNode] = useState(null);
  const starDots = useMemo(
    () => [
      { left: "7%", top: "25%" },
      { left: "32%", top: "9%" },
      { left: "50%", top: "48%" },
      { left: "68%", top: "18%" },
      { left: "91%", top: "36%" },
    ],
    [],
  );

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
          background: transparent !important;
          box-shadow: none !important;
        }
      `}</style>

      <section className="relative overflow-hidden bg-transparent px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,81,255,0.16),transparent_28%),radial-gradient(circle_at_5%_80%,rgba(0,81,255,0.08),transparent_30%),radial-gradient(circle_at_92%_15%,rgba(255,255,255,0.08),transparent_26%)]" />
        {starDots.map((dot, index) => (
          <motion.span
            key={`${dot.left}-${dot.top}`}
            className="pointer-events-none absolute h-1 w-1 rounded-full bg-white/70"
            style={{ left: dot.left, top: dot.top }}
            animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.8, 1.35, 0.8] }}
            transition={{ duration: 2.6 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-3 md:gap-8">
          {stats.map((stat, index) => (
            <AnimatedStat key={stat.label} {...stat} delay={index * 0.08} />
          ))}
        </div>
      </section>
    </>,
    mountNode,
  );
}
