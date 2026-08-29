import { type ReactNode } from "react";
import BorderGlow from "../ui/BorderGlow";
import { CARD_GLOW_PROPS } from "../data/config";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
};

export default function GlowCard({ children, className = "" }: GlowCardProps) {
  return (
    <BorderGlow className={`glow-card ${className}`} {...CARD_GLOW_PROPS}>
      {children}
    </BorderGlow>
  );
}
