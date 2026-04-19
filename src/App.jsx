import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";

const calendlyLink = "https://calendly.com/ayonpalovi10/video-editing-service";
const instagramLink = "https://www.instagram.com/ovisperspective/";
const linkedinLink = "https://www.linkedin.com/in/ayonkumarpaulovi/";
const gmailLink = "mailto:ayonpalovi10@gmail.com";

const heroVideo = "https://www.youtube.com/embed/8GW8QOYTSk8?si=5-KGzAGu34GjNn4v";
const testimonialVideos = [
 "https://www.youtube.com/embed/WZQZoJwTbkw?si=oxI45XuFFzFiGJ_w",
  "https://www.youtube.com/embed/WZQZoJwTbkw?si=oxI45XuFFzFiGJ_w",
  "https://www.youtube.com/embed/WZQZoJwTbkw?si=oxI45XuFFzFiGJ_w",
  "https://www.youtube.com/embed/WZQZoJwTbkw?si=oxI45XuFFzFiGJ_w",
  "https://www.youtube.com/embed/WZQZoJwTbkw?si=oxI45XuFFzFiGJ_w",

];
const workVideos = [
  "https://www.youtube.com/embed/TR-yFaak-Zs?si=8gXblCQcwJBxymvd",
  "https://www.youtube.com/embed/V__rxnsSPY0?si=zcq0UAH2gmPBx40D",
  "https://www.youtube.com/embed/KPZ39Q9x1OY?si=QeUn2ery8GuBHWL-",
  "https://www.youtube.com/embed/jZ42Sq9qYr0?si=pRm679iehCOtaE0a",
  "https://www.youtube.com/embed/a5fa0qlvk38?si=Xt1AXJaBeF0Tbdhq",

];

const navItems = [
  { label: "Testimonials", href: "#testimonials" },
  { label: "Work", href: "#work" },
  { label: "Features", href: "#features" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const marqueeItems = ["5 Years of Experience", "Fast Delivery", "2x Engagement"];
const leftBadges = ["🎬 Short Form Videos", "🎙️ Podcast Editing", "🎞️ Documentary Edit"];
const rightBadges = ["📣 Ad Creative & VSL", "⚡ Short Form Video", "▶️ YouTube Video"];

const faqItems = [
  {
    q: "How does the process work?",
    a: "Once you share your project details, I carefully review your vision and requirements. From there, I dive into the creative process — editing, designing, and refining until it matches your expectations. You’ll receive regular updates, and revisions are always welcome to make sure the final result hits the mark.",
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
    a: "No, I don’t offer free trials.",
  },
  {
    q: "How do we communicate throughout the project?",
    a: "We stay connected through WhatsApp, Email, and Google Meet, making communication simple and effective. You’ll receive timely updates, previews, and can easily share feedback at every stage.",
  },
];

const processItems = [
  {
    n: 1,
    align: "right",
    title: "drop your footages",
    subtitle: "Upload your raw clips — WeTransfer, Google Drive, Dropbox — whatever works for you.",
    chips: ["WeTransfer", "Google Drive", "Dropbox"],
  },
  {
    n: 2,
    align: "left",
    title: "Editing the Video",
    subtitle: "We make the best quality videos using advanced motion graphics that bring your message to life",
    chips: ["Premiere Pro", "After Effects", "Final Cut Pro", "DaVinci Resolve"],
  },
  {
    n: 3,
    align: "right",
    title: "Feedbacks? Easy",
    subtitle: "Want something to change? We offer smooth revision rounds to make sure everything.",
    chips: ["Request a revision", "Request is in progress"],
  },
  {
    n: 4,
    align: "left",
    title: "Upload & Grow",
    subtitle: "Upload your content and grow your business",
    chips: ["Final_version_II", "Publish"],
  },
];

const scrollWords = [
  { text: "Tired" },
  { text: "of" },
  { text: "boring video content", highlight: true },
  { text: "that" },
  { text: "don’t stand out", highlight: true },
  { text: "?" },
  { text: "It’s" },
  { text: "time" },
  { text: "to" },
  { text: "upgrade the game", highlight: true },
  { text: "with" },
  { text: "us!" },
];

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

function runComponentSelfTests() {
  const tests = [
    {
      name: "extractYouTubeId parses embed URL",
      pass: extractYouTubeId("https://www.youtube.com/embed/abc123XYZ09?rel=0") === "abc123XYZ09",
    },
    {
      name: "extractYouTubeId falls back for invalid URL",
      pass: extractYouTubeId("https://example.com/video") === "dQw4w9WgXcQ",
    },
    {
      name: "buildAutoplayUrl appends query",
      pass: buildAutoplayUrl("https://www.youtube.com/embed/abc?rel=0", true) === "https://www.youtube.com/embed/abc?rel=0&autoplay=1",
    },
    {
      name: "buildAutoplayUrl creates first query",
      pass: buildAutoplayUrl("https://www.youtube.com/embed/abc", true) === "https://www.youtube.com/embed/abc?autoplay=1",
    },
    {
      name: "buildAutoplayUrl leaves original when disabled",
      pass: buildAutoplayUrl("https://www.youtube.com/embed/abc", false) === "https://www.youtube.com/embed/abc",
    },
    {
      name: "cn joins truthy classes only",
      pass: cn("a", false, null, undefined, "b") === "a b",
    },
    {
      name: "faq length stays six",
      pass: faqItems.length === 6,
    },
    {
      name: "testimonial count stays five",
      pass: testimonialVideos.length === 5,
    },
  ];

  tests.forEach((test) => {
    if (!test.pass) console.error(`Self-test failed: ${test.name}`);
  });
}

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
  <IconBase className={className}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </IconBase>
);

const XIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M18 6 6 18M6 6l12 12" />
  </IconBase>
);

const ArrowRightIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M5 12h14" />
    <path d="m13 5 7 7-7 7" />
  </IconBase>
);

const ChevronDownIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m6 9 6 6 6-6" />
  </IconBase>
);

const ChevronLeftIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m15 18-6-6 6-6" />
  </IconBase>
);

const ChevronRightIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m9 18 6-6-6-6" />
  </IconBase>
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
  <IconBase className={className}>
    <path d="M20 6 9 17l-5-5" />
  </IconBase>
);

const SparklesIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
  </IconBase>
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

function SectionLabel({ children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/60 backdrop-blur-xl">
      <SparklesIcon className="h-3.5 w-3.5 text-[#0051FF]" />
      <span>{children}</span>
    </div>
  );
}

function GradientHeading({ white, blue }) {
  return (
    <h2 className="text-center text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
      <span>{white}</span>
      <br />
      <span className="text-[#0051FF]">{blue}</span>
    </h2>
  );
}

function GlassBadge({ text, className = "" }) {
  return <div className={cn("rounded-full border border-white/15 bg-white/8 px-4 py-3 text-sm text-white/90 shadow-[0_8px_40px_rgba(0,81,255,0.18)] backdrop-blur-xl", className)}>{text}</div>;
}

function YouTubeEmbed({ src, title, ratio = "video", className = "" }) {
  const ratioClass = ratio === "portrait" ? "aspect-[9/16]" : "aspect-video";
  return (
    <div className={cn("overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0a0f] shadow-[0_20px_80px_rgba(0,81,255,0.12)]", ratioClass, className)}>
      <iframe
        className="h-full w-full"
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

function ScrollRevealText({ words }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.25 });
  return (
    <div ref={ref} className="text-center">
      <div className="mx-auto max-w-5xl text-3xl font-semibold leading-[1.2] tracking-tight text-white sm:text-4xl md:text-6xl">
        {words.map((word, i) => (
          <motion.span
            key={`${word.text}-${i}`}
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0.15, y: 24, filter: "blur(10px)" }}
            transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className={cn("mr-3 inline-block", word.highlight ? "text-[#0051FF]" : "text-white")}
          >
            {word.text}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function Counter({ end, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    let raf = 0;
    const tick = (now) => {
      const progress = Math.min((now - startTime) / 1800, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, end]);

  return (
    <span ref={ref} className="bg-gradient-to-r from-[#0051FF] via-white to-[#0051FF] bg-clip-text text-6xl font-black tracking-tight text-transparent sm:text-7xl md:text-8xl">
      {value}
      {suffix}
    </span>
  );
}

function VideoCard({ src, title }) {
  const [playing, setPlaying] = useState(false);
  const embedSrc = useMemo(() => buildAutoplayUrl(src, playing), [src, playing]);
  return (
    <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.25 }} className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-2 shadow-[0_16px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] bg-black">
        {!playing ? (
          <>
            <img alt={title} src={`https://img.youtube.com/vi/${extractYouTubeId(src)}/hqdefault.jpg`} className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100" />
            <button onClick={() => setPlaying(true)} className="absolute inset-0 flex items-center justify-center" aria-label={`Play ${title}`} type="button">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-[0_0_40px_rgba(0,81,255,0.35)] backdrop-blur-md transition group-hover:scale-110">
                <PlayIcon className="ml-1 h-7 w-7" />
              </span>
            </button>
          </>
        ) : (
          <>
            <iframe className="h-full w-full" src={embedSrc} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            <button onClick={() => setPlaying(false)} className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-md" aria-label={`Pause ${title}`} type="button">
              <PauseIcon className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function TimelineCard({ item }) {
  const isLeft = item.align === "left";
  const chipClasses = (text) => {
    if (text === "Request a revision") return "bg-[#0051FF] text-white";
    if (text === "Request is in progress") return "bg-white text-black";
    if (text === "Final_version_II") return "border border-white/10 bg-black text-white";
    if (text === "Publish") return "bg-white text-black";
    return "border border-white/15 bg-white/8 text-white/90";
  };

  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.35 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative grid items-center gap-8 md:grid-cols-[1fr_100px_1fr]">
      <div className={cn("hidden md:block", isLeft ? "order-3" : "order-1")} />
      <div className="relative order-2 flex justify-center">
        <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#0b0d14] text-xl font-bold text-white shadow-[0_0_0_8px_rgba(255,255,255,0.02),0_0_45px_rgba(0,81,255,0.2)]">
          {item.n}
        </div>
      </div>
      <div className={cn("order-3", isLeft ? "md:order-1" : "md:order-3")}>
        <div className="rounded-[28px] border border-white/10 bg-white/6 p-6 shadow-[0_20px_70px_rgba(0,81,255,0.12)] backdrop-blur-2xl">
          <h3 className="text-2xl font-semibold text-[#0051FF]">{item.title}</h3>
          <div className="my-5 flex flex-wrap gap-3">
            {item.chips.map((chip, i) => (
              <motion.div key={chip} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.8 + i * 0.3, ease: "easeInOut" }} className={cn("rounded-full px-4 py-3 text-sm font-medium shadow-lg", chipClasses(chip))}>
                {chip}
              </motion.div>
            ))}
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/80">{item.subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}

function PricingToggle() {
  const [premium, setPremium] = useState(false);
  const features = premium
    ? ["20 short form videos", "Content Idea", "High Quality editing", "Free Thumbnails", "Trending Animation Styles", "24/7 Support, Anytime You Need Us", "No Hidden Fees", "Upgrade Anytime", "Cancel Anytime"]
    : ["1 video with Subtitles (Any editing style)", "Color Grading", "Motion Graphics", "Sound Design", "Unlimited revisions", "No Hidden Fees", "Upgrade Anytime", "Cancel Anytime"];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10 flex items-center justify-center gap-4">
        <span className={cn("text-sm sm:text-base", !premium ? "text-white" : "text-white/45")}>Basic Plan</span>
        <button onClick={() => setPremium((p) => !p)} className="relative h-12 w-24 rounded-full border border-white/10 bg-white/8 p-1 shadow-[0_0_40px_rgba(0,81,255,0.18)] backdrop-blur-xl transition" aria-label="Toggle pricing plan" type="button">
          <motion.span animate={{ x: premium ? 48 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0051FF] shadow-[0_0_25px_rgba(0,81,255,0.5)]">
            <StarIcon className="h-4 w-4 text-white" />
          </motion.span>
        </button>
        <span className={cn("text-sm sm:text-base", premium ? "text-white" : "text-white/45")}>Premium Plan</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={premium ? "premium" : "basic"} initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -18, scale: 0.98 }} transition={{ duration: 0.35 }} className={cn("rounded-[32px] border border-white/10 bg-gradient-to-b from-white/8 to-white/5 p-8 shadow-[0_24px_90px_rgba(0,81,255,0.14)] backdrop-blur-2xl", premium && "ring-1 ring-[#0051FF]/40")}>
          <h3 className="mb-6 text-center text-3xl font-semibold text-white">{premium ? "Premium Plan" : "Basic Plan"}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#0051FF]/15 text-[#0051FF]">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="text-sm text-white/85">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex justify-center">
        <button onClick={openCalendly} className="group relative overflow-hidden rounded-full border border-[#0051FF]/30 bg-[#0051FF] px-8 py-4 text-sm font-semibold text-white transition hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(0,81,255,0.45)]" type="button">
          <span className="relative z-10">Get started</span>
          <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-[420%]" />
        </button>
      </div>
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {faqItems.map((item, index) => {
        const open = openIndex === index;
        return (
          <motion.div key={item.q} layout className={cn("overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-[0_10px_45px_rgba(0,0,0,0.25)] backdrop-blur-xl transition", open && "shadow-[0_16px_60px_rgba(0,81,255,0.18)]")}>
            <button onClick={() => setOpenIndex(open ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" type="button">
              <span className="text-base font-medium text-white sm:text-lg">{item.q}</span>
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.28 }}>
                <ChevronDownIcon className={cn("h-5 w-5", open ? "text-[#0051FF]" : "text-white")} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <div className="px-6 pb-6 text-sm leading-7 text-white/75">{item.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function MotionHolicPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(2);
  const [playingTestimonial, setPlayingTestimonial] = useState(null);
  const processRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: processRef, offset: ["start 20%", "end 80%"] });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    runComponentSelfTests();
  }, []);

  return (
    <div className="min-h-screen bg-[#05070b] text-white selection:bg-[#0051FF]/30">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(0,81,255,0.18),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(0,81,255,0.12),transparent_25%),linear-gradient(180deg,#05070b_0%,#07090f_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:90px_90px]" />

      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#05070b]/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <img
              src="/logo.avif"
              alt="Ayon Pal Ovi logo"
              className="h-11 w-11 object-contain"
            />
            <div>
              <p className="text-sm text-white/55"></p>
              <p className="font-semibold tracking-wide">MotionHolic</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-white/70 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <button onClick={openCalendly} className="rounded-full border border-[#0051FF]/30 bg-[#0051FF] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(0,81,255,0.35)] transition hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(0,81,255,0.55)]" type="button">
              Book a call
            </button>
          </div>

          <button onClick={() => setMenuOpen((s) => !s)} className="lg:hidden" type="button" aria-label="Toggle menu">
            {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-white/8 lg:hidden">
              <div className="space-y-4 px-4 py-5 sm:px-6">
                {navItems.map((item) => (
                  <a key={item.label} href={item.href} className="block text-white/80" onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </a>
                ))}
                <button onClick={openCalendly} className="w-full rounded-full bg-[#0051FF] px-5 py-3 font-semibold text-white" type="button">
                  Book a call
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="top">
        <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[88px]">
                  From Frame to Frame, <span className="text-[#0051FF]">We Grow Your Name</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                  From attention-grabbing videos to high-impact designs, I help creators and brands captivate their audience.
                </p>
                <div className="mt-9 flex items-center justify-center">
                  <button onClick={openCalendly} className="group inline-flex items-center gap-2 rounded-full border border-[#0051FF]/20 bg-[#0051FF] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(0,81,255,0.35)] transition hover:scale-[1.03] hover:shadow-[0_0_55px_rgba(0,81,255,0.55)]" type="button">
                    Book a call
                    <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="relative mt-14 overflow-hidden rounded-full border border-white/10 bg-white/6 py-4 shadow-[0_20px_80px_rgba(0,81,255,0.12)] backdrop-blur-2xl">
              <motion.div className="flex gap-4 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}>
                {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
                  <motion.div key={`${item}-${index}`} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3.2 + (index % 3), ease: "easeInOut" }} className="ml-4 inline-flex rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm text-white/90 shadow-[0_8px_40px_rgba(0,81,255,0.16)] backdrop-blur-xl">
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.75 }} className="mx-auto mt-10 max-w-5xl">
              <div className="rounded-[32px] border border-white/10 bg-white/6 p-3 shadow-[0_24px_90px_rgba(0,81,255,0.14)] backdrop-blur-2xl">
                <YouTubeEmbed src={heroVideo} title="Agency showreel" ratio="video" className="shadow-[0_0_50px_rgba(0,81,255,0.16)]" />
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="px-4 py-28 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_minmax(0,780px)_1fr]">
            <div className="space-y-4">
              {leftBadges.map((badge, i) => (
                <motion.div key={badge} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.4 }} transition={{ duration: 0.55, delay: i * 0.1 }}>
                  <GlassBadge text={badge} className="w-fit" />
                </motion.div>
              ))}
            </div>
            <div className="flex min-h-[40vh] items-center justify-center">
              <ScrollRevealText words={scrollWords} />
            </div>
            <div className="space-y-4 lg:ml-auto">
              {rightBadges.map((badge, i) => (
                <motion.div key={badge} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.4 }} transition={{ duration: 0.55, delay: i * 0.1 }} className="lg:flex lg:justify-end">
                  <GlassBadge text={badge} className="w-fit" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-28 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {[
              { value: 250, suffix: "%", label: "More Engagement" },
              { value: 4, suffix: "X", label: "More Reach" },
              { value: 60, suffix: "%", label: "More Sales" },
            ].map((stat) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 22, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, amount: 0.4 }} transition={{ duration: 0.55 }} className="rounded-[28px] border border-white/10 bg-white/5 px-6 py-10 text-center shadow-[0_16px_70px_rgba(0,81,255,0.08)] backdrop-blur-xl">
                <Counter end={stat.value} suffix={stat.suffix} />
                <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/65">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="px-4 py-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <SectionLabel>Client testimonials</SectionLabel>
            <GradientHeading white="Hear what they’re" blue="Saying about us" />
            <div className="relative mt-16 flex items-center justify-center gap-3 sm:gap-6">
              <button
                onClick={() => {
                  setPlayingTestimonial(null);
                  setCurrentTestimonial((p) => (p - 1 + testimonialVideos.length) % testimonialVideos.length);
                }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl transition hover:scale-105 hover:shadow-[0_0_30px_rgba(0,81,255,0.25)]"
                type="button"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>

              <div className="grid w-full max-w-6xl grid-cols-5 items-center gap-3 overflow-hidden sm:gap-5">
                {testimonialVideos.map((src, index) => {
                  const distance = Math.abs(index - currentTestimonial);
                  const active = index === currentTestimonial;
                  const near = distance === 1;
                  const far = distance >= 2;
                  const isPlaying = playingTestimonial === index;
                  const embedSrc = buildAutoplayUrl(src, isPlaying);

                  return (
                    <motion.div key={index} animate={{ scale: active ? 1 : near ? 0.86 : 0.72, opacity: active ? 1 : near ? 0.55 : 0.28, y: active ? 0 : near ? 8 : 14 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className={cn("relative mx-auto w-full max-w-[220px] overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-2 backdrop-blur-xl", active && "shadow-[0_0_50px_rgba(0,81,255,0.22)]")}>
                      <div className="relative aspect-[9/16] overflow-hidden rounded-[24px] bg-black">
                        {!isPlaying ? (
                          <>
                            <img alt={`Testimonial ${index + 1}`} src={`https://img.youtube.com/vi/${extractYouTubeId(src)}/hqdefault.jpg`} className="h-full w-full object-cover" />
                            <button onClick={() => setPlayingTestimonial(index)} className="absolute inset-0 flex items-center justify-center" aria-label={`Play testimonial ${index + 1}`} type="button">
                              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-[0_0_35px_rgba(0,81,255,0.35)] backdrop-blur-md transition hover:scale-110">
                                <PlayIcon className="ml-1 h-6 w-6" />
                              </span>
                            </button>
                          </>
                        ) : (
                          <>
                            <iframe className="h-full w-full" src={embedSrc} title={`Testimonial ${index + 1}`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                            <button onClick={() => setPlayingTestimonial(null)} className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-md" aria-label={`Pause testimonial ${index + 1}`} type="button">
                              <PauseIcon className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {!active && <div className="pointer-events-none absolute inset-0 bg-black/45" />}
                        {far && <div className="pointer-events-none absolute inset-0 bg-black/35" />}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setPlayingTestimonial(null);
                  setCurrentTestimonial((p) => (p + 1) % testimonialVideos.length);
                }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl transition hover:scale-105 hover:shadow-[0_0_30px_rgba(0,81,255,0.25)]"
                type="button"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        <section id="work" className="px-4 py-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <SectionLabel>Works</SectionLabel>
              <GradientHeading white="Some of our" blue="featured projects" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {workVideos.map((video, index) => (
                <VideoCard key={`${video}-${index}`} src={video} title={`Featured project ${index + 1}`} />
              ))}
            </div>
          </div>
        </section>

        <section id="process" ref={processRef} className="relative px-4 py-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <SectionLabel>Our process</SectionLabel>
              <GradientHeading white="Our strategy to get" blue="you leads with content" />
            </div>

            <div className="relative mx-auto max-w-6xl">
              <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 md:block" />
              <motion.div style={{ height: progressHeight }} className="absolute left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[#0051FF] md:block" />
              <div className="space-y-12 md:space-y-20">
                {processItems.map((item) => (
                  <TimelineCard key={item.n} item={item} />
                ))}
              </div>
            </div>

            <div className="mt-14 flex justify-center">
              <button onClick={openCalendly} className="rounded-full bg-[#0051FF] px-7 py-4 text-sm font-semibold text-white shadow-[0_0_35px_rgba(0,81,255,0.35)] transition hover:scale-[1.03] hover:shadow-[0_0_55px_rgba(0,81,255,0.5)]" type="button">
                Get in touch
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 py-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <SectionLabel>Pricing plans</SectionLabel>
            <GradientHeading white="The Best Service" blue="Package For You" />
            <div className="mt-14">
              <PricingToggle />
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <SectionLabel>FAQ</SectionLabel>
            <div className="mt-14">
              <FAQAccordion />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 bg-black/20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/10 bg-white/5 shadow-[0_0_45px_rgba(0,81,255,0.18)]">
          <img
            src="/logo.avif"
            alt="logo"
            className="h-10 w-10 object-contain"
          />
        </div>
          <h3 className="mt-5 text-2xl font-semibold text-white">MotionHolic</h3>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 shadow-[0_8px_28px_rgba(0,0,0,0.2)] backdrop-blur-xl transition hover:scale-110 hover:border-[#0051FF]/40 hover:text-white hover:shadow-[0_0_32px_rgba(0,81,255,0.28)]" aria-label="LinkedIn">
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 shadow-[0_8px_28px_rgba(0,0,0,0.2)] backdrop-blur-xl transition hover:scale-110 hover:border-[#0051FF]/40 hover:text-white hover:shadow-[0_0_32px_rgba(0,81,255,0.28)]" aria-label="Instagram">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={gmailLink} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 shadow-[0_8px_28px_rgba(0,0,0,0.2)] backdrop-blur-xl transition hover:scale-110 hover:border-[#0051FF]/40 hover:text-white hover:shadow-[0_0_32px_rgba(0,81,255,0.28)]" aria-label="Gmail">
              <MailIcon className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-8 text-sm text-white/40">© Copyright 2026  MotionHolic - All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
