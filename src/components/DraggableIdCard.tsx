import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

interface DraggableIdCardProps {
  name?: string;
  title?: string;
  bio?: string;
  photoUrl?: string;
  reduceMotion?: boolean;
  onReduceMotionChange?: (value: boolean) => void;
}

const DraggableIdCard = ({
  name = "Dylan Thomas M. Rañola",
  title = "Computer Engineering",
  bio = "Building innovative solutions with modern technologies",
  photoUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Dylan",
  reduceMotion = false,
  onReduceMotionChange = () => {},
}: DraggableIdCardProps) => {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const [isReducedMotion, setIsReducedMotion] = useState(
    reduceMotion || prefersReducedMotion,
  );
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configuration
  const springConfig = { damping: 20, stiffness: 200 };

  // Springs for smooth animation
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Ribbon/lace segments
  const segments = 8;
  const ribbonSegments = Array.from({ length: segments });

  // Calculate ribbon segment positions based on card position
  const ribbonPositions = ribbonSegments.map((_, i) => {
    const delay = i * 0.05;
    const segmentX = useTransform(
      springX,
      (latest) => latest * (1 - i / segments),
    );
    const segmentY = useTransform(
      springY,
      (latest) => latest * (1 - i / segments),
    );
    const springSegmentX = useSpring(segmentX, {
      ...springConfig,
      damping: 10 + i * 2,
      delay,
    });
    const springSegmentY = useSpring(segmentY, {
      ...springConfig,
      damping: 10 + i * 2,
      delay,
    });

    return { x: springSegmentX, y: springSegmentY };
  });

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!cardRef.current) return;

      const moveAmount = 20;

      switch (e.key) {
        case "ArrowUp":
          y.set(y.get() - moveAmount);
          break;
        case "ArrowDown":
          y.set(y.get() + moveAmount);
          break;
        case "ArrowLeft":
          x.set(x.get() - moveAmount);
          break;
        case "ArrowRight":
          x.set(x.get() + moveAmount);
          break;
        case "Home":
          x.set(0);
          y.set(0);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [x, y]);

  // Handle reduced motion preference change
  useEffect(() => {
    setIsReducedMotion(reduceMotion || prefersReducedMotion);
  }, [reduceMotion, prefersReducedMotion]);

  const handleReduceMotionChange = (checked: boolean) => {
    setIsReducedMotion(checked);
    onReduceMotionChange(checked);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto bg-background">
      {/* Accessibility controls */}
      <div className="absolute top-0 right-0 flex items-center space-x-2 mb-4">
        <Switch
          id="reduce-motion"
          checked={isReducedMotion}
          onCheckedChange={handleReduceMotionChange}
        />
        <Label
          htmlFor="reduce-motion"
          className="text-sm text-muted-foreground"
        >
          Reduce motion
        </Label>
      </div>

      {/* Ribbon/lace segments */}
      {!isReducedMotion && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          {ribbonSegments.map((_, i) => (
            <motion.div
              key={`ribbon-${i}`}
              className="absolute top-0 left-0 w-1 bg-primary/80 rounded-full shadow-sm"
              style={{
                x: ribbonPositions[i].x,
                y: ribbonPositions[i].y,
                height: 80 - i * 6,
                opacity: 1 - (i / segments) * 0.6,
                zIndex: segments - i,
                transformOrigin: "top center",
              }}
            />
          ))}
        </div>
      )}

      {/* ID Card */}
      <motion.div
        ref={cardRef}
        className="relative z-10 flex flex-col items-center p-6 bg-card border rounded-xl shadow-md w-full max-w-[350px]"
        drag={!isReducedMotion}
        dragConstraints={{ top: -100, right: 100, bottom: 100, left: -100 }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        whileTap={{ scale: 1.02 }}
        whileHover={{ scale: 1.01 }}
        style={{ x: springX, y: springY }}
        tabIndex={0}
        aria-label="Draggable ID Card"
        role="button"
      >
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24 border-2 border-primary">
            <AvatarImage src={photoUrl} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="text-center space-y-2">
            <h2 className="text-xl font-serif font-semibold tracking-tight">
              {name}
            </h2>
            <p className="text-sm font-serif text-muted-foreground">{title}</p>
            <p className="text-sm max-w-[280px]">{bio}</p>
          </div>

          <div className="flex space-x-3 mt-4">
            {/* Placeholder for social icons */}
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs">GH</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs">LI</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs">TW</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs">EM</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Keyboard instructions */}
      <p className="text-xs text-muted-foreground mt-4 text-center">
        Use arrow keys to move card, Home to reset position
      </p>
    </div>
  );
};

export default DraggableIdCard;
