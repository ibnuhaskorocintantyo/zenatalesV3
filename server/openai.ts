import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Language mapping for prompts
const languagePrompts = {
  english: {
    intro: "Create a whimsical and educational bedtime story for a child named",
    about: "about",
    theme: "with a theme of",
    customMessage: "Also include this special message in the story:",
    prompt: "The story should be enchanting, appropriate for children, and contain elements of wonder. It should be around 1000 words long. Format the story with paragraphs, dialog, and a clear beginning, middle, and end.",
    imagePrompt: "Create a whimsical, children's book style illustration for a story about"
  },
  indonesian: {
    intro: "Buatlah cerita pengantar tidur yang ajaib dan mendidik untuk seorang anak bernama",
    about: "tentang",
    theme: "dengan tema",
    customMessage: "Juga sertakan pesan khusus ini dalam cerita:",
    prompt: "Cerita harus mempesona, sesuai untuk anak-anak, dan mengandung unsur keajaiban. Cerita harus sekitar 1000 kata. Format cerita dengan paragraf, dialog, dan awal, tengah, dan akhir yang jelas.",
    imagePrompt: "Buatlah ilustrasi bergaya buku anak-anak yang ajaib untuk cerita tentang"
  },
  french: {
    intro: "Créez une histoire fantaisiste et éducative pour un enfant nommé",
    about: "à propos de",
    theme: "avec un thème de",
    customMessage: "Incluez également ce message spécial dans l'histoire :",
    prompt: "L'histoire doit être enchantante, appropriée pour les enfants et contenir des éléments de merveille. Elle devrait contenir environ 1000 mots. Formatez l'histoire avec des paragraphes, des dialogues et un début, un milieu et une fin clairs.",
    imagePrompt: "Créez une illustration fantaisiste de style livre pour enfants pour une histoire sur"
  },
  russian: {
    intro: "Создайте причудливую и познавательную сказку на ночь для ребенка по имени",
    about: "о",
    theme: "с темой",
    customMessage: "Также включите это особое сообщение в историю:",
    prompt: "История должна быть очаровательной, подходящей для детей и содержать элементы чуда. Она должна содержать около 1000 слов. Отформатируйте историю с абзацами, диалогами и четким началом, серединой и концом.",
    imagePrompt: "Создайте причудливую иллюстрацию в стиле детской книги для истории о"
  },
  chinese: {
    intro: "为一个名叫",
    about: "创作一个关于",
    theme: "以",
    customMessage: "也请在故事中包含这个特别的信息：",
    prompt: "的奇幻又有教育意义的睡前故事。故事应该充满魔力，适合儿童，并包含奇妙的元素。它应该大约有1000字。请格式化故事，包括段落、对话以及清晰的开头、中间和结尾。故事的主题是",
    imagePrompt: "为一个关于"
  },
  thai: {
    intro: "สร้างนิทานก่อนนอนที่แปลกประหลาดและให้ความรู้สำหรับเด็กชื่อ",
    about: "เกี่ยวกับ",
    theme: "ด้วยธีม",
    customMessage: "รวมข้อความพิเศษนี้ในเรื่องด้วย:",
    prompt: "เรื่องราวควรมีเสน่ห์ เหมาะสำหรับเด็ก และมีองค์ประกอบของความมหัศจรรย์ ควรมีความยาวประมาณ 1000 คำ จัดรูปแบบเรื่องราวด้วยย่อหน้า บทสนทนา และตอนต้น ตอนกลาง และตอนจบที่ชัดเจน",
    imagePrompt: "สร้างภาพประกอบในสไตล์หนังสือสำหรับเด็กที่แปลกประหลาดสำหรับเรื่องราวเกี่ยวกับ"
  }
};

// Generate a story in the specified language
export async function generateStory(
  childName: string, 
  animal: string, 
  theme: string, 
  customMessage: string = "", 
  language: string = "english"
): Promise<{ title: string, content: string }> {
  const langPrompts = languagePrompts[language] || languagePrompts.english;
  
  let promptText = `${langPrompts.intro} ${childName} ${langPrompts.about} ${animal} ${langPrompts.theme} ${theme}. `;
  
  if (customMessage) {
    promptText += `${langPrompts.customMessage} "${customMessage}" `;
  }
  
  promptText += langPrompts.prompt;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
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
    
    // Generate a title using the story content
    const titleCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
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

// Generate an image for the story
export async function generateStoryImage(animal: string, theme: string, language: string = "english"): Promise<string> {
  const langPrompts = languagePrompts[language] || languagePrompts.english;
  
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${langPrompts.imagePrompt} a cute ${animal} teaching a child about ${theme}. The style should be whimsical, colorful, and appropriate for a children's book. Do not include any text.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data[0].url || "";
  } catch (error) {
    console.error("Error generating image:", error);
    return ""; // Return empty string if image generation fails
  }
}