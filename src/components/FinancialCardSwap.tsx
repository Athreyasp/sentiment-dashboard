
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { customClass?: string }>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`financial-card ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    />
  )
);
Card.displayName = "Card";

interface CardSwapProps {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: "elastic" | "smooth";
  children: React.ReactNode;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: ReturnType<typeof makeSlot>, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const FinancialCardSwap: React.FC<CardSwapProps> = ({
  width = 350,
  height = 200,
  cardDistance = 40,
  verticalDistance = 50,
  delay = 4000,
  pauseOnHover = true,
  onCardClick,
  skewAmount = 4,
  easing = "elastic",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
        ease: "elastic.out(0.6,0.9)",
        durDrop: 2,
        durMove: 2,
        durReturn: 2,
        promoteOverlap: 0.9,
        returnDelay: 0.05,
      }
      : {
        ease: "power1.inOut",
        durDrop: 0.8,
        durMove: 0.8,
        durReturn: 0.8,
        promoteOverlap: 0.45,
        returnDelay: 0.2,
      };

  const childArr = useMemo(
    () => Children.toArray(children),
    [children]
  );
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr.length]
  );

  const order = useRef(
    Array.from({ length: childArr.length }, (_, i) => i)
  );

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>();
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) =>
      placeNow(
        r.current!,
        makeSlot(i, cardDistance, verticalDistance, total),
        skewAmount
      )
    );

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=400",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
      tl.to(
        elFront,
        {
          y: backSlot.y,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current!;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing,
  ]);

  return (
    <div
      ref={container}
      className="financial-card-swap-container"
      style={{ 
        width, 
        height,
        position: 'absolute',
        bottom: 0,
        right: 0,
        transform: 'translate(5%, 20%)',
        transformOrigin: 'bottom right',
        perspective: '900px',
        overflow: 'visible'
      }}
    >
      {childArr.map((child, i) => {
        if (isValidElement(child)) {
          return cloneElement(child as React.ReactElement<any>, {
            key: i,
            ref: refs[i],
            style: { 
              width, 
              height, 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              ...(child.props.style || {})
            },
            onClick: (e: React.MouseEvent) => {
              if (child.props.onClick) {
                child.props.onClick(e);
              }
              onCardClick?.(i);
            },
          });
        }
        return child;
      })}
    </div>
  );
};

export default FinancialCardSwap;
