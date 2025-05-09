import { users, type User, type InsertUser, stories, type Story, type InsertStory } from "./schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Story operations
  createStory(story: InsertStory): Promise<Story>;
  getStory(id: number): Promise<Story | undefined>;
  getAllStories(): Promise<Story[]>;
  getStoriesByAnimal(animal: string): Promise<Story[]>;
  getStoriesByTheme(theme: string): Promise<Story[]>;
  getStoriesByLanguage(language: string): Promise<Story[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Story operations
  async createStory(insertStory: InsertStory): Promise<Story> {
    const [story] = await db.insert(stories).values(insertStory).returning();
    return story;
  }

  async getStory(id: number): Promise<Story | undefined> {
    const [story] = await db.select().from(stories).where(eq(stories.id, id));
    return story;
  }

  async getAllStories(): Promise<Story[]> {
    return await db.select().from(stories).orderBy(desc(stories.createdAt));
  }

  async getStoriesByAnimal(animal: string): Promise<Story[]> {
    return await db.select().from(stories)
      .where(eq(stories.animal, animal))
      .orderBy(desc(stories.createdAt));
  }

  async getStoriesByTheme(theme: string): Promise<Story[]> {
    return await db.select().from(stories)
      .where(eq(stories.theme, theme))
      .orderBy(desc(stories.createdAt));
  }
  
  async getStoriesByLanguage(language: string): Promise<Story[]> {
    return await db.select().from(stories)
      .where(eq(stories.language, language))
      .orderBy(desc(stories.createdAt));
  }
}

export const storage = new DatabaseStorage();
