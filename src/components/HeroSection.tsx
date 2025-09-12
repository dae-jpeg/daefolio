import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import DraggableIdCard from "./DraggableIdCard";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface HeroSectionProps {
  name?: string;
  title?: string;
  bio?: string;
  photoUrl?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  name = "Dylan Thomas M. Rañola",
  title = "Computer Engineering",
  bio = "Building innovative solutions at the intersection of hardware and software",
  photoUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Dylan",
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  useEffect(() => {
    setReducedMotion(prefersReducedMotion);
  }, [prefersReducedMotion]);

  // Spring configuration for the section entrance animation
  const sectionSpring = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    duration: reducedMotion ? 0 : 0.5,
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[400px] py-16 px-4 bg-[#f8f7f2] overflow-hidden">
      <motion.div
        className="max-w-3xl w-full mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionSpring}
      >
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#0a2540] mb-2">
            Curriculum Vitae
          </h1>
          <div className="h-[1px] w-24 bg-[#8b0000] mx-auto"></div>
        </div>

        <div className="relative flex justify-center mb-8">
          <DraggableIdCard
            name={name}
            title={title}
            bio={bio}
            photoUrl={photoUrl}
            reducedMotion={reducedMotion}
          />
        </div>

        <div className="flex items-center justify-center space-x-2 mt-4">
          <Switch
            id="reduced-motion"
            checked={reducedMotion}
            onCheckedChange={setReducedMotion}
          />
          <Label htmlFor="reduced-motion" className="text-sm text-[#0a2540]">
            Reduce motion
          </Label>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

// Custom hook for media queries
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};
