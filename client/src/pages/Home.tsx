import { useState } from "react";
import { motion } from "framer-motion";
import StoryForm from "@/components/StoryForm";
import StoryDisplay from "@/components/StoryDisplay";
import Background from "@/components/Background";
import { Story } from "@shared/schema";
// Define a custom API request function for this page
const apiRequest = async (options: { url: string; method: string; body: any }) => {
  try {
    const response = await fetch(options.url, {
      method: options.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.body),
      credentials: "include",
    });
    
    return response;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

const Home = () => {
  const [story, setStory] = useState<Story | null>(null);
  const [generating, setGenerating] = useState(false);

  const handleGenerateStory = async (
    childName: string,
    animal: string,
    theme: string,
    customMessage: string,
    language: string = "english"
  ) => {
    setGenerating(true);
    
    try {
      // Use the API to generate the story with OpenAI
      const response = await apiRequest({
        url: '/api/generate-story',
        method: 'POST',
        body: {
          childName,
          animal,
          theme,
          customMessage,
          language
        }
      });
      
      if (response && response.ok) {
        const storyData = await response.json() as Story;
        setStory(storyData);
        setGenerating(false);
      }
    } catch (error) {
      console.error("Error generating story:", error);
      setGenerating(false);
    }
  };

  // Story is already saved to the server when it's generated

  const handlePrintStory = () => {
    window.print();
  };

  const handleSaveStory = async () => {
    if (!story) return;
    
    try {
      const blob = new Blob([story.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${story.title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error saving story:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <Background />
      
      {/* Header */}
      <header className="pt-8 pb-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div 
              className="flex items-center mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mr-2 text-xl"
                whileHover={{ scale: 1.1 }}
              >
                🦊
              </motion.div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-dark">DreamyTales</h1>
              <motion.div 
                className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center ml-2 text-xl"
                whileHover={{ scale: 1.1 }}
              >
                🐰
              </motion.div>
            </motion.div>
            <p className="font-accent text-lg text-accent-dark">Magical Bedtime Stories with Your Favorite Animals</p>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <StoryForm 
            onGenerate={handleGenerateStory} 
            isGenerating={generating}
          />
          
          <StoryDisplay 
            story={story} 
            onPrint={handlePrintStory}
            onSave={handleSaveStory}
          />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 bg-primary-dark/80 backdrop-blur text-white py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-heading text-xl">DreamyTales</h3>
              <p className="font-body text-sm text-white/80">Magical bedtime stories for magical children</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent transition-colors">
                <i className="fas fa-question-circle"></i> Help
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <i className="fas fa-shield"></i> Privacy
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <i className="fas fa-envelope"></i> Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
