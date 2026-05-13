import { useEffect, useState } from "react";

export default function PrivacyNotice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("motionholicPrivacyNotice");
    if (accepted !== "accepted") {
      setShowNotice(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("motionholicPrivacyNotice", "accepted");
    setShowNotice(false);
  };

  if (!showNotice) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-[9999] mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#0B0B10]/95 p-5 shadow-2xl backdrop-blur-xl md:flex md:items-center md:justify-between md:gap-6">
      <p className="text-sm leading-relaxed text-white/70 md:text-base">
        MotionHolic uses cookieless, privacy-first analytics to improve website
        performance and user experience. No cross-site tracking, no ads.
      </p>

      <button
        onClick={handleAccept}
        className="mt-4 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-[#0051FF] hover:bg-[#0051FF] md:mt-0"
        type="button"
      >
        Got it
      </button>
    </div>
  );
}
