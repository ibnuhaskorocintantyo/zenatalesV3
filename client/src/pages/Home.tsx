import { useState, useEffect, useCallback, memo, useRef, useMemo, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { 
  FaBook,
  FaStar,
  FaHistory,
  FaCog,
  FaPrint, 
  FaDownload,
  FaSpinner,
  FaTimes,
  FaRedo,
  FaHeart,
  FaRegHeart
} from "react-icons/fa";
import StoryForm from "../components/StoryForm";
import Background from "../components/Background";
import { Story } from "../../../shared/schema";
import { useLocalStorage } from "../hooks/useLocalStorage";
import WelcomePage from "../pages/WelcomePage";
//import WelcomePage from "@/components/WelcomePage";

// Interface untuk TypeScript
interface StoryModalProps {
  //id: number;
  story: Story | null;
  onClose: () => void;
  onPrint: () => void;
  onSave: () => Promise<void>;
  onRetry?: () => void;
  onFavorite: (story: Story) => void; 
  generating?: boolean;
  error?: string | null;
  isFavorite?: boolean;
}
interface StoryCardProps {
  id: number; // Ganti ke number
  story: Story;
  onFavorite: (story: Story) => void;
  onRemove?: (id: number) => void; // Ganti ke number
  isFavorite?: boolean;
  onView?: (story: Story) => void;
  favorites: Story[];
}


// Komponen Loading Spinner terpisah
const LoadingSpinner = memo(() => (
  <div className="flex flex-col items-center justify-center py-12">
    <FaSpinner className="animate-spin text-3xl text-purple-600 mb-4" />
    <p className="text-lg text-purple-800">Creating your story...</p>
  </div>
));

// Komponen Error Message terpisah
const ErrorMessage = ({ message, onRetry }: { 
  message: string; 
  onRetry?: () => void 
}) => (
  <div className="flex flex-col items-center justify-center py-12 text-red-600">
    <FaTimes className="text-3xl mb-4" />
    <p className="text-lg mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-red-500 text-white px-6 py-2 rounded-lg flex items-center gap-2"
      >
        <FaRedo /> Try Again
      </button>
    )}
  </div>
);

// Komponen Story Modal yang diperbaiki
const StoryModal = ({
  story,
  onClose,
  onPrint,
  onSave,
  onRetry,
  generating,
  error,
  isFavorite,
  onFavorite
}: StoryModalProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      <motion.div 
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold text-purple-800">
            {story?.title || "Your Story"}
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => story && onFavorite(story)}
              className="text-red-500 hover:text-red-700"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto p-6 flex-1">
          {error ? (
            <ErrorMessage message={error} onRetry={onRetry} />
          ) : generating ? (
            <LoadingSpinner />
          ) : (
            <div className="prose">
              {story?.content.split('\n').map((paragraph: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex gap-4 p-4 border-t">
          <motion.button
            onClick={onPrint}
            whileHover={{ scale: 1.03 }}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
            disabled={!!error || generating}
          >
            <FaPrint /> Print
          </motion.button>
          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.03 }}
            className="flex-1 bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
            disabled={!!error || generating || isSaving}
          >
            {isSaving ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <>
                <FaDownload /> Save
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Komponen Story Card untuk History/Favorites
const StoryCard = memo(({ 
  story, 
  onFavorite, 
  onRemove, 
  onView, 
  favorites 
}: StoryCardProps) => {
  // Gunakan useMemo untuk menghitung status favorit
  const isFavorite = useMemo(
    () => favorites.some(f => f.id === story.id),
    [favorites, story.id] // Hitung ulang hanya jika favorites atau id berubah
  );


  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.(story.id);
  };

  function handleFavoriteClick(event: React.MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation();
    onFavorite(story);
  }

  // Tambahkan RETURN statement
  return ( // <-- Ini yang hilang
    <div 
      className="border rounded-lg p-4 mb-4 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow" 
      onClick={() => onView?.(story)} 
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-purple-800">{story.title}</h3>
          <p className="text-sm text-gray-600">
            {new Date(story.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleFavoriteClick} // <-- Gunakan handler yang sudah dibuat
            className="text-red-500 hover:text-red-700"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
          {onRemove && (
            <button
              onClick={handleRemoveClick} // <-- Gunakan handler yang sudah dibuat
              className="text-gray-500 hover:text-gray-700"
              aria-label="Remove story"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>
      <div className="mt-2 line-clamp-3 text-gray-800">
        {story.content}
      </div>
    </div>
  );
}); // <-- Tutup dengan benar

// Komponen Navigation terpisah
const Navigation = ({ activeTab, setActiveTab }: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const tabs = [
    { id: "create", icon: FaBook, label: "Create" },
    { id: "favorites", icon: FaStar, label: "Favorites" },
    { id: "history", icon: FaHistory, label: "History" },
    { id: "settings", icon: FaCog, label: "Settings" },
  ];

  return (
    <nav className="bg-white border-t flex justify-around py-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`p-2 flex flex-col items-center ${
            activeTab === tab.id ? "text-purple-600" : "text-gray-500"
          }`}
          aria-label={tab.label}
        >
          <tab.icon />
          <span className="text-xs mt-1">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

const Home = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [stories, setStories] = useLocalStorage<Story[]>("stories", []);
  const [favorites, setFavorites] = useLocalStorage<Story[]>("favorites", []);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [abortController, setAbortController] = useState(new AbortController());
  const idCounter = useRef({ lastTime: 0, count: 0 });

  const handleGenerateStory = useCallback(
    async (
      childName: string,
      animal: string,
      theme: string,
      customMessage: string,
      language: string = "english"
    ) => {
      setGenerating(true);
      setError(null);
      const now = Date.now();
          if (now === idCounter.current.lastTime) {
                idCounter.current.count += 1;
              } else {
                idCounter.current.lastTime = now;
                idCounter.current.count = 0;
              }
  
      // Generate ID unik di awal proses
      // Di dalam handleGenerateStory:
      //const newId = Date.now() + Math.floor(Math.random() * 1000000);
      const newId = Number(`${now}${idCounter.current.count}`);
      console.log("Generated ID:", newId); // Untuk debugging
  
      try {
        const controller = new AbortController();
        setAbortController(controller);
  
        const response = await fetch("http://localhost:5000/api/generate-story", {
          method: "POST",
          body: JSON.stringify({
            childName,
            animal,
            theme,
            customMessage,
            language,
          }),
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });
  
        if (!response.ok) throw new Error("Failed to generate story");
  
        const storyData: Story = await response.json();
  
        // Pastikan semua field penting ada
        const storyWithDate: Story = {
          ...storyData,
          id: newId, // Gunakan ID yang sudah digenerate
          customMessage: storyData.customMessage || "",
          createdAt: new Date(),
          childName: storyData.childName || childName,
          animal: storyData.animal || animal,
          theme: storyData.theme || theme,
          language: storyData.language || language,
          imageUrl: storyData.imageUrl || null,
        };
  
        // Update state dengan ID yang konsisten
        setStories((prev: Story[]) => {
          const newStories = [storyWithDate, ...prev];
          console.log("New stories:", newStories); // Debugging
          return newStories;
        });
        
        setCurrentStory(storyWithDate);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Failed to generate story. Please try again.");
          console.error("Error:", err);
        }
      } finally {
        setGenerating(false);
      }
    },
    [setStories] // Pastikan dependency benar
  );
  const handleSaveStory = useCallback(async () => {
    if (!currentStory) return;
    
    try {
      const blob = new Blob([currentStory.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${currentStory.title.replace(/\s+/g, "_")}.txt`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error saving story:", err);
      throw err;
    }
  }, [currentStory]);

  // Di dalam komponen Home, perbaiki fungsi handleFavorite:
  const handleFavorite = useCallback((story: Story) => {
    setFavorites((prev) => {
      const exists = prev.some((s) => s.id === story.id);
      console.log("Toggling favorite:", story.id, "Current favorites:", prev.map(f => f.id));
      return exists ? prev.filter((s) => s.id !== story.id) : [...prev, story];
    });
  }, [favorites]);
  
  
  const handleRemoveStory = useCallback((id: number) => {
    setStories((prev: any[]) => prev.filter((story: { id: number; }) => story.id !== id));
    
  }, [setStories]);

  useEffect(() => {
    return () => abortController.abort();
  }, [abortController]);

  return (
    <div className="flex flex-col h-screen">
      <Background />
  
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "create" && (
            <StoryForm
              onGenerate={handleGenerateStory}
              isGenerating={generating}
            />
          )}
  
          {activeTab === "favorites" && (
            <div className="space-y-4">
              {favorites.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No favorite stories yet
                </div>
              ) : (
                favorites.map((story) => (
                  <StoryCard
                    key={story.id}
                    id={story.id}
                    story={story}
                    onFavorite={handleFavorite}
                    isFavorite={true}
                    onView={setCurrentStory}
                    onRemove={(id) => {
                      console.log("Removing favorite:", id);
                      setFavorites(prev => prev.filter(s => s.id !== id));
                    } } favorites={favorites}                  />
                ))
              )}
            </div>
          )}
  
          {activeTab === "history" && (
            <div className="space-y-4">
              {stories.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No generated stories yet
                </div>
              ) : (
                stories.map((story) => (
                  <StoryCard
                    key={story.id}
                    id={story.id}
                    story={story}
                    onFavorite={handleFavorite}
                    onRemove={handleRemoveStory}
                    onView={setCurrentStory}
                    isFavorite={favorites.some(s => s.id === story.id)} 
                    favorites={favorites}                />
                ))
              )}
            </div>
          )}
  
          {activeTab === "settings" && (
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-bold text-purple-800 mb-4">Settings</h2>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-600">Coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </main>
  
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
  
      <AnimatePresence>
        {currentStory && (
          <StoryModal
            story={currentStory}
            onClose={() => setCurrentStory(null)}
            onPrint={() => window.print()}
            onSave={handleSaveStory}
            onRetry={() => currentStory && handleGenerateStory(
              currentStory.childName,
              currentStory.animal,
              currentStory.theme,
              currentStory.customMessage ?? '',
              currentStory.language
            )}
            onFavorite={handleFavorite}
            generating={generating}
            error={error}
            isFavorite={favorites.some(s => s.id === currentStory.id)}          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
