import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
  angle: number;
}

export function PaperPlaneAmbient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [trail, setTrail] = useState<Point[]>([]);
  const [planePos, setPlanePos] = useState<Point | null>(null);
  const [pathData, setPathData] = useState("");
  const requestRef = useRef<number>();

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      
      const pX = (pct: number) => (pct / 100) * w;
      const pY = (pct: number) => (pct / 100) * h;
      
      const d = `
        M -40,${pY(38)}
        C ${pX(15)},${pY(35)} ${pX(25)},${pY(20)} ${pX(35)},${pY(30)}
        C ${pX(45)},${pY(40)} ${pX(55)},${pY(50)} ${pX(50)},${pY(38)}
        C ${pX(45)},${pY(26)} ${pX(35)},${pY(22)} ${pX(40)},${pY(30)}
        C ${pX(48)},${pY(40)} ${pX(60)},${pY(35)} ${pX(75)},${pY(28)}
        C ${pX(88)},${pY(22)} ${pX(100)},${pY(18)} ${pX(110)},${pY(15)}
      `;
      setPathData(d);
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, []);

  useEffect(() => {
    if (!pathRef.current || !pathData) return;
    const pathEl = pathRef.current;
    
    // We must wait a tick for the path 'd' attribute to be fully applied in the DOM
    // before getTotalLength() becomes accurate.
    const timeout = setTimeout(() => {
      const totalLength = pathEl.getTotalLength();
      if (totalLength === 0) return;

      let startTime = performance.now();
      let currentTrail: Point[] = [];
      const DURATION = 9000; // 9 seconds crossing
      const REST = 8000;     // 8 seconds wait
      
      let lastDotTime = 0;

      const animate = (time: number) => {
        const elapsed = time - startTime;
        
        if (elapsed < DURATION) {
          const progress = elapsed / DURATION;
          const len = progress * totalLength;
          const point = pathEl.getPointAtLength(len);
          
          // Calculate rotation using a point slightly ahead
          const ahead = pathEl.getPointAtLength(Math.min(len + 2, totalLength));
          const dx = ahead.x - point.x;
          const dy = ahead.y - point.y;
          let angle = Math.atan2(dy, dx) * (180 / Math.PI);
          
          const currentPos = { x: point.x, y: point.y, angle };
          setPlanePos(currentPos);

          if (time - lastDotTime > 80) {
            currentTrail.push(currentPos);
            if (currentTrail.length > 12) currentTrail.shift();
            setTrail([...currentTrail]);
            lastDotTime = time;
          }
        } else if (elapsed > DURATION + REST) {
          // Reset loop
          startTime = time;
          currentTrail = [];
          setTrail([]);
          setPlanePos(null);
        } else {
          // Waiting state
          if (currentTrail.length > 0) {
            // Let the trail fade out naturally by removing points
            if (time - lastDotTime > 80) {
              currentTrail.shift();
              setTrail([...currentTrail]);
              lastDotTime = time;
            }
          }
          if (planePos !== null) {
            setPlanePos(null);
          }
        }
        
        requestRef.current = requestAnimationFrame(animate);
      };

      requestRef.current = requestAnimationFrame(animate);
    }, 50);

    return () => {
      clearTimeout(timeout);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [pathData]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block" aria-hidden>
      <svg className="absolute inset-0 w-full h-full">
        {/* Hidden path for calculations */}
        <path ref={pathRef} d={pathData} fill="none" stroke="none" />
        
        {/* Draw fading trail dots */}
        <g className="mix-blend-multiply">
          {trail.map((pt, i) => {
            const age = trail.length - 1 - i;
            // Newest dot is 45% opacity, drops 4% per dot
            const opacity = Math.max(0, 0.45 - (age * 0.04));
            
            return (
              <circle
                key={`${pt.x}-${pt.y}-${i}`}
                cx={pt.x}
                cy={pt.y}
                r="1.5"
                fill="currentColor"
                className="text-ink"
                style={{ opacity }}
              />
            );
          })}
        </g>
        
        {/* The plane */}
        {planePos && (
          <g transform={`translate(${planePos.x}, ${planePos.y}) rotate(${planePos.angle})`} className="mix-blend-multiply opacity-55">
            <g transform="translate(-20, -14)">
              <svg width="40" height="28" viewBox="0 0 28 20" fill="none" className="text-ink stroke-current" style={{ strokeWidth: 1.5, strokeLinejoin: "round", strokeLinecap: "round" }}>
                {/* Rotate plane so nose points right (0 degrees) */}
                <g transform="rotate(33.7 14 10)">
                  <path d="M2 10L26 2L18 18L12 12L2 10Z" />
                  <path d="M12 12V18L15 14" />
                  <path d="M26 2L12 12" />
                </g>
              </svg>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
