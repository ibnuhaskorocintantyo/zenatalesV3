import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Story } from "@shared/schema";
import { PrinterIcon, SaveIcon, BookOpenIcon, CheckCircleIcon } from "lucide-react";

interface StoryDisplayProps {
  story: Story | null;
  onPrint: () => void;
  onSave: () => void;
}

const StoryDisplay = ({ story, onPrint, onSave }: StoryDisplayProps) => {
  const storyContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll to the story container when on mobile if a story is generated
  useEffect(() => {
    if (story && window.innerWidth < 1024) {
      storyContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [story]);

  return (
    <div className="w-full lg:w-1/2" ref={storyContainerRef}>
      <motion.div 
        className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="font-heading text-2xl text-primary-dark font-bold mb-4 flex items-center">
          <BookOpenIcon className="mr-2 text-accent" />
          <span>{story ? story.title : "Your Magical Story"}</span>
        </h2>
        
        <AnimatePresence mode="wait">
          {!story ? (
            <motion.div 
              key="empty-state"
              className="flex flex-col items-center justify-center py-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="w-48 h-48 bg-primary-light rounded-full flex items-center justify-center text-8xl mb-6"
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut"
                }}
              >
                📚
              </motion.div>
              <h3 className="font-heading text-xl text-primary-dark mb-3">Create Your Story!</h3>
              <p className="font-body text-gray-600 max-w-sm">Fill out the form to generate a magical bedtime adventure featuring your child's favorite animal.</p>
            </motion.div>
          ) : (
            <motion.div 
              key="generated-story"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="bg-success/30 text-success-dark text-sm font-body font-medium py-1 px-3 rounded-full flex items-center">
                    <CheckCircleIcon className="w-4 h-4 mr-1" /> Story Ready
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-secondary hover:bg-secondary-dark text-white font-body font-medium py-1.5 px-3 rounded-lg transition-all flex items-center" 
                    title="Print Story" 
                    onClick={onPrint}
                  >
                    <PrinterIcon className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-primary hover:bg-primary-dark text-white font-body font-medium py-1.5 px-3 rounded-lg transition-all flex items-center" 
                    title="Save Story" 
                    onClick={onSave}
                  >
                    <SaveIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="story-container bg-cream rounded-2xl p-5 border-2 border-secondary/30">
                <article className="font-body text-gray-800 leading-relaxed">
                  <h3 className="font-heading text-xl text-primary-dark mb-4">{story.title}</h3>
                  {story.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                  <p className="font-heading text-primary-dark text-center mt-8">The End</p>
                </article>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default StoryDisplay;
