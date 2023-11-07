import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Spotlight() {
  const [transform, setTransform] = useState({ translateX: 0, rotateY: 0 });

  useEffect(() => {
    const speed = 0.001;
    const amplitude = 40;

    const animate = (time: number) => {
      const newTransform = {
        translateX: amplitude * Math.sin(speed * time),
        rotateY: amplitude * Math.cos(speed * time),
      };

      setTransform(newTransform);

      requestAnimationFrame(animate);
    };

    const animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute -z-10 flex w-full items-center justify-center">
      <Image
        width={631}
        height={550}
        className="-z-10"
        src="/images/spotlight-left.png"
        alt="Green spotlight"
        style={{
          transform: `translateX(${transform.translateX}px) rotateY(${transform.rotateY}deg)`,
        }}
      />
      <Image
        width={643}
        height={535}
        className="absolute top-0 -z-10"
        src="/images/spotlight-right.png"
        alt="purple-spotlight"
        style={{
          transform: `translateX(${-transform.translateX}px) rotateY(${-transform.rotateY}deg)`,
        }}
      />
    </div>
  );
}
