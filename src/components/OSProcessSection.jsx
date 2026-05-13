import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const calendlyLink = "https://calendly.com/ayonpalovi10/video-editing-service";

const processSteps = [
  {
    number: 1,
    align: "right",
    title: "Project Onboarding",
    chips: ["Client Portal", "Brief Form", "Upload Footage"],
    description:
      "You submit your project details, goals, references, and raw footage through MotionHolic OS, so everything starts clearly from day one.",
  },
  {
    number: 2,
    align: "left",
    title: "Smart Task Assignment",
    chips: ["Editor Matching", "Timeline Setup", "Content Plan"],
    description:
      "Inside the OS, the project is organized, assigned to the right editor, and planned with deadlines, style direction, and content goals.",
  },
  {
    number: 3,
    align: "right",
    title: "Review & Timestamp Feedback",
    chips: ["Preview Video", "Timestamp Notes", "Revision Tracking"],
    description:
      "You review the draft directly inside MotionHolic OS and leave clear timestamp-based feedback, making revisions faster and easier.",
  },
  {
    number: 4,
    align: "left",
    title: "Approval & Delivery",
    chips: ["Final Approval", "Version History", "Ready to Post"],
    description:
      "Once approved, you receive the final video with all versions organized, ready to download, publish, and track for future content.",
  },
];

function openCalendly() {
  window.open(calendlyLink, "_blank", "noopener,noreferrer");
}

function findProcessSection() {
  return document.getElementById("process");
}

function ProcessBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/60 backdrop-blur-xl"
    >
      <span className="text-[#0051FF]">✦</span>
      <span>Our Process</span>
    </motion.div>
  );
}

function AnimatedHeading() {
  const lines = [
    { text: "Our OS-powered process to turn", blue: false },
    { text: "raw footage into ready-to-post content", blue: true },
  ];

  return (
    <h2 className="mx-auto max-w-5xl text-center text-4xl font-semibold leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
      {lines.map((line, lineIndex) => (
        <span key={line.text} className="block overflow-hidden pb-1">
          <motion.span
            initial={{ y: "110%", opacity: 0, filter: "blur(10px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.45 }}
            transition={{ duration: 0.75, delay: lineIndex * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={line.blue ? "inline-block text-[#0051FF]" : "inline-block text-white"}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

function StepCard({ step }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.45 });
  const isLeft = step.align === "left";

  return (
    <div className="relative grid items-center gap-8 md:grid-cols-[1fr_100px_1fr]">
      <div className={isLeft ? "hidden md:order-3 md:block" : "hidden md:order-1 md:block"} />

      <div className="relative order-1 flex justify-center md:order-2">
        <motion.div
          animate={
            isInView
              ? {
                  boxShadow:
                    "0 0 0 8px rgba(0,81,255,0.08), 0 0 50px rgba(0,81,255,0.42)",
                  borderColor: "rgba(0,81,255,0.55)",
                }
              : {
                  boxShadow: "0 0 0 8px rgba(255,255,255,0.02), 0 0 35px rgba(0,81,255,0.16)",
                  borderColor: "rgba(255,255,255,0.14)",
                }
          }
          transition={{ duration: 0.35 }}
          className="z-10 flex h-14 w-14 items-center justify-center rounded-full border bg-[#0b0d14] text-xl font-bold text-white"
        >
          {step.number}
        </motion.div>
      </div>

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.35 }}
        whileHover={{ y: -7, borderColor: "rgba(0,81,255,0.55)", boxShadow: "0 24px 90px rgba(0,81,255,0.18)" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={
          isLeft
            ? "order-2 rounded-[28px] border border-white/10 bg-white/6 p-6 shadow-[0_20px_70px_rgba(0,81,255,0.1)] backdrop-blur-2xl md:order-1"
            : "order-2 rounded-[28px] border border-white/10 bg-white/6 p-6 shadow-[0_20px_70px_rgba(0,81,255,0.1)] backdrop-blur-2xl md:order-3"
        }
      >
        <h3 className="text-2xl font-semibold text-[#0051FF] md:text-3xl">{step.title}</h3>

        <div className="my-5 flex flex-wrap gap-3">
          {step.chips.map((chip, index) => (
            <motion.span
              key={chip}
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3.2 + index * 0.25, ease: "easeInOut" }}
              className="rounded-full border border-white/15 bg-white/8 px-4 py-3 text-sm font-medium text-white/90 shadow-lg backdrop-blur-xl"
            >
              {chip}
            </motion.span>
          ))}
        </div>

        <p className="max-w-xl text-sm leading-7 text-white/80 md:text-base">{step.description}</p>
      </motion.div>
    </div>
  );
}

export default function OSProcessSection() {
  const [mountNode, setMountNode] = useState(null);
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 28%", "end 78%"] });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    let timeoutId;

    const mountProcess = () => {
      const section = findProcessSection();
      if (!section) return false;

      section.setAttribute("data-os-process-section", "true");

      let host = section.querySelector("[data-os-process-host]");
      if (!host) {
        host = document.createElement("div");
        host.setAttribute("data-os-process-host", "true");
        section.appendChild(host);
      }

      setMountNode(host);
      return true;
    };

    if (!mountProcess()) {
      timeoutId = window.setTimeout(mountProcess, 300);
    }

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!mountNode) return null;

  return createPortal(
    <>
      <style>{`
        #process[data-os-process-section="true"] > :not([data-os-process-host]) {
          display: none !important;
        }

        #process[data-os-process-section="true"] {
          position: relative !important;
          overflow: hidden !important;
          background: #05070b !important;
        }
      `}</style>

      <section className="relative overflow-hidden bg-[#05070b] px-4 py-12 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(0,81,255,0.16),transparent_28%),radial-gradient(circle_at_15%_70%,rgba(0,81,255,0.08),transparent_28%),radial-gradient(circle_at_85%_65%,rgba(0,81,255,0.08),transparent_28%)]" />

        <div className="relative mx-auto max-w-7xl text-center">
          <ProcessBadge />
          <AnimatedHeading />
        </div>

        <div ref={timelineRef} className="relative mx-auto mt-5 max-w-7xl space-y-10 md:space-y-14">
          <div className="absolute left-1/2 top-14 hidden h-[calc(100%-3.5rem)] w-px -translate-x-1/2 bg-white/35 md:block" />
          <motion.div
            style={{ height: progressHeight }}
            className="absolute left-1/2 top-14 hidden max-h-[calc(100%-3.5rem)] w-px -translate-x-1/2 origin-top bg-[#0051FF] shadow-[0_0_28px_rgba(0,81,255,0.7)] md:block"
          />

          <div className="absolute left-7 top-14 h-[calc(100%-3.5rem)] w-px bg-white/35 md:hidden" />
          <motion.div
            style={{ height: progressHeight }}
            className="absolute left-7 top-14 max-h-[calc(100%-3.5rem)] w-px origin-top bg-[#0051FF] shadow-[0_0_28px_rgba(0,81,255,0.7)] md:hidden"
          />

          {processSteps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 flex justify-center"
        >
          <button
            onClick={openCalendly}
            className="group relative overflow-hidden rounded-full border border-[#0051FF]/30 bg-[#0051FF] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_35px_rgba(0,81,255,0.35)] transition hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(0,81,255,0.55)]"
            type="button"
          >
            <span className="relative z-10">Get in touch</span>
            <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-[420%]" />
          </button>
        </motion.div>
      </section>
    </>,
    mountNode,
  );
}
