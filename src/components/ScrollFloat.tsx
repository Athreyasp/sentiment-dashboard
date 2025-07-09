
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  intensity?: number;
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnce?: boolean;
}

const ScrollFloat = ({
  children,
  direction = 'up',
  intensity = 30,
  delay = 0,
  duration = 1.2,
  className = "",
  triggerOnce = false
}: ScrollFloatProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial transform based on direction
    const getInitialTransform = () => {
      switch (direction) {
        case 'up':
          return { y: intensity, opacity: 0 };
        case 'down':
          return { y: -intensity, opacity: 0 };
        case 'left':
          return { x: intensity, opacity: 0 };
        case 'right':
          return { x: -intensity, opacity: 0 };
        default:
          return { y: intensity, opacity: 0 };
      }
    };

    // Set final transform
    const getFinalTransform = () => {
      switch (direction) {
        case 'up':
        case 'down':
          return { y: 0, opacity: 1 };
        case 'left':
        case 'right':
          return { x: 0, opacity: 1 };
        default:
          return { y: 0, opacity: 1 };
      }
    };

    gsap.set(element, getInitialTransform());

    gsap.to(element, {
      ...getFinalTransform(),
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse",
      }
    });

    // Add floating animation on hover for interactive elements
    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, intensity, delay, duration, triggerOnce]);

  return (
    <div ref={elementRef} className={`scroll-float ${className}`}>
      {children}
    </div>
  );
};

export default ScrollFloat;
