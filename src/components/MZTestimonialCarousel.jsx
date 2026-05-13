import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const fallbackVideos = [
  "https://www.youtube.com/embed/WZQZoJwTbkw?si=oxI45XuFFzFiGJ_w",
  "https://www.youtube.com/embed/WZQZoJwTbkw?si=oxI45XuFFzFiGJ_w",
  "https://www.youtube.com/embed/WZQZoJwTbkw?si=oxI45XuFFzFiGJ_w",
  "https://www.youtube.com/embed/WZQZoJwTbkw?si=oxI45XuFFzFiGJ_w",
  "https://www.youtube.com/embed/WZQZoJwTbkw?si=oxI45XuFFzFiGJ_w",
];

function getUniqueVideos(section) {
  const iframeSources = Array.from(section.querySelectorAll("iframe"))
    .map((iframe) => iframe.getAttribute("src"))
    .filter(Boolean)
    .filter((src) => src.includes("youtube.com/embed"));

  const sources = iframeSources.length ? iframeSources : fallbackVideos;
  return [...new Set(sources)];
}

function getEnhancedEmbedUrl(src) {
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}rel=0&modestbranding=1&playsinline=1`;
}

function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function MZTestimonialCarousel() {
  const [mountNode, setMountNode] = useState(null);
  const [videos, setVideos] = useState(fallbackVideos);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let timeoutId;

    const mountIntoTestimonials = () => {
      const section = document.getElementById("testimonials");
      if (!section) return false;

      const originalVideos = getUniqueVideos(section);
      setVideos(originalVideos.length ? originalVideos : fallbackVideos);
      section.setAttribute("data-testimonial-override", "true");

      let host = section.querySelector("[data-mz-testimonial-carousel]");
      if (!host) {
        host = document.createElement("div");
        host.setAttribute("data-mz-testimonial-carousel", "true");
        section.appendChild(host);
      }

      setMountNode(host);
      return true;
    };

    if (!mountIntoTestimonials()) {
      timeoutId = window.setTimeout(mountIntoTestimonials, 250);
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (activeIndex > videos.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, videos.length]);

  const activeVideo = useMemo(() => getEnhancedEmbedUrl(videos[activeIndex] || fallbackVideos[0]), [videos, activeIndex]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + videos.length) % videos.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % videos.length);
  };

  if (!mountNode) return null;

  return createPortal(
    <>
      <style>{`
        #testimonials[data-testimonial-override="true"] > :not([data-mz-testimonial-carousel]) {
          display: none !important;
        }

        #testimonials[data-testimonial-override="true"] {
          position: relative;
          overflow: hidden;
        }
      `}</style>

      <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70 sm:text-sm">
          Client Testimonials
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          <span className="text-white/45">Hear What They&apos;re</span>
          <br />
          <span>Saying About Us</span>
        </h2>

        <div className="relative mx-auto mt-12 flex min-h-[560px] max-w-5xl items-center justify-center">
          <button
            onClick={showPrevious}
            className="absolute left-0 top-1/2 z-20 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:scale-105 hover:border-[#0051FF]/60 hover:bg-[#0051FF]/20 sm:h-20 sm:w-20"
            type="button"
            aria-label="Show previous testimonial video"
          >
            <ArrowLeft />
          </button>

          <div className="relative w-[270px] rounded-[30px] border border-white/10 bg-white/5 p-2 shadow-[0_30px_120px_rgba(0,81,255,0.18)] backdrop-blur-2xl sm:w-[315px] md:w-[350px]">
            <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-gradient-to-b from-white/10 via-transparent to-[#0051FF]/10" />
            <div className="relative aspect-[9/16] overflow-hidden rounded-[24px] bg-black">
              <iframe
                key={`${activeIndex}-${activeVideo}`}
                className="h-full w-full"
                src={activeVideo}
                title={`MotionHolic client testimonial ${activeIndex + 1}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <button
            onClick={showNext}
            className="absolute right-0 top-1/2 z-20 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:scale-105 hover:border-[#0051FF]/60 hover:bg-[#0051FF]/20 sm:h-20 sm:w-20"
            type="button"
            aria-label="Show next testimonial video"
          >
            <ArrowRight />
          </button>
        </div>

        <div className="mt-2 flex justify-center gap-2">
          {videos.map((video, index) => (
            <button
              key={`${video}-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-[#0051FF]" : "w-2.5 bg-white/20 hover:bg-white/45"}`}
              type="button"
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>,
    mountNode,
  );
}
