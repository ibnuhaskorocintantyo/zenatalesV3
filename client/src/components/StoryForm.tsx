import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Sparkles, Wand2, Loader2 } from "lucide-react";
import { animals } from "../lib/animalData";

// Warna baru untuk tema ceria
const colors = {
  primary: "#FF6BD6", // Pink cerah
  secondary: "#7B61FF", // Ungu
  accent: "#FFD166", // Kuning cerah
  cream: "#FFF8F0", // Krim
};

const formSchema = z.object({
  childName: z.string().min(1, "Please enter your child's name"),
  animal: z.string().min(1, "Please select an animal"),
  theme: z.string().min(1, "Please select a theme"),
  customMessage: z.string().optional(),
  language: z.string().default("english"),
});

type FormValues = z.infer<typeof formSchema>;

interface StoryFormProps {
  onGenerate: (childName: string, animal: string, theme: string, customMessage: string, language: string) => void;
  isGenerating: boolean;
}

const StoryForm = ({ onGenerate, isGenerating }: StoryFormProps) => {
  const [selectedAnimal, setSelectedAnimal] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      childName: "",
      animal: "",
      theme: "",
      customMessage: "",
      language: "english",
    },
  });

  const onSubmit = (data: FormValues) => {
    onGenerate(
      data.childName,
      data.animal,
      data.theme,
      data.customMessage || "",
      data.language
    );
  };

  return (
    <div className="w-full">
      <motion.div 
        className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        style={{
          background: `linear-gradient(135deg, ${colors.cream} 0%, #FFFFFF 100%)`,
          boxShadow: `0 10px 30px -10px ${colors.primary}40`,
        }}
      >
        {/* Header dengan animasi */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="font-heading text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            <span className="inline-block mr-2">✨</span>
            Create a Magical Story!
            <span className="inline-block ml-2">✨</span>
          </h2>
        </motion.div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Child's Name Field */}
            <FormField
              control={form.control}
              name="childName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-lg text-gray-700 flex items-center">
                    <span className="mr-2">👶</span>
                    Your Child's Name
                  </FormLabel>
                  <FormControl>
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <Input 
                        placeholder="Type the name here..." 
                        className="pl-12 pr-4 py-6 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 font-body text-lg"
                        style={{
                          background: "rgba(255, 255, 255, 0.8)",
                          boxShadow: "0 4px 15px -5px rgba(123, 97, 255, 0.2)",
                        }}
                        {...field} 
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage className="text-pink-500 font-medium" />
                </FormItem>
              )}
            />
            
            {/* Animal Selection */}
            <FormField
              control={form.control}
              name="animal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-lg text-gray-700 flex items-center">
                    <span className="mr-2">🦄</span>
                    Choose a Magical Creature
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {animals.map((animal) => (
                        <motion.div
                          key={animal.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <label 
                            className={`cursor-pointer block transition-all duration-200 ${
                              field.value === animal.value 
                                ? 'transform scale-105' 
                                : 'opacity-90 hover:opacity-100'
                            }`}
                          >
                            <input 
                              type="radio" 
                              className="sr-only peer" 
                              value={animal.value}
                              checked={field.value === animal.value}
                              onChange={() => {
                                field.onChange(animal.value);
                                setSelectedAnimal(animal.value);
                              }}
                            />
                            <motion.div 
                              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-3 transition-all ${
                                field.value === animal.value
                                  ? 'border-purple-400 bg-purple-50 shadow-lg'
                                  : 'border-transparent bg-white hover:bg-purple-50 shadow-md'
                              }`}
                              animate={{
                                y: field.value === animal.value ? [-2, 2, -2] : 0,
                              }}
                              transition={{
                                duration: 2,
                                repeat: field.value === animal.value ? Infinity : 0,
                                ease: "easeInOut"
                              }}
                            >
                              <div className="text-4xl mb-2">{animal.emoji}</div>
                              <span className="font-medium text-sm text-center">{animal.label}</span>
                            </motion.div>
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className="text-pink-500 font-medium" />
                </FormItem>
              )}
            />
            
            {/* Theme Selection */}
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-lg text-gray-700 flex items-center">
                    <span className="mr-2">📖</span>
                    Story Theme
                  </FormLabel>
                  <FormControl>
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger 
                          className="w-full pl-12 pr-10 py-6 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 font-body text-lg"
                          style={{
                            background: "rgba(255, 255, 255, 0.8)",
                            boxShadow: "0 4px 15px -5px rgba(123, 97, 255, 0.2)",
                          }}
                        >
                          <SelectValue placeholder="Select a magical theme..." />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-0 shadow-xl">
                          {[
                            { value: "courage", label: "Brave Adventures 🛡️" },
                            { value: "friendship", label: "Friendship Tales 👫" },
                            { value: "adventure", label: "Magical Journeys 🗺️" },
                            { value: "kindness", label: "Kindness Stories 💖" },
                            { value: "dreams", label: "Dreamy Fantasies 🌈" },
                          ].map((theme) => (
                            <SelectItem 
                              key={theme.value} 
                              value={theme.value}
                              className="text-lg py-3 hover:bg-purple-50"
                            >
                              {theme.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </FormControl>
                  <FormMessage className="text-pink-500 font-medium" />
                </FormItem>
              )}
            />
            
            {/* Language Selection */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-lg text-gray-700 flex items-center">
                    <span className="mr-2">🌎</span>
                    Story Language
                  </FormLabel>
                  <FormControl>
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger 
                          className="w-full pl-12 pr-10 py-6 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 font-body text-lg"
                          style={{
                            background: "rgba(255, 255, 255, 0.8)",
                            boxShadow: "0 4px 15px -5px rgba(123, 97, 255, 0.2)",
                          }}
                        >
                          <SelectValue placeholder="Choose a language..." />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-0 shadow-xl">
                          {[
                            { value: "english", label: "English 🇬🇧" },
                            { value: "indonesian", label: "Bahasa Indonesia 🇮🇩" },
                            { value: "french", label: "Français 🇫🇷" },
                            { value: "russian", label: "Русский 🇷🇺" },
                            { value: "chinese", label: "中文 🇨🇳" },
                          ].map((lang) => (
                            <SelectItem 
                              key={lang.value} 
                              value={lang.value}
                              className="text-lg py-3 hover:bg-purple-50"
                            >
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </FormControl>
                  <FormMessage className="text-pink-500 font-medium" />
                </FormItem>
              )}
            />
            
            {/* Custom Message */}
            <FormField
              control={form.control}
              name="customMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-lg text-gray-700 flex items-center">
                    <span className="mr-2">💌</span>
                    Special Magic Wish
                    <span className="ml-2 text-sm font-normal text-gray-500">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <Textarea 
                        placeholder="Write a special message for your child..."
                        className="p-4 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 font-body text-lg min-h-[120px]"
                        style={{
                          background: "rgba(255, 255, 255, 0.8)",
                          boxShadow: "0 4px 15px -5px rgba(123, 97, 255, 0.2)",
                        }}
                        {...field} 
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage className="text-pink-500 font-medium" />
                </FormItem>
              )}
            />
            
            {/* Generate Button */}
            <motion.div 
              className="pt-4"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                type="submit"
                className={`w-full font-bold py-7 px-6 rounded-xl text-lg shadow-lg transition-all ${
                  isGenerating 
                    ? 'bg-purple-300' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                }`}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="flex items-center"
                  >
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    <span>Brewing Magic...</span>
                  </motion.div>
                ) : (
                  <div className="flex items-center">
                    <Wand2 className="h-5 w-5 mr-2" />
                    <span>Create Magical Story!</span>
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-2"
                    >
                      ✨
                    </motion.span>
                  </div>
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default StoryForm;
