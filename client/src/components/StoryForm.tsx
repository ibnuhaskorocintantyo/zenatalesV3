import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { animals } from "@/lib/animalData";

// Define the form schema
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
  const form = useForm<FormValues>({
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
    <div className="w-full lg:w-1/2">
      <motion.div 
        className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-heading text-2xl text-primary-dark font-bold mb-6 flex items-center">
          <span className="mr-2 text-accent">✨</span>
          Create Your Magic Story
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Child's Name Field */}
            <FormField
              control={form.control}
              name="childName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body font-medium text-primary-dark">
                    Child's Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-accent">
                        👶
                      </span>
                      <Input 
                        placeholder="Enter your child's name" 
                        className="pl-10 pr-4 py-6 bg-cream rounded-xl border-2 border-secondary/40 focus:border-primary focus:ring focus:ring-primary/30 focus:outline-none font-body transition-all"
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Animal Selection */}
            <FormField
              control={form.control}
              name="animal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body font-medium text-primary-dark">
                    Favorite Animal
                  </FormLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {animals.map((animal) => (
                      <label 
                        key={animal.value} 
                        className={`cursor-pointer magical-border ${
                          field.value === animal.value ? 'border-accent' : ''
                        }`}
                      >
                        <input 
                          type="radio" 
                          className="sr-only peer" 
                          value={animal.value}
                          checked={field.value === animal.value}
                          onChange={() => field.onChange(animal.value)}
                        />
                        <div className={`flex flex-col items-center justify-center bg-white rounded-xl p-3 transition-all border-2 border-transparent ${
                          field.value === animal.value ? 'border-accent bg-accent/10' : 'hover:bg-primary/10'
                        }`}>
                          <div className="w-14 h-14 flex items-center justify-center text-3xl rounded-full mb-2">
                            {animal.emoji}
                          </div>
                          <span className="font-accent text-sm">{animal.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Theme Selection */}
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body font-medium text-primary-dark">
                    Story Theme
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-accent">
                        ❤️
                      </span>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full pl-10 pr-10 py-6 bg-cream rounded-xl border-2 border-secondary/40 focus:border-primary focus:ring focus:ring-primary/30 focus:outline-none font-body">
                          <SelectValue placeholder="Select a theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="courage">Courage & Bravery</SelectItem>
                          <SelectItem value="friendship">Friendship & Sharing</SelectItem>
                          <SelectItem value="adventure">Adventure & Discovery</SelectItem>
                          <SelectItem value="kindness">Kindness & Helping Others</SelectItem>
                          <SelectItem value="dreams">Dreams & Imagination</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Language Selection */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body font-medium text-primary-dark">
                    Story Language
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-accent">
                        🌍
                      </span>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full pl-10 pr-10 py-6 bg-cream rounded-xl border-2 border-secondary/40 focus:border-primary focus:ring focus:ring-primary/30 focus:outline-none font-body">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="indonesian">Indonesian (Bahasa Indonesia)</SelectItem>
                          <SelectItem value="french">French (Français)</SelectItem>
                          <SelectItem value="russian">Russian (Русский)</SelectItem>
                          <SelectItem value="chinese">Chinese (中文)</SelectItem>
                          <SelectItem value="thai">Thai (ไทย)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Custom Message */}
            <FormField
              control={form.control}
              name="customMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body font-medium text-primary-dark">
                    Special Message <span className="text-sm font-normal text-primary">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add a special message or lesson for your child..." 
                      className="p-4 bg-cream rounded-xl border-2 border-secondary/40 focus:border-primary focus:ring focus:ring-primary/30 focus:outline-none font-body transition-all"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Generate Button */}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent-dark text-white font-heading font-bold py-6 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 transform hover:scale-[1.02]"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    <span>Creating your story...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" />
                    <span>Create Magical Story</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default StoryForm;
