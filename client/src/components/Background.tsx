import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  size: number;
  top: number;
  left: number;
  delay: number;
}

const Background = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      top: Math.random() * 40 + 5,
      left: Math.random() * 90 + 5,
      delay: Math.random() * 4,
    }));
    
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Clouds */}
      <motion.div 
        className="cloud absolute top-20 left-10 w-48 h-24 bg-white opacity-70 rounded-full clip-path-cloud"
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 6,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="cloud absolute top-40 right-20 w-64 h-32 bg-white opacity-80 rounded-full clip-path-cloud"
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 8,
          delay: 1,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="cloud absolute bottom-20 left-1/4 w-56 h-28 bg-white opacity-70 rounded-full clip-path-cloud"
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 7,
          delay: 2,
          ease: "easeInOut"
        }}
      />
      
      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default Background;
