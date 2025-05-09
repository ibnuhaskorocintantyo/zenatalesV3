import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStorySchema } from "../../shared/schema";
import { z } from "zod";
import { generateStory} from "./openai"

export async function registerRoutes(app: Express): Promise<Server> {
  console.log("✅ registerRoutes dipanggil");
  // API routes
  app.get('/api/stories', async (req, res) => {
    try {
      console.log("📦 Mengecek storage.getAllStories...");
      const stories = await storage.getAllStories();
      console.log("✅ Storage siap");
      res.json(stories);
    } catch (error) {
      console.error('Error fetching stories:', error);
      res.status(500).json({ message: 'Failed to fetch stories' });
    }
  });

  app.get('/api/stories/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid story ID' });
      }

      const story = await storage.getStory(id);
      if (!story) {
        return res.status(404).json({ message: 'Story not found' });
      }

      res.json(story);
    } catch (error) {
      console.error('Error fetching story:', error);
      res.status(500).json({ message: 'Failed to fetch story' });
    }
  });

  app.get('/api/stories/animal/:animal', async (req, res) => {
    try {
      const animal = req.params.animal;
      const stories = await storage.getStoriesByAnimal(animal);
      res.json(stories);
    } catch (error) {
      console.error('Error fetching stories by animal:', error);
      res.status(500).json({ message: 'Failed to fetch stories' });
    }
  });

  app.get('/api/stories/theme/:theme', async (req, res) => {
    try {
      const theme = req.params.theme;
      const stories = await storage.getStoriesByTheme(theme);
      res.json(stories);
    } catch (error) {
      console.error('Error fetching stories by theme:', error);
      res.status(500).json({ message: 'Failed to fetch stories' });
    }
  });

  app.get('/api/stories/language/:language', async (req, res) => {
    try {
      const language = req.params.language;
      const stories = await storage.getStoriesByLanguage(language);
      res.json(stories);
    } catch (error) {
      console.error('Error fetching stories by language:', error);
      res.status(500).json({ message: 'Failed to fetch stories' });
    }
  });

  app.post('/api/stories', async (req, res) => {
    try {
      const storyData = insertStorySchema.parse(req.body);
      const story = await storage.createStory(storyData);
      res.status(201).json(story);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Invalid story data', 
          errors: error.errors 
        });
      }
      console.error('Error creating story:', error);
      res.status(500).json({ message: 'Failed to create story' });
    }
  });
  
  app.post('/api/generate-story', async (req, res) => {
    try {
      const { childName, animal, theme, customMessage, language = 'english' } = req.body;
      
      if (!childName || !animal || !theme) {
        return res.status(400).json({ message: 'Required fields missing' });
      }
      
      // Generate story content using OpenAI
      const generatedStory = await generateStory(childName, animal, theme, customMessage, language);
      
      // Generate an image for the story
      
      // Prepare story data
      const storyData = {
        title: generatedStory.title,
        content: generatedStory.content,
        childName,
        animal,
        theme,
        customMessage: customMessage || null,
        language,
        
      };
      
      // Save to database
      const savedStory = await storage.createStory(storyData);
      
      res.status(201).json(savedStory);
    } catch (error) {
      console.error('Error generating story:', error);
      res.status(500).json({ message: 'Failed to generate story' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
