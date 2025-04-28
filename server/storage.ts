import { users, type User, type InsertUser, stories, type Story, type InsertStory } from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stories: Map<number, Story>;
  userCurrentId: number;
  storyCurrentId: number;

  constructor() {
    this.users = new Map();
    this.stories = new Map();
    this.userCurrentId = 1;
    this.storyCurrentId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Story operations
  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = this.storyCurrentId++;
    const createdAt = new Date();
    
    // Create a properly typed story object without using spread
    const story: Story = {
      id,
      createdAt,
      title: insertStory.title,
      content: insertStory.content,
      childName: insertStory.childName,
      animal: insertStory.animal,
      theme: insertStory.theme,
      customMessage: insertStory.customMessage ?? null
    };
    
    this.stories.set(id, story);
    return story;
  }

  async getStory(id: number): Promise<Story | undefined> {
    return this.stories.get(id);
  }

  async getAllStories(): Promise<Story[]> {
    return Array.from(this.stories.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getStoriesByAnimal(animal: string): Promise<Story[]> {
    return Array.from(this.stories.values())
      .filter(story => story.animal === animal)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getStoriesByTheme(theme: string): Promise<Story[]> {
    return Array.from(this.stories.values())
      .filter(story => story.theme === theme)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new MemStorage();
