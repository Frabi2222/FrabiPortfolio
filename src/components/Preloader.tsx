import { useEffect, useState } from "react";
import "./Preloader.css";
import Ferrofluid from "../ui/Ferrofluid";
import { BG_COLORS } from "../data/config";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const minDelay = 2400; // Минимальное время показа (2.4 секунды)
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDelay - elapsed);

      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 600); // Matches the CSS transition duration
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      const fallbackTimer = setTimeout(handleLoad, 5000);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`preloader ${isFadingOut ? "fade-out" : ""}`}>
      <div className="preloader-bg" aria-hidden="true">
        <Ferrofluid
          colors={BG_COLORS}
          speed={0.3}
          scale={2}
          opacity={0.2}
          mixBlendMode="multiply"
        />
      </div>
      
      <div className="loader-text">
        <span>F</span>
        <span>r</span>
        <span>a</span>
        <span>b</span>
        <span>i</span>
      </div>
    </div>
  );
}
