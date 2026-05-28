import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Lenis from "lenis";

/* ─── Constants ──────────────────────────────────────────────────────────── */
const calendlyLink = "https://calendly.com/ayonpalovi10/video-editing-service";
const instagramLink = "https://www.instagram.com/ovisperspective/";
const linkedinLink = "https://www.linkedin.com/in/ayonkumarpaulovi/";
const gmailLink = "mailto:ayonpalovi10@gmail.com";

const heroVideo = "https://www.youtube.com/embed/8GW8QOYTSk8?si=5-KGzAGu34GjNn4v";

const workVideos = [
  { src: "https://www.youtube.com/embed/TR-yFaak-Zs?si=8gXblCQcwJBxymvd", category: "shorts" },
  { src: "https://www.youtube.com/embed/V__rxnsSPY0?si=zcq0UAH2gmPBx40D", category: "long-form" },
  { src: "https://www.youtube.com/embed/KPZ39Q9x1OY?si=QeUn2ery8GuBHWL-", category: "shorts" },
  { src: "https://www.youtube.com/embed/jZ42Sq9qYr0?si=pRm679iehCOtaE0a", category: "vsl" },
  { src: "https://www.youtube.com/embed/a5fa0qlvk38?si=Xt1AXJaBeF0Tbdhq", category: "long-form" },
  { src: "https://www.youtube.com/embed/UzKvcKpJQLY?si=FLn-dKqRXZaKsTsN", category: "shorts" },
];

const testimonials = [
  { src: "https://www.youtube.com/embed/WZQZoJwTbkw?si=oxI45XuFFzFiGJ_w", name: "Alex Thompson", role: "Content Creator", stars: 5 },
  { src: "https://www.youtube.com/embed/WZQZoJwTbkw?si=oxI45XuFFzFiGJ_w", name: "Sarah Kim", role: "Brand Founder", stars: 5 },
  { src: "https://www.youtube.com/embed/WZQZoJwTbkw?si=oxI45XuFFzFiGJ_w", name: "Marcus Lee", role: "Podcast Host", stars: 5 },
];

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const services = [
  { icon: "🎬", title: "Short Form Videos", desc: "High-energy, scroll-stopping content for TikTok, Reels, and YouTube Shorts." },
  { icon: "🎙️", title: "Podcast Editing", desc: "Clean audio, engaging cuts, and custom B-roll to make your podcast visually compelling." },
  { icon: "🎞️", title: "Documentary Edit", desc: "Story-driven edits that capture authentic moments with cinematic flair." },
  { icon: "📣", title: "Ad Creative & VSL", desc: "High-converting video sales letters and ad creatives that drive clicks and revenue." },
  { icon: "✨", title: "Motion Graphics", desc: "Custom animations and motion graphics that elevate your brand identity visually." },
  { icon: "▶️", title: "YouTube Videos", desc: "Long-form YouTube videos edited for maximum watch time, retention, and growth." },
];

const trustStats = [
  { value: "2000+", label: "Videos Edited",   num: 2000, suffix: "+",    decimals: 0 },
  { value: "2×",   label: "Engagement Boost", num: 2,    suffix: "×",    decimals: 0 },
  { value: "4.9★", label: "Client Rating",    num: 4.9,  suffix: "★",    decimals: 1 },
  { value: "5 Yrs", label: "Experience",      num: 5,    suffix: " Yrs", decimals: 0 },
  { value: "Fast",  label: "Delivery",        num: null },
];

const processSteps = [
  { n: "01", title: "Drop Your Footage", desc: "Upload your raw clips — WeTransfer, Google Drive, Dropbox — whatever works for you." },
  { n: "02", title: "Editing the Video", desc: "We make the best quality videos using advanced motion graphics that bring your message to life." },
  { n: "03", title: "Feedback? Easy", desc: "Want something changed? We offer smooth revision rounds to make sure everything is perfect." },
  { n: "04", title: "Upload & Grow", desc: "Upload your content and grow your business. Final video, organized and ready to publish." },
];

const basicFeatures = [
  "1 video with Subtitles (Any editing style)",
  "Color Grading",
  "Motion Graphics",
  "Sound Design",
  "Unlimited revisions",
  "No Hidden Fees",
  "Upgrade Anytime",
  "Cancel Anytime",
];

const premiumFeatures = [
  "20 short form videos",
  "Content Idea",
  "High Quality editing",
  "Free Thumbnails",
  "Trending Animation Styles",
  "24/7 Support, Anytime You Need Us",
  "No Hidden Fees",
  "Cancel Anytime",
];

const faqItems = [
  {
    q: "How does the process work?",
    a: "Once you share your project details, I carefully review your vision and requirements. From there, I dive into the creative process — editing, designing, and refining until it matches your expectations. You'll receive regular updates, and revisions are always welcome to make sure the final result hits the mark.",
  },
  {
    q: "What if I need more revisions?",
    a: "No problem! We offer unlimited revisions to ensure your design is exactly how you envision it.",
  },
  {
    q: "Can I pause or stop the work anytime?",
    a: "Absolutely! My services are completely flexible — you can pause or stop the project anytime based on your needs. No pressure, no long-term commitment — just work when it works for you.",
  },
  {
    q: "Can you match a specific style?",
    a: "Yes! I can match or even improve styles like Alex Hormozi or Ali Abdaal — tailored to your niche.",
  },
  {
    q: "Do you offer a free trial?",
    a: "No, I don't offer free trials.",
  },
  {
    q: "How do we communicate throughout the project?",
    a: "We stay connected through WhatsApp, Email, and Google Meet, making communication simple and effective. You'll receive timely updates, previews, and can easily share feedback at every stage.",
  },
];

const WORK_TABS = ["All", "Shorts", "Long-Form", "VSL"];

/* ─── Utilities ──────────────────────────────────────────────────────────── */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function extractYouTubeId(url) {
  const match = url.match(/embed\/([^?&]+)/);
  return match?.[1] || "dQw4w9WgXcQ";
}

function buildAutoplayUrl(url, autoplay = false) {
  if (!autoplay) return url;
  return url.includes("?") ? `${url}&autoplay=1` : `${url}?autoplay=1`;
}

function openCalendly() {
  if (typeof window !== "undefined") {
    window.open(calendlyLink, "_blank", "noopener,noreferrer");
  }
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */
function IconBase({ children, className = "h-5 w-5", fill = "none", viewBox = "0 0 24 24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const MenuIcon = ({ className }) => (
  <IconBase className={className}><path d="M4 6h16M4 12h16M4 18h16" /></IconBase>
);
const XIcon = ({ className }) => (
  <IconBase className={className}><path d="M18 6 6 18M6 6l12 12" /></IconBase>
);
const ArrowRightIcon = ({ className }) => (
  <IconBase className={className}><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></IconBase>
);
const ChevronDownIcon = ({ className }) => (
  <IconBase className={className}><path d="m6 9 6 6 6-6" /></IconBase>
);
const InstagramIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <path d="M17.5 6.5h.01" />
  </IconBase>
);
const LinkedinIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </IconBase>
);
const MailIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </IconBase>
);
const CheckIcon = ({ className }) => (
  <IconBase className={className}><path d="M20 6 9 17l-5-5" /></IconBase>
);

const StarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="m12 2.5 2.93 5.94 6.56.95-4.75 4.63 1.12 6.53L12 17.47 6.14 20.55l1.12-6.53L2.5 9.39l6.57-.95L12 2.5Z" />
  </svg>
);

const PlayIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M8 5.14v13.72c0 .73.79 1.19 1.42.82l10.11-5.86a.95.95 0 0 0 0-1.64L9.42 4.32A.95.95 0 0 0 8 5.14Z" />
  </svg>
);

const PauseIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
  </svg>
);

/* ─── Shared UI ──────────────────────────────────────────────────────────── */
function SectionBadge({ children }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/60 backdrop-blur-xl">
      <span className="h-1.5 w-1.5 rounded-full bg-[#0051FF]" />
      <span>{children}</span>
    </div>
  );
}

/* ─── CountUp ────────────────────────────────────────────────────────────── */
function CountUp({ to, duration = 2, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const ms = duration * 1000;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / ms, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((eased * to).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration, decimals]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Typewriter ─────────────────────────────────────────────────────────── */
function Typewriter({ text, speed = 72, delay = 400 }) {
  const [shown, setShown] = useState(0);
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const init = setTimeout(() => {
      const id = setInterval(() => {
        setShown((s) => {
          if (s >= text.length) {
            clearInterval(id);
            setTimeout(() => setBlink(false), 1100);
            return s;
          }
          return s + 1;
        });
      }, speed);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(init);
  }, [text, speed, delay]);
  return (
    <>
      {text.slice(0, shown)}
      {blink && <span className="mh-cursor inline-block w-[1.5px] h-[0.82em] bg-white/75 ml-px align-middle" />}
    </>
  );
}

/* ─── FadeIn ─────────────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, y = 22, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── VideoCard ──────────────────────────────────────────────────────────── */
function VideoCard({ src, title }) {
  const [playing, setPlaying] = useState(false);
  const embedSrc = useMemo(() => buildAutoplayUrl(src, playing), [src, playing]);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-2 shadow-[0_16px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] bg-black">
        {!playing ? (
          <>
            <img
              alt={title}
              src={`https://img.youtube.com/vi/${extractYouTubeId(src)}/hqdefault.jpg`}
              className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
            />
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center"
              aria-label={`Play ${title}`}
              type="button"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-[0_0_40px_rgba(0,81,255,0.35)] backdrop-blur-md transition group-hover:scale-110">
                <PlayIcon className="ml-1 h-7 w-7" />
              </span>
            </button>
          </>
        ) : (
          <>
            <iframe
              className="h-full w-full"
              src={embedSrc}
              title={title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <button
              onClick={() => setPlaying(false)}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-md"
              aria-label={`Pause ${title}`}
              type="button"
            >
              <PauseIcon className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ─── TestimonialVideoCard ───────────────────────────────────────────────── */
function TestimonialVideoCard({ src, index, playingIndex, setPlayingIndex }) {
  const isPlaying = playingIndex === index;
  const embedSrc = useMemo(() => buildAutoplayUrl(src, isPlaying), [src, isPlaying]);

  return (
    <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] bg-black">
      {!isPlaying ? (
        <>
          <img
            alt={`Testimonial ${index + 1}`}
            src={`https://img.youtube.com/vi/${extractYouTubeId(src)}/hqdefault.jpg`}
            className="h-full w-full object-cover"
          />
          <button
            onClick={() => setPlayingIndex(index)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={`Play testimonial ${index + 1}`}
            type="button"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-[0_0_35px_rgba(0,81,255,0.35)] backdrop-blur-md transition hover:scale-110">
              <PlayIcon className="ml-1 h-6 w-6" />
            </span>
          </button>
        </>
      ) : (
        <>
          <iframe
            className="h-full w-full"
            src={embedSrc}
            title={`Testimonial ${index + 1}`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <button
            onClick={() => setPlayingIndex(null)}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-md"
            aria-label={`Pause testimonial ${index + 1}`}
            type="button"
          >
            <PauseIcon className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
}

/* ─── Wavy Process Diagram ───────────────────────────────────────────────── */

/** Split a string into lines no longer than maxChars, capped at maxLines. */
function splitSvgText(text, maxChars = 23, maxLines = 3) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const word of words) {
    if (lines.length >= maxLines) break;
    const next = cur ? `${cur} ${word}` : word;
    if (next.length <= maxChars) {
      cur = next;
    } else {
      if (cur) lines.push(cur);
      cur = word;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  return lines;
}

function WavyProcessDiagram() {
  const vw = 1000;
  const vh = 360;
  const FONT = "Geist, Inter, ui-sans-serif, system-ui, sans-serif";

  /* Step-specific icons — each receives the icon center (cx, cy) */
  const stepIcons = [
    // 01 Drop Your Footage — cloud upload
    (cx, cy) => (
      <g transform={`translate(${cx},${cy})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M -7 1 Q -10 1 -10 -2 Q -10 -7 -5 -7 Q -4 -11 0 -11 Q 5 -11 6 -7 Q 10 -7 10 -3 Q 10 1 7 1" stroke="rgba(130,180,255,0.9)" strokeWidth="1.6" />
        <line x1="0" y1="9" x2="0" y2="2" stroke="#0051FF" strokeWidth="1.9" />
        <polyline points="-4,6 0,1 4,6" stroke="#0051FF" strokeWidth="1.9" />
      </g>
    ),
    // 02 Editing the Video — scissors
    (cx, cy) => (
      <g transform={`translate(${cx},${cy})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="-5" cy="7" r="3.2" stroke="#0051FF" strokeWidth="1.6" />
        <circle cx="5"  cy="7" r="3.2" stroke="#0051FF" strokeWidth="1.6" />
        <line x1="-2.5" y1="4.2" x2="8"  y2="-9" stroke="rgba(130,180,255,0.9)" strokeWidth="1.6" />
        <line x1="2.5"  y1="4.2" x2="-8" y2="-9" stroke="rgba(130,180,255,0.9)" strokeWidth="1.6" />
      </g>
    ),
    // 03 Feedback? Easy — chat bubble
    (cx, cy) => (
      <g transform={`translate(${cx},${cy})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M -9 -8 Q -9 -12 -5 -12 L 5 -12 Q 9 -12 9 -8 L 9 0 Q 9 4 5 4 L 1 4 L -2 8 L -2 4 L -5 4 Q -9 4 -9 0 Z" stroke="#0051FF" strokeWidth="1.6" />
        <line x1="-5" y1="-7" x2="5" y2="-7" stroke="rgba(130,180,255,0.7)" strokeWidth="1.3" />
        <line x1="-5" y1="-3" x2="2" y2="-3" stroke="rgba(130,180,255,0.7)" strokeWidth="1.3" />
      </g>
    ),
    // 04 Upload & Grow — rocket
    (cx, cy) => (
      <g transform={`translate(${cx},${cy})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 0 -11 Q 7 -9 7 -2 L 7 4 Q 0 7 -7 4 L -7 -2 Q -7 -9 0 -11" stroke="#0051FF" strokeWidth="1.6" />
        <circle cx="0" cy="-3" r="2.4" stroke="rgba(130,180,255,0.9)" strokeWidth="1.4" />
        <path d="M 7 1 L 10.5 5.5 L 6 4"   stroke="rgba(130,180,255,0.75)" strokeWidth="1.4" />
        <path d="M -7 1 L -10.5 5.5 L -6 4" stroke="rgba(130,180,255,0.75)" strokeWidth="1.4" />
        <path d="M -2.5 7 Q 0 11.5 2.5 7" stroke="rgba(255,140,60,0.92)" strokeWidth="1.7" />
      </g>
    ),
  ];

  /* Icon center positions in SVG coordinate space.
     Lower y = higher on screen.  Pattern: low → high → mid → highest */
  const pts = [
    { x: 122, y: 178 },
    { x: 360, y: 92  },
    { x: 618, y: 156 },
    { x: 872, y: 70  },
  ];

  /* Smooth cubic bezier: mid-point control handles keep curves natural */
  const pathD = pts.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = pts[i - 1];
    const mx = (prev.x + pt.x) / 2;
    return `${acc} C ${mx} ${prev.y} ${mx} ${pt.y} ${pt.x} ${pt.y}`;
  }, "");

  return (
    <motion.svg
      viewBox={`0 0 ${vw} ${vh}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      overflow="visible"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <defs>
        <filter id="wavy-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Wide soft glow behind the line */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(0,81,255,0.12)"
        strokeWidth={22}
        strokeLinecap="round"
      />

      {/* Animated draw-on path */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="rgba(0,81,255,0.68)"
        strokeWidth={2.2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
      />

      {pts.map((pt, i) => {
        const step = processSteps[i];
        const titleLines = splitSvgText(step.title, 20, 2);
        const descLines  = splitSvgText(step.desc,  24, 3);
        const textY = pt.y + 44; // start of title text, below icon

        return (
          <motion.g
            key={step.n}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.45 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Large ghost step number */}
            <text
              x={pt.x + 16} y={pt.y + 82}
              fill="rgba(255,255,255,0.042)"
              fontSize={92} fontWeight={900}
              fontFamily={FONT}
            >
              {i + 1}
            </text>

            {/* Icon box — filled bg */}
            <rect
              x={pt.x - 26} y={pt.y - 26}
              width={52} height={52} rx={12}
              fill="rgba(0,45,130,0.38)"
            />
            {/* Icon box — glowing border */}
            <rect
              x={pt.x - 26} y={pt.y - 26}
              width={52} height={52} rx={12}
              fill="none"
              stroke="rgba(0,100,255,0.55)"
              strokeWidth={1.3}
              filter="url(#wavy-glow)"
            />

            {/* Step-specific icon */}
            {stepIcons[i](pt.x, pt.y)}

            {/* Title lines */}
            {titleLines.map((line, li) => (
              <text
                key={li}
                x={pt.x} y={textY + li * 17}
                fill="rgba(255,255,255,0.93)"
                fontSize={13.5} fontWeight={600}
                textAnchor="middle"
                fontFamily={FONT}
              >
                {line}
              </text>
            ))}

            {/* Description lines */}
            {descLines.map((line, li) => (
              <text
                key={li}
                x={pt.x}
                y={textY + titleLines.length * 17 + 14 + li * 15}
                fill="rgba(255,255,255,0.44)"
                fontSize={11}
                textAnchor="middle"
                fontFamily={FONT}
              >
                {line}
              </text>
            ))}
          </motion.g>
        );
      })}
    </motion.svg>
  );
}

/* ─── FAQAccordion ───────────────────────────────────────────────────────── */
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {faqItems.map((item, index) => {
        const open = openIndex === index;
        return (
          <motion.div
            key={item.q}
            layout
            className={cn(
              "overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-[0_10px_45px_rgba(0,0,0,0.25)] backdrop-blur-xl transition",
              open && "shadow-[0_16px_60px_rgba(0,81,255,0.18)]"
            )}
          >
            <button
              onClick={() => setOpenIndex(open ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              type="button"
            >
              <span className="text-base font-medium text-white sm:text-lg">{item.q}</span>
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.28 }}>
                <ChevronDownIcon className={cn("h-5 w-5 shrink-0", open ? "text-[#0051FF]" : "text-white/60")} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-sm leading-7 text-white/70">{item.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Main App ───────────────────────────────────────────────────────────── */
export default function MotionHolicPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [playingTestimonial, setPlayingTestimonial] = useState(null);

  /* ── Lenis smooth scroll ─────────────────────────────────────────── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const filteredVideos =
    activeTab === "All"
      ? workVideos
      : workVideos.filter((v) => v.category === activeTab.toLowerCase());

  return (
    <div className="min-h-screen bg-[#05070b] text-white selection:bg-[#0051FF]/30">
      {/* Fixed background divs — index.css hides these; body::before provides the real bg */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(0,81,255,0.18),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(0,81,255,0.12),transparent_25%),linear-gradient(180deg,#05070b_0%,#07090f_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:90px_90px]" />

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/[0.14] bg-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-2xl">
          {/* Main nav row */}
          <div className="flex items-center justify-between px-5 py-3.5">
            <a href="#top" className="flex items-center gap-3">
              <img src="/logo.avif" alt="MotionHolic logo" className="h-10 w-10 object-contain" />
              <p className="font-semibold tracking-wide">MotionHolic</p>
            </a>

            <nav className="hidden items-center gap-5 md:flex lg:gap-8">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="text-sm text-white/70 transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <button
                onClick={openCalendly}
                className="rounded-full border border-[#0051FF]/30 bg-[#0051FF] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_28px_rgba(0,81,255,0.35)] transition hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,81,255,0.55)] lg:px-5 lg:py-2.5"
                type="button"
              >
                Book a call
              </button>
            </div>

            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="md:hidden"
              type="button"
              aria-label="Toggle menu"
            >
              {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile dropdown — stays inside the island */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden border-t border-white/8 lg:hidden"
              >
                <div className="space-y-4 px-5 py-5">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block text-white/80"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <button
                    onClick={openCalendly}
                    className="w-full rounded-full bg-[#0051FF] px-5 py-3 font-semibold text-white"
                    type="button"
                  >
                    Book a call
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main id="top" className="pt-20 md:pt-24">
        {/* ── HERO — two-column ────────────────────────────────────────── */}
        <section className="px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">

              {/* Left — headline + CTA */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionBadge><Typewriter text="Video Editing Studio" /></SectionBadge>
                <h1 className="mt-4 text-[1.9rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-[2.75rem] lg:text-[3.5rem] xl:text-6xl">
                  From Frame to Frame,{" "}
                  <span className="text-[#0051FF]">We Grow Your Name</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                  From attention-grabbing videos to high-impact designs, I help creators and brands captivate their audience.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={openCalendly}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#0051FF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(0,81,255,0.35)] transition hover:scale-[1.03] hover:shadow-[0_0_55px_rgba(0,81,255,0.55)]"
                    type="button"
                  >
                    Book a call
                    <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </button>
                  <a
                    href="#work"
                    className="text-sm font-medium text-white/55 underline underline-offset-4 transition hover:text-white"
                  >
                    View our work
                  </a>
                </div>
              </motion.div>

              {/* Right — showreel video */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ y: 0 }}
                whileInView="visible"
              >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="rounded-[32px] border border-white/10 bg-white/5 p-3 shadow-[0_24px_90px_rgba(0,81,255,0.14)] backdrop-blur-2xl">
                  <div className="aspect-video overflow-hidden rounded-[24px]">
                    <iframe
                      className="h-full w-full"
                      src={heroVideo}
                      title="MotionHolic showreel"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR — infinite marquee ─────────────────────────────── */}
        <div className="border-y border-white/8 bg-white/[0.015] py-6 overflow-hidden">
          <div className="mh-marquee flex items-center">
            {[...trustStats, ...trustStats, ...trustStats].map((stat, i) => (
              <div key={i} className="flex shrink-0 flex-col items-center px-14 text-center">
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  {stat.num !== null && stat.num !== undefined
                    ? <CountUp to={stat.num} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
                    : stat.value}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/45">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SERVICES ─────────────────────────────────────────────────── */}
        <section id="services" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <FadeIn className="mb-14 text-center">
              <SectionBadge>What We Offer</SectionBadge>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                Services We <span className="text-[#0051FF]">Excel At</span>
              </h2>
            </FadeIn>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: i * 0.07 }}
                  whileHover={{ y: -7, boxShadow: "0 0 45px rgba(0,81,255,0.22), 0 20px 60px rgba(0,0,0,0.4)" }}
                  transition={{ duration: 0.25 }}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-7 lg:p-8"
                >
                  <div className="mb-3 text-3xl sm:text-4xl">{service.icon}</div>
                  <h3 className="mb-2 text-base font-semibold text-white sm:mb-3 sm:text-lg">{service.title}</h3>
                  <p className="text-sm leading-6 text-white/55 sm:leading-7">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WORK — tabbed portfolio ───────────────────────────────────── */}
        <section id="work" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <FadeIn>
                <SectionBadge>Our Work</SectionBadge>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                  Some of our{" "}
                  <span className="text-[#0051FF]">Featured Projects</span>
                </h2>
              </FadeIn>

              {/* Tab switcher */}
              <div className="flex shrink-0 gap-1.5 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-xl">
                {WORK_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition",
                      activeTab === tab
                        ? "bg-[#0051FF] text-white shadow-[0_0_20px_rgba(0,81,255,0.4)]"
                        : "text-white/55 hover:text-white"
                    )}
                    type="button"
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.src + activeTab}
                    layout
                    initial={{ opacity: 0, scale: 0.94, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                  >
                    <VideoCard src={video.src} title={`Featured project ${index + 1}`} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── PROCESS — wavy SVG path diagram ──────────────────────────── */}
        <section id="process" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            {/* Heading — centered */}
            <FadeIn className="mb-14 text-center">
              <SectionBadge>Our Process</SectionBadge>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                Our strategy to get{" "}
                <span className="text-[#0051FF]">you leads with content</span>
              </h2>
            </FadeIn>

            {/* ── Wavy diagram — desktop (lg+) only ── */}
            <div className="hidden lg:block">
              <WavyProcessDiagram />
            </div>

            {/* ── Mobile / tablet fallback — 2-column grid ── */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="relative rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-8"
                >
                  <p className="mb-4 text-[2.5rem] font-black leading-none sm:mb-5 sm:text-[3.5rem]" style={{ color: "rgba(0,81,255,0.22)" }}>
                    {step.n}
                  </p>
                  <h3 className="mb-2 text-base font-semibold capitalize text-white sm:mb-3 sm:text-lg">{step.title}</h3>
                  <p className="text-[13px] leading-6 text-white/55 sm:text-sm sm:leading-7">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <button
                onClick={openCalendly}
                className="group relative overflow-hidden rounded-full bg-[#0051FF] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_35px_rgba(0,81,255,0.35)] transition hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(0,81,255,0.55)]"
                type="button"
              >
                <span className="relative z-10">Get in touch</span>
                <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-[420%]" />
              </button>
            </div>
          </div>
        </section>

        {/* ── PRICING — side by side ────────────────────────────────────── */}
        <section id="pricing" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <FadeIn className="mb-14 text-center">
              <SectionBadge>Pricing Plans</SectionBadge>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                The Best Service{" "}
                <span className="text-[#0051FF]">Package For You</span>
              </h2>
            </FadeIn>

            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
              {/* Basic */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.55 }}
                whileHover={{ y: -6, boxShadow: "0 0 40px rgba(0,81,255,0.15), 0 24px 80px rgba(0,0,0,0.35)" }}
                className="flex flex-col rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
              >
                <h3 className="mb-1 text-2xl font-semibold text-white">Basic Plan</h3>
                <p className="mb-8 text-sm text-white/45">Perfect to get started</p>
                <ul className="flex flex-1 flex-col gap-3.5">
                  {basicFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0051FF]/15 text-[#0051FF]">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span className="text-sm text-white/80">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openCalendly}
                  className="mt-8 w-full rounded-full border border-white/20 py-3.5 text-sm font-semibold text-white transition hover:border-[#0051FF]/45 hover:bg-[#0051FF]/10"
                  type="button"
                >
                  Get started
                </button>
              </motion.div>

              {/* Premium */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 0 55px rgba(0,81,255,0.35), 0 24px 80px rgba(0,0,0,0.35)" }}
                className="flex flex-col rounded-[32px] border border-[#0051FF]/40 p-8 shadow-[0_24px_90px_rgba(0,81,255,0.16)] backdrop-blur-2xl"
                style={{ background: "linear-gradient(160deg, rgba(0,81,255,0.12) 0%, rgba(255,255,255,0.03) 100%)" }}
              >
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-white">Premium Plan</h3>
                  <span className="rounded-full bg-[#0051FF] px-3 py-1 text-xs font-semibold text-white">Popular</span>
                </div>
                <p className="mb-8 text-sm text-white/45">For serious content creators</p>
                <ul className="flex flex-1 flex-col gap-3.5">
                  {premiumFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0051FF]/25 text-[#0051FF]">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span className="text-sm text-white/80">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openCalendly}
                  className="mt-8 w-full rounded-full bg-[#0051FF] py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(0,81,255,0.4)] transition hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(0,81,255,0.55)]"
                  type="button"
                >
                  Get started
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS — stars + video cards ───────────────────────── */}
        <section id="testimonials" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl text-center">
            <FadeIn>
              <SectionBadge>Client Testimonials</SectionBadge>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                Hear What They&apos;re{" "}
                <span className="text-[#0051FF]">Saying About Us</span>
              </h2>
            </FadeIn>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  whileHover={{ y: -6, boxShadow: "0 0 40px rgba(0,81,255,0.18), 0 20px 60px rgba(0,0,0,0.4)" }}
                  className="flex flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_16px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl"
                >
                  {/* Stars */}
                  <div className="mb-5 flex justify-center gap-1">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <StarIcon key={si} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>

                  {/* Video */}
                  <TestimonialVideoCard
                    src={t.src}
                    index={i}
                    playingIndex={playingTestimonial}
                    setPlayingIndex={setPlayingTestimonial}
                  />

                  {/* Reviewer */}
                  <div className="mt-5 text-center">
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="mt-0.5 text-sm text-white/45">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section id="faq" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <FadeIn className="mb-14 text-center">
              <SectionBadge>FAQ</SectionBadge>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                Got <span className="text-[#0051FF]">Questions?</span>
              </h2>
            </FadeIn>
            <FAQAccordion />
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/8 bg-black/20 px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/10 bg-white/5 shadow-[0_0_45px_rgba(0,81,255,0.18)]"
            animate={{ boxShadow: ["0 0 45px rgba(0,81,255,0.18)", "0 0 70px rgba(0,81,255,0.35)", "0 0 45px rgba(0,81,255,0.18)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src="/logo.avif" alt="MotionHolic logo" className="h-10 w-10 object-contain" />
          </motion.div>
          <h3 className="mt-5 text-2xl font-semibold text-white">MotionHolic</h3>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 transition hover:scale-110 hover:border-[#0051FF]/40 hover:shadow-[0_0_32px_rgba(0,81,255,0.28)]"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 transition hover:scale-110 hover:border-[#0051FF]/40 hover:shadow-[0_0_32px_rgba(0,81,255,0.28)]"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={gmailLink}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 transition hover:scale-110 hover:border-[#0051FF]/40 hover:shadow-[0_0_32px_rgba(0,81,255,0.28)]"
              aria-label="Gmail"
            >
              <MailIcon className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-8 text-sm text-white/40">© Copyright 2026 MotionHolic — All rights reserved.</p>
        </motion.div>
      </footer>
    </div>
  );
}
