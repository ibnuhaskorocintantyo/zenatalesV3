// components/WelcomePage.tsx
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { FaPaw, FaArrowRight, FaBook, FaStar, FaHistory } from "react-icons/fa";
import { Typewriter } from 'react-simple-typewriter';  // Ganti import ini

const WelcomePage = () => {
  const [_, navigate] = useLocation();

  return (
    <motion.div 
      className="relative h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex flex-col items-center justify-between p-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Sparkles Background Overlay */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{
          backgroundImage: "url('/sparkles.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '80px',
        }}
      />

      {/* Animated Logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mt-8 md:mt-12"
      >
        <div className="bg-purple-600 rounded-full w-16 h-16 md:w-24 md:h-24 mx-auto flex items-center justify-center shadow-lg">
          <FaPaw className="text-2xl md:text-4xl text-white" />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl text-center z-10">
        {/* Heading */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-3 md:mb-4 px-4"
        >
          Welcome to Zena Tales
        </motion.h1>

        {/* Typing Subheading */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm md:text-lg text-purple-700 mb-6 md:mb-8 mx-auto min-h-[40px] md:min-h-[32px] px-4"
        >
          <Typewriter
            words={['Create magical bedtime stories...', 'Featuring your child and furry friends!']}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </motion.p>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8 w-full px-4"
        >
          {[{ icon: FaBook, title: "Create Stories", text: "Personalized adventures in minutes" },
            { icon: FaStar, title: "Save Favorites", text: "Keep beloved stories forever" },
            { icon: FaHistory, title: "Read Again", text: "Revisit past creations anytime" }]
            .map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <feature.icon className="text-2xl md:text-3xl text-purple-600 mb-2 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-purple-900 mb-1 md:mb-2">{feature.title}</h3>
                <p className="text-xs md:text-base text-purple-600 leading-tight">{feature.text}</p>
              </motion.div>
            ))}
        </motion.div>

        {/* Animated Glowing Button */}
        <motion.button
          onClick={() => navigate("/home")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-purple-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold flex items-center gap-2 mx-auto hover:bg-purple-700 transition-colors overflow-hidden shadow-md"
        >
          <span className="z-10">Start Creating</span>
          <FaArrowRight className="z-10 text-lg md:text-xl" />
          <span className="absolute inset-0 rounded-full bg-purple-400 blur-xl opacity-40 animate-pulse" />
        </motion.button>
      </div>

      {/* Animated Paw Background */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-12 md:h-24 bg-repeat-x bg-bottom"
        style={{ 
          backgroundImage: "url('/cat-paws-pattern.svg')",
          backgroundSize: "80px md:100px",
          opacity: 0.1,
        }}
        animate={{ backgroundPositionX: ["0%", "100%"] }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

export default WelcomePage;
