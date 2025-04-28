export interface Animal {
  value: string;
  label: string;
  emoji: string;
  description: string;
}

export const animals: Animal[] = [
  {
    value: "fox",
    label: "Fox",
    emoji: "🦊",
    description: "Clever and quick, full of wisdom and mischief."
  },
  {
    value: "rabbit",
    label: "Rabbit",
    emoji: "🐰",
    description: "Quick and gentle, with a talent for hopping out of trouble."
  },
  {
    value: "owl",
    label: "Owl",
    emoji: "🦉",
    description: "Wise and watchful, with knowledge of the night."
  },
  {
    value: "bear",
    label: "Bear",
    emoji: "🐻",
    description: "Strong and brave, with a heart as big as the forest."
  },
  {
    value: "dolphin",
    label: "Dolphin",
    emoji: "🐬",
    description: "Playful and smart, with tales from the deep blue sea."
  },
  {
    value: "elephant",
    label: "Elephant",
    emoji: "🐘",
    description: "Gentle giant with a memory that never forgets."
  }
];

export const themeDescriptions = {
  courage: "Stories about being brave and facing fears",
  friendship: "Stories about making friends and sharing",
  adventure: "Stories about exploring new places and discovering wonders",
  kindness: "Stories about helping others and showing compassion",
  dreams: "Stories about imagination and making wishes come true"
};
