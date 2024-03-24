'use client';

import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
}

export default function FloatingHearts({ messageCount }: { messageCount: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const createHeart = (id: number) => ({
      id,
      left: Math.random() * 100,
      animationDuration: 4 + Math.random() * 2,
      size: 12 + Math.random() * 8,
    });

    const initialHearts = Array.from(
      { length: messageCount }, 
      (_, i) => createHeart(i)
    );
    setHearts(initialHearts);

    const interval = setInterval(() => {
      setHearts(prev => {
        const newHearts = [...prev];
        const randomIndex = Math.floor(Math.random() * messageCount);
        newHearts[randomIndex] = createHeart(Date.now() + randomIndex);
        return newHearts;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [messageCount]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute bottom-0 text-orange-500"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animation: `floatHeart ${heart.animationDuration}s ease-in-out infinite`,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
} 