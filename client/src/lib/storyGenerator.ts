import { animals } from "./animalData";
import { Story } from "../../../shared/schema";

// Template segments for different parts of the story
const storyBeginnings = {
  fox: [
    "Once upon a time, in a magical forest where the trees whispered secrets to one another, there lived a clever little fox named {animalName}. {animalName} had bright orange fur that seemed to glow like embers in the morning sun, and eyes that sparkled with curiosity and mischief.",
    "In a forest where autumn never ended, with leaves of gold and amber dancing in the breeze, lived a small fox with an extraordinary talent. {animalName}, as the woodland creatures called the fox, could find anything that was lost. {childName} had heard stories about this magical fox but never believed they were true—until now."
  ],
  rabbit: [
    "In a meadow filled with wildflowers that swayed gently in the spring breeze, there lived a fluffy white rabbit named {animalName}. {animalName}'s ears were always perked up, listening for new adventures, and the twitching of {animalName}'s little nose could sense excitement from miles away.",
    "Beneath an ancient oak tree, in a burrow lined with the softest moss and sweet-smelling herbs, lived a remarkable rabbit named {animalName}. Unlike other rabbits who hopped away at the first sign of anything unfamiliar, {animalName} was known throughout the meadow for being exceptionally brave."
  ],
  owl: [
    "High in the branches of the oldest tree in the Whispering Woods lived a wise owl named {animalName}. {animalName}'s feathers were the color of moonlight, and {animalName}'s big round eyes could see things that others could not—including dreams that floated on the night air.",
    "When the moon rose high above the ancient forest, casting silver light through the leaves, that's when {animalName} the owl would wake. With feathers as soft as shadows and eyes that glowed like gentle stars, {animalName} was no ordinary owl. {animalName} was the keeper of nighttime stories."
  ],
  bear: [
    "Deep in the heart of the Honey Valley, where wildflowers nodded in the summer breeze and crystal streams bubbled over smooth stones, lived a gentle bear named {animalName}. {animalName}'s fur was the color of cinnamon, and though {animalName} was the largest creature in the forest, {animalName} had the softest heart.",
    "In a cave nestled between two mountains, where the sunrise painted the rocks gold each morning, lived a bear with a special gift. {animalName}, as the woodland creatures called the bear, could sing songs that made flowers bloom even in winter. {childName} had often dreamed of hearing these magical songs."
  ],
  dolphin: [
    "Beneath the waves of the Sparkling Sea, where coral castles rose from the sandy floor and schools of rainbow fish darted among the currents, swam a playful dolphin named {animalName}. {animalName}'s skin shimmered like polished silver in the sunlight that filtered down through the water.",
    "In the deepest part of the Azure Ocean, where the water changed from turquoise to sapphire blue, lived a dolphin unlike any other. {animalName} had a special sparkle that glistened along {animalName}'s sleek body whenever {animalName} was excited—which was almost always. The ocean creatures said it was stardust from when {animalName} once leaped so high, {animalName} touched the night sky."
  ],
  elephant: [
    "In the vast golden savanna, where tall grasses swayed like oceans under the African sun, lived a wise old elephant named {animalName}. {animalName}'s skin was wrinkled with years of adventure, and {animalName}'s great tusks curved majestically toward the sky. But most special of all was {animalName}'s memory, which held the stories of generations.",
    "Where the baobab trees stand like ancient guardians of the plains, walked an elephant whose footsteps left flowers growing in their wake. {animalName}, as the animals called the elephant, had ears shaped like perfect hearts and a trunk that could stretch to impossible lengths when {animalName} wanted to help someone in need."
  ]
};

const themeMidPoints = {
  courage: [
    `As {childName} watched, {animalName} stood at the edge of the {setting}, trembling slightly. The {obstacle} loomed ahead, dark and intimidating. All the other animals had warned {animalName} not to go near it, but {animalName} knew that {treasure} lay on the other side—something that was worth being brave for.\n\n"I'm scared," {animalName} whispered, "but I'm going to be brave anyway. That's what courage means." Taking a deep breath, {animalName} took the first step forward.`,
    
    `"Sometimes," {animalName} said softly to {childName}, "the bravest thing you can do is admit that you're afraid." {childName} looked up in surprise. "But you're never afraid! You're the bravest {animalType} in the whole {setting}!"\n\n{animalName} smiled gently. "Everyone feels fear, little one. Courage isn't about never being scared. It's about feeling the fear and doing what's right anyway. Like now—I'm afraid of the {obstacle}, but my friend needs help on the other side. So I will go."`
  ],
  friendship: [
    `{animalName} had spent many days gathering {treasureItems} from around the {setting}. There were {itemDescription} that glittered in the sunlight, and {itemDescription} that smelled sweeter than any flower. {animalName} had planned to keep them all in a special collection.\n\nBut then {animalName} noticed {childName} sitting alone, looking sad. Without hesitation, {animalName} picked up the most beautiful {treasureItem} and brought it over. "Would you like to share this with me?" {animalName} asked. {childName}'s face lit up with surprise and joy. "But this is your special {treasureItem}!" {childName} exclaimed. {animalName} smiled. "Things are only special when they're shared with friends."`,
    
    `The rainstorm had flooded the {setting}, and many animals had lost their homes. {animalName} was lucky—{animalName}'s home was safe and dry. As {animalName} looked out at the {setting}, {animalName} saw many creatures huddled together, trying to stay warm.\n\n"My home isn't very big," {animalName} thought, "but it has room for more than just me." Without another thought, {animalName} called out to the other animals. "Friends! You can stay with me until your homes are rebuilt!" Soon, {animalName}'s small home was filled with new friends, and though it was crowded, it had never felt so warm and happy.`
  ],
  adventure: [
    `"What do you think is beyond the {boundary}?" {childName} asked, pointing to the horizon where the {setting} seemed to end and the sky began. {animalName}'s eyes sparkled with excitement. "I don't know, but I've always wanted to find out!"\n\nAnd so it was decided. With a small pack of supplies and hearts full of curiosity, {animalName} and {childName} set off toward the {boundary}. The path ahead was unknown, but that was what made it an adventure. With each step, they discovered something new—a flower that changed colors with the temperature, rocks that hummed gentle melodies when touched, and clouds that took the shape of whatever you were thinking about.`,
    
    `{animalName} had found an old map tucked inside a hollow tree. The parchment was yellowed with age, and peculiar symbols marked a path to something called 'The {mysteriousPlace}.' No one {animalName} asked knew what it was or if it even existed.\n\n"It could be dangerous," warned the elder {animalType}. "It could also be wonderful," {animalName} replied with a smile. When {childName} heard about the map, {childName}'s eyes grew wide with excitement. "Can I come too?" {childName} asked. {animalName} considered this for a moment, then nodded. "The best adventures are shared with friends."`
  ],
  kindness: [
    `{animalName} was on the way home with a basket of fresh {food} when {animalName} heard a soft whimpering coming from behind a {landscapeFeature}. Investigating, {animalName} found a small {creatureInNeed} with an injured paw. The little creature looked up fearfully, but {animalName} spoke in gentle tones. "Don't be afraid. I want to help."\n\nCarefully, {animalName} bandaged the {creatureInNeed}'s paw with a soft leaf and offered some {food} from the basket. "I was saving this for a special occasion," {animalName} said, "but I think this is special enough." The {creatureInNeed}'s eyes filled with gratitude. "Thank you," it whispered. "No one has ever been so kind to me before."`,
    
    `A harsh winter had fallen upon the {setting}, and food was scarce. {animalName} had worked hard all autumn to store enough {food} to last through the cold months. Many other animals had not been so fortunate or foresighted.\n\n{animalName} could hear their hungry cries in the night. It would be easiest to keep all the food for {animalName}'s own family. There wasn't really enough to share. But {animalName} remembered what {animalName}'s mother had always said: "Kindness isn't about doing what's easy. It's about doing what's right." The next morning, {animalName} invited all the animals to a great feast, where everyone received a small portion of the winter stores. "It's not much," {animalName} said, "but together, we'll find a way to make it through."`
  ],
  dreams: [
    `Each night when the moon rose high above the {setting}, {animalName} would close {animalName}'s eyes and dream of {dreamDescription}. It seemed impossible—everyone said so. "A {animalType} cannot {impossibleDream}," they told {animalName}. "It simply isn't done."\n\nBut {animalName} held the dream close, like a precious secret. And each day, {animalName} practiced and prepared as if the dream was already coming true. {childName} noticed this and asked, "Why do you try so hard for something that might never happen?"\n\n{animalName} smiled wisely. "Because dreams aren't about what is, little one. They're about what could be. And sometimes, if you believe in them enough, dreams find a way of becoming real."\n\nAnd then one magical evening, as stars began to appear in the twilight sky, something extraordinary happened...`,
    
    `"What do you wish for more than anything else in the world?" {animalName} asked {childName} as they sat beside the shimmering {landscapeFeature} that was said to be magical.\n\n{childName} thought for a long moment. "I wish for {childWish}," {childName} finally said, eyes shining with hope. "But everyone says it's just a silly dream."\n\n{animalName} dipped a paw into the {landscapeFeature}, sending ripples across its surface. "The most magnificent things in our world began as dreams in someone's heart," {animalName} said softly. "Dreams are like seeds. They need belief to grow." {animalName} gestured to the ripples spreading outward. "See how one small movement can change everything? That's what happens when you believe in your dreams."`
  ]
};

const themeEndings = {
  courage: [
    `As the sun began to set on their adventure, {animalName} and {childName} looked back at the path they had traveled. The {obstacle} that had once seemed so terrifying now looked small in the distance.\n\n"You were so brave," {childName} said admiringly. {animalName} smiled and put a gentle paw on {childName}'s shoulder. "And so were you. Sometimes the greatest courage is taking that first step into the unknown."\n\n{animalName} looked up at the first stars appearing in the dusky sky. "Remember, {childName}, being brave doesn't mean you're never scared. It means you don't let the fear stop you from doing what matters. And that kind of courage lives inside you always."\n\nAs they walked home together, {childName} stood a little taller, feeling the truth of {animalName}'s words. Courage wasn't something you found outside yourself—it was something you discovered within.`,
    
    `The journey had been long, and the challenges greater than either {animalName} or {childName} had imagined. But now, as they stood together watching the sunset paint the sky in colors of victory, they knew it had been worth every moment of fear they had overcome.\n\n"I never thought I could do something so brave," {childName} whispered. {animalName} nodded wisely. "Courage grows with each brave choice we make. Yesterday's impossibilities become today's triumphs."\n\n{animalName} looked at {childName} with eyes full of pride. "And remember, true courage isn't about facing danger for its own sake. It's about standing up for what's right, protecting those who need help, and sometimes, taking the first step on a new path even when you're afraid."\n\nAs stars began to appear in the evening sky, {childName} made a silent promise to carry this lesson of courage forward, knowing now that bravery wasn't the absence of fear—it was the light that guided you through it.`
  ],
  friendship: [
    `As twilight settled over the {setting}, {animalName} and {childName} sat side by side, watching fireflies dance in the gentle evening air. What had begun as a chance meeting had blossomed into a friendship neither had expected but both now treasured.\n\n"Thank you for sharing your {treasureItem} with me that day," {childName} said softly. "Not just for the {treasureItem} itself, but for showing me what true friendship means."\n\n{animalName} smiled. "The most precious things in life aren't things at all—they're the connections we make and the moments we share. A {treasureItem} kept to myself would never have brought me the joy that our friendship has."\n\nAs the stars appeared one by one in the darkening sky, {animalName} and {childName} made plans for tomorrow's adventure, knowing that whatever path they chose, they would walk it together. For they had discovered the most important truth of all: friendship multiplies joy and divides sorrow, making life's journey infinitely richer.`,
    
    `The celebration in the heart of the {setting} continued long into the evening. Animals of every kind gathered together, sharing food and stories and laughter. Where once there had been separation and suspicion between different species, now there was harmony.\n\n{childName} sat beside {animalName}, watching with wonder. "How did you know this would work?" {childName} asked. "Everyone said the {animalType}s and the {otherCreatures} could never be friends."\n\n{animalName} looked around at the joyful gathering with satisfaction. "True friendship begins with an open heart and a willingness to see beyond differences. Sometimes all it takes is one bridge-builder to show others what's possible."\n\n{animalName} turned to {childName} with gentle eyes. "Remember this, little one: friendship isn't always easy, but it's always worth it. It asks us to be vulnerable, to share our true selves, and to accept others as they are. But in return, it gives us companions for the journey and makes our world infinitely more beautiful."\n\nUnder a canopy of stars, surrounded by new friends, {childName} understood that this lesson in friendship would light the way forward for years to come.`
  ],
  adventure: [
    `As the moon rose high over the {setting}, {animalName} and {childName} made their way back home, their hearts full of the wonders they had discovered. The {mysteriousPlace} had been more magnificent than either could have imagined, with its {wonderDescription} and {wonderDescription}.\n\n"Do you think anyone will believe us when we tell them what we found?" {childName} asked, clutching the small {souvenir} they had brought back as proof of their journey.\n\n{animalName} chuckled. "Some will and some won't. But that's the beauty of adventure—it changes you in ways that only fellow adventurers can truly understand."\n\n{animalName} looked up at the star-filled sky. "The world is full of undiscovered marvels, {childName}, waiting for those curious enough to seek them. Never lose your sense of wonder, your courage to explore, or your willingness to step beyond the familiar path. For in adventure, we discover not just the world—but ourselves."\n\nAnd as they walked the final steps toward home, both knew with certainty that this adventure might be ending, but their lives as explorers had only just begun.`,
    
    `The journey back from the {boundary} was quiet, each lost in thoughts of all they had witnessed and learned. The {mysteriousPlace} had not been what they expected—it had been so much more, revealing secrets about the world and about themselves that neither {animalName} nor {childName} had anticipated.\n\n"I understand now," {childName} said as they crested the final hill that would lead them home. "Adventure isn't just about the destination."\n\n{animalName} nodded approvingly. "That's right. The true adventure lies in the journey itself—in the challenges overcome, the beauty discovered in unexpected places, and the courage found within when facing the unknown."\n\n{animalName} paused, looking back at the path they had traveled. "Some people never venture beyond what feels safe and familiar. But those who dare to explore—even when it's difficult or frightening—are rewarded with a life rich in discovery and possibility."\n\nAs the lights of home came into view, {childName} realized that while this particular adventure was ending, a new way of seeing the world had just begun. With {animalName}'s wisdom as a guide and a heart now open to possibility, {childName} knew that extraordinary adventures awaited around every corner—if only one had the courage to look.`
  ],
  kindness: [
    `The days grew warmer as spring returned to the {setting}, bringing new life and color everywhere. {animalName} stood at the edge of the meadow, watching as the once-injured {creatureInNeed} played happily with its friends.\n\n{childName} came to stand beside {animalName}. "The {creatureInNeed} looks so happy now," {childName} observed. "And look—it's helping that smaller creature find food! Just like you helped it."\n\n{animalName} smiled. "That's how kindness works. It ripples outward, from one heart to another. Each gentle act can inspire many more."\n\n"But you gave away your special {food}," {childName} pointed out. "Wasn't that a sacrifice?"\n\n{animalName} shook {animalName}'s head. "What I gave away was small compared to what I received in return. Kindness may seem to cost us something in the moment, but it enriches our lives in ways we cannot measure. The joy of helping others, the connections we form, the world we help create—these are treasures beyond price."\n\nAs they walked home together through the sun-dappled forest, {childName} looked for opportunities to show kindness along the way, understanding now that each small act was like planting a seed that would grow into something beautiful.`,
    
    `The great winter had finally passed, and the {setting} bloomed with new life. What had seemed like a time of scarcity had transformed into a season of unexpected abundance—not because there was suddenly more, but because the animals had learned to share what they had and care for one another.\n\n{animalName} and {childName} sat on a hilltop, watching the community below as animals worked together, building new homes and planting gardens that would feed everyone.\n\n"Your kindness changed everything," {childName} said admiringly. "You gave when it would have been easier to keep everything for yourself."\n\n{animalName} looked thoughtful. "True kindness isn't about ease or convenience—it's about seeing another's need and responding with an open heart. Sometimes kindness requires courage. Sometimes it asks us to give when we're afraid we don't have enough. But I've discovered that compassion creates its own kind of abundance."\n\n{animalName} gestured toward the thriving community. "Look what happened when we chose kindness over fear. One act inspired another, and another, until the whole {setting} was transformed."\n\n{childName} nodded, taking this wisdom to heart. "So kindness isn't just something we do—it's something we become."\n\n"Exactly," {animalName} agreed. "And in becoming kind, we discover our truest selves and our deepest connection to others." As the sun set in a sky painted with promise, both knew that this lesson in kindness would illuminate the path forward, not just for a season, but for a lifetime.`
  ],
  dreams: [
    `Twilight had fallen across the {setting}, stars appearing one by one in the indigo sky. {animalName} and {childName} sat together on the highest hill, witnessing the miracle that {animalName}'s dream had become reality. The {impossibleDream} that everyone had said couldn't happen was unfolding before their eyes in a display of wonder and magic.\n\n"You did it," {childName} whispered in awe. "You really did it."\n\n{animalName} smiled, eyes reflecting the starlight. "Dreams have a special kind of magic, {childName}. They show us possibilities that our practical minds might never consider. They give us courage when the path seems impossible. And sometimes, if we believe in them enough and work toward them with persistence, they transform from wishes into wonders."\n\n{animalName} turned to look at {childName}. "What dreams live in your heart? What beautiful impossibilities are waiting for you to believe in them?"\n\n{childName} thought for a moment, then shared a dream that had always seemed too big, too unlikely to ever come true. {animalName} didn't laugh or dismiss it. Instead, {animalName} nodded with understanding.\n\n"Hold onto that dream," {animalName} said softly. "Nurture it. Take small steps toward it, even when others doubt. Remember that every magnificent reality began as someone's 'impossible' dream."\n\nAs they watched the stars wheel overhead, both {animalName} and {childName} felt the quiet certainty that dreams were not mere fantasies—they were glimpses of what could be, waiting for brave hearts to make them real.`,
    
    `The {landscapeFeature} glowed with soft blue light under the full moon as {animalName} and {childName} stood before it one last time. Their journey together was coming to an end, but the magic they had discovered would remain forever in their hearts.\n\n"I never thought my wish for {childWish} could really happen," {childName} said, eyes shining with wonder and gratitude. "Everyone told me it was just a silly dream."\n\n{animalName} gazed at the ripples still moving across the {landscapeFeature}, echoes of possibility expanding outward. "The dreamers see what others cannot—not just the world as it is, but as it could be. They imagine doors where others see only walls."\n\n{animalName} placed a gentle paw on {childName}'s shoulder. "Your dream came true not just because you wished for it, but because you believed in it enough to take action, even when it was difficult. You kept hope alive when doubt crept in. You persevered when others would have given up."\n\nThe moon sailed behind a cloud, then emerged again, silvering the {setting} with new light. "Carry this truth with you," {animalName} continued. "Dreams are not escapes from reality—they are the blueprints for building a new one. They show us who we truly are and what we might become."\n\n{childName} nodded, understanding at last that dreams were not merely fanciful visions of the night, but guiding stars that illuminated the path forward. And with {animalName}'s wisdom as a compass, {childName} felt ready to dream even bigger dreams, knowing now that with belief, courage, and perseverance, the most magical possibilities could become wonderfully real.`
  ]
};

// Descriptive placeholders to be filled in dynamically
const settings = {
  fox: ["enchanted forest", "autumn woods", "misty hollow", "whispering pines"],
  rabbit: ["flowering meadow", "sunlit garden", "moonlit field", "hidden valley"],
  owl: ["ancient forest", "midnight woods", "starlit grove", "wisdom tree"],
  bear: ["mountain valley", "honey forest", "crystal caves", "riverland woods"],
  dolphin: ["coral kingdom", "sparkling sea", "azure depths", "rainbow reef"],
  elephant: ["golden savanna", "baobab plains", "emerald jungle", "misty mountains"]
};

const obstacles = {
  courage: ["dark ravine", "haunted cave", "raging river", "towering mountain", "fierce storm"],
  friendship: ["misunderstanding", "broken promise", "lonely winter", "great distance", "language barrier"],
  adventure: ["uncharted territory", "mysterious fog", "ancient riddle", "hidden path", "forgotten map"],
  kindness: ["bitter cold", "food shortage", "injured stranger", "village in need", "lost traveler"],
  dreams: ["impossible challenge", "others' doubt", "seemingly magical barrier", "ancient prophecy", "limited belief"]
};

const treasures = {
  courage: ["hidden knowledge", "lost friend", "crystal of strength", "path home", "healing spring"],
  friendship: ["shared joy", "unbreakable bond", "community celebration", "peaceful coexistence", "mutual understanding"],
  adventure: ["ancient wonder", "magical discovery", "new perspective", "incredible vista", "unexpected friend"],
  kindness: ["grateful heart", "new friendship", "community harmony", "unexpected return", "inner peace"],
  dreams: ["impossible achievement", "magical ability", "heart's desire", "hidden talent", "true calling"]
};

const treasureItems = {
  fox: ["glowing berries", "rainbow pebbles", "luminous feathers", "magical acorns", "sparkling dewdrops"],
  rabbit: ["golden carrots", "magical clover", "moonlight flowers", "singing seeds", "crystal lettuce"],
  owl: ["starlight feathers", "wisdom scrolls", "night blossoms", "dream catchers", "moonstone eggs"],
  bear: ["golden honey", "singing fish", "crystal pine cones", "rainbow flowers", "magic berries"],
  dolphin: ["singing pearls", "rainbow shells", "glowing coral", "starlight bubbles", "ocean crystals"],
  elephant: ["memory stones", "wisdom fruits", "dancing flowers", "singing water", "dream herbs"]
};

const itemDescriptions = [
  "tiny shells that hummed soft lullabies when held close",
  "feathers that changed color with the weather",
  "stones that sparkled with all the colors of the rainbow",
  "flowers that glowed softly in the darkness",
  "leaves that whispered ancient stories when the wind blew through them",
  "berries that tasted like your happiest memory",
  "twigs that could draw pictures in the air",
  "seeds that sprouted tiny dancing plants when touched"
];

const landscapeFeatures = {
  fox: ["fallen log", "ancient oak", "burbling stream", "moss-covered rock", "hidden den"],
  rabbit: ["carrot patch", "clover field", "thorn bush", "hollow stump", "flower thicket"],
  owl: ["grandmother tree", "moonlit clearing", "forgotten shrine", "night blooming flowers", "wisdom pool"],
  bear: ["honey tree", "singing waterfall", "berry bushes", "sleepy cave", "salmon stream"],
  dolphin: ["undersea cave", "coral throne", "shipwreck", "glowing anemone", "pearl beds"],
  elephant: ["watering hole", "towering baobab", "mud bath", "memory stone", "ancient trail"]
};

const creaturesInNeed = [
  "squirrel", "hedgehog", "mouse", "songbird", "butterfly", "turtle", 
  "chipmunk", "mole", "baby deer", "duckling", "firefly", "ladybug"
];

const foods = {
  fox: ["berries", "mushrooms", "honey", "nuts", "wild apples"],
  rabbit: ["carrots", "clover", "lettuce", "cabbage", "wildflowers"],
  owl: ["moonberries", "wisdom nuts", "night insects", "star fruits", "dream seeds"],
  bear: ["honey", "salmon", "berries", "nuts", "apples"],
  dolphin: ["silver fish", "sea stars", "kelp cakes", "plankton", "coral berries"],
  elephant: ["tree fruits", "sweet grasses", "memory roots", "baobab seeds", "water lilies"]
};

const dreamDescriptions = {
  fox: ["dancing with the northern lights", "speaking the language of birds", "turning invisible in moonlight", "creating illusions with a flick of the tail", "finding the legendary crystal den"],
  rabbit: ["growing wings to soar above the meadow", "creating gardens that bloomed overnight", "jumping high enough to touch the moon", "making carrots grow in any season", "building a bridge of flowers across the river"],
  owl: ["collecting all the stars in a basket", "knowing all the world's wisdom", "seeing tomorrow's events", "turning night into day with a single hoot", "teaching the moon to sing"],
  bear: ["climbing to the top of the sky mountain", "creating honey from sunlight", "hibernating for a hundred years to witness the future", "swimming to the bottom of the deepest lake", "becoming as light as a feather"],
  dolphin: ["building a castle from water", "breathing on land", "touching the stars from the highest leap", "singing songs that control the tides", "finding the lost underwater city"],
  elephant: ["dancing on clouds", "growing flowers with each footstep", "remembering the future", "speaking with ancestors through trunk-song", "gathering all the world's stories in one memory"]
};

const impossibleDreams = {
  fox: ["tame the wild wind", "catch the morning star", "outsmart the moon", "weave illusions into reality", "speak with ancient spirits"],
  rabbit: ["hop to the moon", "grow a garden in the clouds", "race the sunrise", "make flowers bloom in winter", "build bridges of rainbow"],
  owl: ["gather all wisdom", "paint the night with new stars", "read tomorrow's story", "understand every language ever spoken", "fly beyond the sky"],
  bear: ["carry a mountain", "swim to the bottom of the deepest ocean", "catch the sun's reflection", "bring spring in the depths of winter", "sing songs that heal any wound"],
  dolphin: ["swim through time", "build castles of water", "touch the stars with a leap", "breathe both water and air", "find the lost continent"],
  elephant: ["remember the future", "dance on dewdrops", "grow forests with a trumpet call", "carry the weight of the world", "walk among the stars"]
};

const wonderDescriptions = [
  "trees that grew upside down with roots reaching for the stars",
  "flowers that sang melodies when touched by sunlight",
  "pools of water that showed your happiest memories",
  "butterflies with wings that changed color to match your feelings",
  "stones that floated in mid-air, forming stepping paths",
  "clouds that took solid form, letting you walk upon them",
  "birds with feathers that glowed like rainbow gems",
  "fruits that tasted like your favorite dreams"
];

const souvenirs = [
  "crystal feather", "singing shell", "ever-blooming flower", "starlight in a bottle", 
  "color-changing stone", "tiny cloud in a jar", "map that showed different places each day", 
  "seed that grew plants that whispered stories"
];

const childWishes = [
  "a garden where it's always spring",
  "the ability to talk with animals",
  "a star that follows me wherever I go",
  "a tree house that can travel anywhere",
  "a friend who understands me completely",
  "to fly like a bird whenever I want",
  "to discover something no one has ever seen before",
  "to make everyone happy with a single smile"
];

const boundaries = {
  fox: ["edge of the forest", "misty border", "ancient stone wall", "river of stars", "shadow line"],
  rabbit: ["meadow's end", "garden wall", "carrot mountain", "clover horizon", "moonlight border"],
  owl: ["sky's limit", "wisdom boundary", "dream barrier", "night's edge", "starlight frontier"],
  bear: ["mountain ridge", "honey river", "cave of ancestors", "crystal waterfall", "sleeping stones"],
  dolphin: ["reef's edge", "deep trench", "bubble curtain", "current divide", "pearl barrier"],
  elephant: ["savanna horizon", "memory pool", "ancient trail's end", "wisdom tree circle", "thunder clouds"]
};

const mysteriousPlaces = {
  fox: ["Crystal Den", "Trickster's Haven", "Moonlight Hollow", "Whisper Woods", "Illusion Island"],
  rabbit: ["Carrot Castle", "Hop Heaven", "Moonjump Mountain", "Forever Spring", "Flower Kingdom"],
  owl: ["Wisdom Temple", "Star Library", "Night Palace", "Dream Archive", "Forever Tree"],
  bear: ["Honey Mountain", "Hibernation Cave", "Salmon Kingdom", "Ancient Forest", "Cloud Den"],
  dolphin: ["Bubble Palace", "Star Sea", "Lost Atlantis", "Coral Kingdom", "Wave Sanctuary"],
  elephant: ["Memory Valley", "Ancient Trail", "Wisdom Pool", "Baobab Kingdom", "Thunder Plain"]
};

const otherCreatures = {
  fox: ["rabbits", "birds", "hedgehogs", "mice", "badgers"],
  rabbit: ["foxes", "turtles", "field mice", "grasshoppers", "birds"],
  owl: ["mice", "squirrels", "bats", "raccoons", "foxes"],
  bear: ["wolves", "eagles", "salmon", "deer", "beavers"],
  dolphin: ["sharks", "turtles", "octopuses", "whales", "sea lions"],
  elephant: ["lions", "giraffes", "zebras", "monkeys", "rhinos"]
};

/**
 * Generate a name for the animal character
 */
function generateAnimalName(animal: string): string {
  const foxNames = ["Rusty", "Ember", "Ginger", "Swift", "Clever", "Shadow", "Whisper", "Autumn", "Flash", "Spark"];
  const rabbitNames = ["Hop", "Clover", "Cotton", "Daisy", "Thistle", "Bounce", "Whiskers", "Nibble", "Petal", "Fluffy"];
  const owlNames = ["Wisdom", "Echo", "Luna", "Athena", "Hoot", "Sage", "Shadow", "Midnight", "Starlight", "Oracle"];
  const bearNames = ["Honey", "Maple", "Cinnamon", "Mocha", "Grizzly", "Timber", "Cocoa", "Berry", "Oakley", "Teddy"];
  const dolphinNames = ["Splash", "Wave", "Ripple", "Azure", "Echo", "Finn", "Bubble", "Pearl", "Marina", "Tide"];
  const elephantNames = ["Tusk", "Memory", "Gentle", "Trumpet", "Baobab", "Mighty", "Sage", "Storm", "Savanna", "Legend"];

  const namesMap: { [key: string]: string[] } = {
    fox: foxNames,
    rabbit: rabbitNames,
    owl: owlNames,
    bear: bearNames,
    dolphin: dolphinNames,
    elephant: elephantNames
  };

  const names = namesMap[animal] || foxNames;
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

/**
 * Generate a title for the story based on animal and theme
 */
function generateTitle(childName: string, animal: string, theme: string, animalName: string): string {
  const titleTemplates = [
    `{animalName} and {childName}'s {theme} Adventure`,
    `The {animal} Who Learned About {theme}`,
    `{childName} and the {animal} of {theme}`,
    `The Magical {theme} of {animalName} the {animal}`,
    `{animalName}'s {theme} Journey with {childName}`,
    `When {childName} Met {animalName}: A Tale of {theme}`,
    `{theme} in the {setting}: {childName} and {animalName}'s Story`,
    `{animalName} the {animal}: A {theme} Tale`,
    `The {theme} {animal}`,
    `{childName}'s Magical Adventure with {animalName} the {animal}`
  ];

  // Map theme values to readable titles
  const themeReadable: { [key: string]: string } = {
    courage: "Courage",
    friendship: "Friendship",
    adventure: "Adventure",
    kindness: "Kindness",
    dreams: "Dreams"
  };

  // Map animal values to readable titles (capitalized)
  const animalReadable = animal.charAt(0).toUpperCase() + animal.slice(1);

  // Pick a random title template
  const randomTemplate = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];

  // Fill in the template with actual values
  return randomTemplate
    .replace(/{animalName}/g, animalName)
    .replace(/{childName}/g, childName)
    .replace(/{theme}/g, themeReadable[theme] || theme)
    .replace(/{animal}/g, animalReadable)
    .replace(/{setting}/g, settings[animal as keyof typeof settings]?.[0] || "magical place");
}

/**
 * Generate a complete bedtime story
 */
export function generateStory(childName: string, animal: string, theme: string, customMessage: string): Story {
  // Generate a name for the animal character
  const animalName = generateAnimalName(animal);
  
  // Generate a title for the story
  const title = generateTitle(childName, animal, theme, animalName);
  
  // Pick random elements for the story
  const setting = settings[animal as keyof typeof settings]?.[Math.floor(Math.random() * 4)] || "magical place";
  const obstacle = obstacles[theme as keyof typeof obstacles]?.[Math.floor(Math.random() * 5)] || "challenge";
  const treasure = treasures[theme as keyof typeof treasures]?.[Math.floor(Math.random() * 5)] || "treasure";
  const treasureItem = treasureItems[animal as keyof typeof treasureItems]?.[Math.floor(Math.random() * 5)] || "special item";
  const itemDescription = itemDescriptions[Math.floor(Math.random() * itemDescriptions.length)];
  const landscapeFeature = landscapeFeatures[animal as keyof typeof landscapeFeatures]?.[Math.floor(Math.random() * 5)] || "special place";
  const creatureInNeed = creaturesInNeed[Math.floor(Math.random() * creaturesInNeed.length)];
  const food = foods[animal as keyof typeof foods]?.[Math.floor(Math.random() * 5)] || "food";
  const dreamDescription = dreamDescriptions[animal as keyof typeof dreamDescriptions]?.[Math.floor(Math.random() * 5)] || "something magical";
  const impossibleDream = impossibleDreams[animal as keyof typeof impossibleDreams]?.[Math.floor(Math.random() * 5)] || "do the impossible";
  const wonderDescription = wonderDescriptions[Math.floor(Math.random() * wonderDescriptions.length)];
  const souvenir = souvenirs[Math.floor(Math.random() * souvenirs.length)];
  const childWish = childWishes[Math.floor(Math.random() * childWishes.length)];
  const boundary = boundaries[animal as keyof typeof boundaries]?.[Math.floor(Math.random() * 5)] || "horizon";
  const mysteriousPlace = mysteriousPlaces[animal as keyof typeof mysteriousPlaces]?.[Math.floor(Math.random() * 5)] || "Magic Place";
  const otherCreature = otherCreatures[animal as keyof typeof otherCreatures]?.[Math.floor(Math.random() * 5)] || "other animals";
  const animalType = animal;

  // Choose random story beginning based on animal
  const beginnings = storyBeginnings[animal as keyof typeof storyBeginnings] || storyBeginnings.fox;
  const storyBeginning = beginnings[Math.floor(Math.random() * beginnings.length)]
    .replace(/{animalName}/g, animalName)
    .replace(/{childName}/g, childName);

  // Choose random story middle based on theme
  const middles = themeMidPoints[theme as keyof typeof themeMidPoints] || themeMidPoints.courage;
  const storyMiddle = middles[Math.floor(Math.random() * middles.length)]
    .replace(/{animalName}/g, animalName)
    .replace(/{childName}/g, childName)
    .replace(/{setting}/g, setting)
    .replace(/{obstacle}/g, obstacle)
    .replace(/{treasure}/g, treasure)
    .replace(/{treasureItem}/g, treasureItem)
    .replace(/{treasureItems}/g, treasureItem + 's')
    .replace(/{itemDescription}/g, itemDescription)
    .replace(/{landscapeFeature}/g, landscapeFeature)
    .replace(/{creatureInNeed}/g, creatureInNeed)
    .replace(/{food}/g, food)
    .replace(/{dreamDescription}/g, dreamDescription)
    .replace(/{impossibleDream}/g, impossibleDream)
    .replace(/{wonderDescription}/g, wonderDescription)
    .replace(/{souvenir}/g, souvenir)
    .replace(/{childWish}/g, childWish)
    .replace(/{boundary}/g, boundary)
    .replace(/{mysteriousPlace}/g, mysteriousPlace)
    .replace(/{otherCreatures}/g, otherCreature)
    .replace(/{animalType}/g, animalType);

  // Choose random story ending based on theme
  const endings = themeEndings[theme as keyof typeof themeEndings] || themeEndings.courage;
  const storyEnding = endings[Math.floor(Math.random() * endings.length)]
    .replace(/{animalName}/g, animalName)
    .replace(/{childName}/g, childName)
    .replace(/{setting}/g, setting)
    .replace(/{obstacle}/g, obstacle)
    .replace(/{treasure}/g, treasure)
    .replace(/{treasureItem}/g, treasureItem)
    .replace(/{treasureItems}/g, treasureItem + 's')
    .replace(/{itemDescription}/g, itemDescription)
    .replace(/{landscapeFeature}/g, landscapeFeature)
    .replace(/{creatureInNeed}/g, creatureInNeed)
    .replace(/{food}/g, food)
    .replace(/{dreamDescription}/g, dreamDescription)
    .replace(/{impossibleDream}/g, impossibleDream)
    .replace(/{wonderDescription}/g, wonderDescription)
    .replace(/{souvenir}/g, souvenir)
    .replace(/{childWish}/g, childWish)
    .replace(/{boundary}/g, boundary)
    .replace(/{mysteriousPlace}/g, mysteriousPlace)
    .replace(/{otherCreatures}/g, otherCreature)
    .replace(/{animalType}/g, animalType);

  // Combine all parts with transitions
  let content = storyBeginning + "\n\n";

  // Add a transition paragraph between beginning and middle
  const transitions = [
    `Little did ${animalName} know, an extraordinary adventure was about to begin—one that would teach ${animalName} the true meaning of ${theme}.`,
    `${childName} had heard many stories about ${animalName}, but nothing could have prepared ${childName} for the magical journey they were about to share.`,
    `As the sun rose higher in the sky, casting golden light through the ${setting}, ${animalName} felt a strange feeling—like today was going to be different from any other day.`,
    `It was on a day just like this when ${childName} first met ${animalName}, and both of their lives were changed forever.`
  ];

  content += transitions[Math.floor(Math.random() * transitions.length)] + "\n\n";
  content += storyMiddle + "\n\n";

  // Add another transition paragraph
  const midTransitions = [
    `The hours passed like minutes as ${animalName} and ${childName} continued their journey, learning more about each other with every step.`,
    `As the day went on, the magic of their adventure only grew stronger, weaving a spell around them both.`,
    `With each challenge they faced together, the bond between ${animalName} and ${childName} grew deeper, like roots of an ancient tree.`,
    `Time seemed to stand still in the ${setting}, as if the world itself wanted to witness the special connection forming between ${animalName} and ${childName}.`
  ];

  content += midTransitions[Math.floor(Math.random() * midTransitions.length)] + "\n\n";

  // Add more story content to reach 1000 words
  const additionalContent = [
    `${animalName} led ${childName} deeper into the ${setting}, where the light filtered through in golden patterns and the sounds of nature created a gentle symphony. "There's something special I want to show you," ${animalName} said, eyes twinkling with excitement. "Something very few have ever seen."\n\n${childName} followed eagerly, heart racing with anticipation. Each step they took seemed to transport them further into a world of wonder, where ordinary rules no longer applied. Birds with rainbow feathers sang melodies that seemed to tell ancient stories, and flowers bloomed in colors ${childName} had never seen before.\n\n"The secret to true ${theme}," ${animalName} explained as they walked, "is that it must come from within. It can't be found or given—only discovered in one's own heart." ${childName} listened intently, feeling the truth of these words settle deep inside.`,
    
    `The path took an unexpected turn, leading them to a hidden clearing where ${landscapeFeature} stood in the center, surrounded by a circle of luminous mushrooms. "This is a place of power," ${animalName} whispered reverently. "A place where dreams and reality weave together."\n\n${childName} felt a tingling sensation, as if the very air was charged with possibility. "What happens here?"\n\n${animalName} smiled mysteriously. "That depends on what you bring in your heart. For those who come with courage and kindness, wonderful things can unfold."\n\nThey sat together in comfortable silence, watching as fireflies began to appear in the growing twilight, their soft lights dancing around them like earthbound stars. The moment felt timeless, sacred somehow.`,
    
    `"Do you know," ${animalName} said softly, "there's an old legend in the ${setting} about a ${animalType} and a human child who became the most unlikely of friends? It's said their friendship was so pure it created a magic that healed the divide between our worlds."\n\n${childName} looked at ${animalName} with wide eyes. "Do you think that's us? Are we creating magic?"\n\n${animalName} laughed, the sound like music in the quiet forest. "Perhaps. Magic isn't always grand gestures and flashing lights. Sometimes it's in the smallest things—a kind word, a helping hand, or the courage to be exactly who you are."\n\n${childName} considered this thoughtfully, watching a butterfly with wings like stained glass land briefly on ${animalName}'s ear. There was wisdom in these words that seemed to resonate with something deep inside.`,
    
    `As evening approached, they found themselves beside a small stream that bubbled and chattered as if sharing secrets. ${animalName} showed ${childName} how to skip stones across the water, each one bouncing five or six times before disappearing beneath the surface.\n\n"Each ripple travels outward," ${animalName} observed, "touching places far beyond where the stone landed. Our actions are like that too. Even the smallest deed can create ripples that reach farther than we could ever imagine."\n\n${childName} tried skipping a stone, watching with delight as it bounced across the water's surface. "So even small acts of ${theme} matter?"\n\n"Especially those," ${animalName} nodded. "Sometimes the smallest acts create the largest ripples of all."`
  ];

  // Add all additional content sections
  for (const section of additionalContent) {
    content += section
      .replace(/{animalName}/g, animalName)
      .replace(/{childName}/g, childName)
      .replace(/{setting}/g, setting)
      .replace(/{landscapeFeature}/g, landscapeFeature)
      .replace(/{theme}/g, theme)
      .replace(/{animalType}/g, animalType);
    content += "\n\n";
  }

  // Add ending
  content += storyEnding;

  // Add custom message if provided
  if (customMessage) {
    content += "\n\n" + "Special message for " + childName + ": " + customMessage;
  }

  return {
    id: 0, // This will be set by the server
    title,
    content,
    childName,
    animal,
    theme,
    customMessage: customMessage || "",
    createdAt: new Date(),
    language: "en",  // Tambahkan properti 'language'
    imageUrl: null    // Tambahkan properti 'imageUrl' (bisa null)
  };
}
