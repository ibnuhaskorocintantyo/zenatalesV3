// Aman digunakan di frontend tanpa mengimpor Drizzle

export type User = {
  id: number;
  username: string;
  password: string;
};

export type Story = {
  id: number;
  title: string;
  content: string;
  childName: string;
  animal: string;
  theme: string;
  customMessage?: string;
  language: string;
  imageUrl?: string | null;
  createdAt: string | Date; // bisa diganti Date kalau backend kirim objek Date
};
