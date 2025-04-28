import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStorySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/stories', async (req, res) => {
    try {
      const stories = await storage.getAllStories();
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

  const httpServer = createServer(app);
  return httpServer;
}
