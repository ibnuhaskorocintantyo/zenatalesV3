import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Configure for OpenRouter with DeepSeek
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "",
    "X-Title": process.env.SITE_NAME || "",
  },
});

type SupportedLanguage = 'english' | 'indonesian' | 'french' | 'russian' | 'chinese' | 'thai';

type LanguagePrompt = {
  intro: string;
  about: string;
  theme: string;
  customMessage: string;
  prompt: string;
};

const languagePrompts: Record<SupportedLanguage, LanguagePrompt> = {
  english: {
    intro: "Create a whimsical and educational bedtime story for a child named",
    about: "about",
    theme: "with a theme of",
    customMessage: "Also include this special message in the story:",
    prompt: "The story should be enchanting, appropriate for children, and contain elements of wonder. It should be around 1000 words long. Format the story with paragraphs, dialog, and a clear beginning, middle, and end."
  },
  indonesian: {
    intro: "Buatlah cerita pengantar tidur yang ajaib dan mendidik untuk seorang anak bernama",
    about: "tentang",
    theme: "dengan tema",
    customMessage: "Juga sertakan pesan khusus ini dalam cerita:",
    prompt: "Cerita harus mempesona, sesuai untuk anak-anak, dan mengandung unsur keajaiban. Cerita harus sekitar 1000 kata. Format cerita dengan paragraf, dialog, dan awal, tengah, dan akhir yang jelas."
  },
  french: {
    intro: "Créez une histoire fantaisiste et éducative pour un enfant nommé",
    about: "à propos de",
    theme: "avec un thème de",
    customMessage: "Incluez également ce message spécial dans l'histoire :",
    prompt: "L'histoire doit être enchantante, appropriée pour les enfants et contenir des éléments de merveille. Elle devrait contenir environ 1000 mots. Formatez l'histoire avec des paragraphes, des dialogues et un début, un milieu et une fin clairs."
  },
  russian: {
    intro: "Создайте причудливую и познавательную сказку на ночь для ребенка по имени",
    about: "о",
    theme: "с темой",
    customMessage: "Также включите это особое сообщение в историю:",
    prompt: "История должна быть очаровательной, подходящей для детей и содержать элементы чуда. Она должна содержать около 1000 слов. Отформатируйте историю с абзацами, диалогами и четким началом, серединой и концом."
  },
  chinese: {
    intro: "为一个名叫",
    about: "创作一个关于",
    theme: "以",
    customMessage: "也请在故事中包含这个特别的信息：",
    prompt: "的奇幻又有教育意义的睡前故事。故事应该充满魔力，适合儿童，并包含奇妙的元素。它应该大约有1000字。请格式化故事，包括段落、对话以及清晰的开头、中间和结尾。故事的主题是"
  },
  thai: {
    intro: "สร้างนิทานก่อนนอนที่แปลกประหลาดและให้ความรู้สำหรับเด็กชื่อ",
    about: "เกี่ยวกับ",
    theme: "ด้วยธีม",
    customMessage: "รวมข้อความพิเศษนี้ในเรื่องด้วย:",
    prompt: "เรื่องราวควรมีเสน่ห์ เหมาะสำหรับเด็ก และมีองค์ประกอบของความมหัศจรรย์ ควรมีความยาวประมาณ 1000 คำ จัดรูปแบบเรื่องราวด้วยย่อหน้า บทสนทนา และตอนต้น ตอนกลาง และตอนจบที่ชัดเจน"
  }
};

export async function generateStory(
  childName: string, 
  animal: string, 
  theme: string, 
  customMessage: string = "", 
  language: string = "english"
): Promise<{ title: string, content: string }> {
  const safeLanguage = Object.keys(languagePrompts).includes(language) 
    ? language as SupportedLanguage 
    : 'english';
    
  const langPrompts = languagePrompts[safeLanguage];
  
  let promptText = `${langPrompts.intro} ${childName} ${langPrompts.about} ${animal} ${langPrompts.theme} ${theme}. `;
  
  if (customMessage) {
    promptText += `${langPrompts.customMessage} "${customMessage}" `;
  }
  
  promptText += langPrompts.prompt;

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat:free",
      messages: [
        {
          role: "system",
          content: "You are a creative children's story writer. Create engaging, imaginative, and age-appropriate content."
        },
        {
          role: "user",
          content: promptText
        }
      ],
      max_tokens: 2500,
    });

    const storyContent = completion.choices[0].message.content || "";
    
    const titleCompletion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat:free",
      messages: [
        {
          role: "system",
          content: "Generate a short, engaging title for this children's story."
        },
        {
          role: "user",
          content: `Generate a catchy title for a children's story about ${childName} and a ${animal} with a theme of ${theme}. The title should be appealing to children and capture the essence of the story. The story is in ${language}. Keep it under 10 words.`
        }
      ],
      max_tokens: 50,
    });

    const title = titleCompletion.choices[0].message.content || `${childName}'s Adventure with the ${animal}`;

    return {
      title: title,
      content: storyContent
    };
  } catch (error) {
    console.error("Error generating story:", error);
    throw new Error("Failed to generate story. Please try again later.");
  }
}