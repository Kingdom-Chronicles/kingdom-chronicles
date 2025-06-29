import type { GameLevel } from '../types';

export const GAME_LEVELS: GameLevel[] = [
  {
    id: 1,
    title: "God Makes the World",
    description: "Help God create the world in the right order!",
    emoji: "🌍",
    items: [
      { id: "light", name: "Light", emoji: "💡", description: "Let there be light!" },
      { id: "sky", name: "Sky", emoji: "☁️", description: "Separate the waters" },
      { id: "land", name: "Land & Sea", emoji: "🏔️", description: "Dry ground appears" },
      { id: "plants", name: "Plants", emoji: "🌱", description: "Trees and flowers grow" },
      { id: "sun", name: "Sun & Moon", emoji: "☀️", description: "Lights in the sky" },
      { id: "animals", name: "Animals", emoji: "🦁", description: "Creatures of land and sea" },
      { id: "people", name: "People", emoji: "👫", description: "Adam and Eve" }
    ],
    correctOrder: ["light", "sky", "land", "plants", "sun", "animals", "people"],
    completed: false,
    unlocked: true
  },
  {
    id: 2,
    title: "Noah Builds the Boat",
    description: "Help Noah prepare for the great flood!",
    emoji: "🚢",
    items: [
      { id: "wood", name: "Gather Wood", emoji: "🪵", description: "Collect materials" },
      { id: "build", name: "Build Ark", emoji: "🔨", description: "Construct the boat" },
      { id: "animals", name: "Gather Animals", emoji: "🐘", description: "Two by two" },
      { id: "food", name: "Store Food", emoji: "🌾", description: "Provisions for the journey" },
      { id: "family", name: "Board Family", emoji: "👨‍👩‍👧‍👦", description: "Noah's family enters" },
      { id: "rain", name: "Rain Begins", emoji: "🌧️", description: "The flood starts" }
    ],
    correctOrder: ["wood", "build", "food", "animals", "family", "rain"],
    completed: false,
    unlocked: false
  },
  {
    id: 3,
    title: "David Defeats Goliath",
    description: "Help young David prepare to face the giant!",
    emoji: "🏹",
    items: [
      { id: "refuse", name: "Refuse Armor", emoji: "🛡️", description: "Too heavy for David" },
      { id: "staff", name: "Take Staff", emoji: "🦯", description: "Shepherd's tool" },
      { id: "stones", name: "Choose Stones", emoji: "🪨", description: "Five smooth stones" },
      { id: "sling", name: "Ready Sling", emoji: "🎯", description: "David's weapon" },
      { id: "faith", name: "Trust God", emoji: "🙏", description: "Have faith" },
      { id: "victory", name: "Victory!", emoji: "🏆", description: "Goliath falls" }
    ],
    correctOrder: ["refuse", "staff", "stones", "sling", "faith", "victory"],
    completed: false,
    unlocked: false
  },
  {
    id: 4,
    title: "Daniel and the Lions",
    description: "Help Daniel stay faithful in the lion's den!",
    emoji: "🦁",
    items: [
      { id: "pray", name: "Continue Praying", emoji: "🙏", description: "Stay faithful to God" },
      { id: "arrest", name: "Get Arrested", emoji: "⛓️", description: "Consequences of faith" },
      { id: "den", name: "Enter Lion's Den", emoji: "🕳️", description: "Into the pit" },
      { id: "angel", name: "Angel Protects", emoji: "👼", description: "God sends help" },
      { id: "calm", name: "Lions Stay Calm", emoji: "😴", description: "Mouths are shut" },
      { id: "rescue", name: "King Rescues", emoji: "👑", description: "Daniel is saved" }
    ],
    correctOrder: ["pray", "arrest", "den", "angel", "calm", "rescue"],
    completed: false,
    unlocked: false
  },
  {
    id: 5,
    title: "Jesus Visits Zacchaeus",
    description: "Help Zacchaeus meet Jesus and change his heart!",
    emoji: "🌿",
    items: [
      { id: "crowd", name: "See the Crowd", emoji: "👥", description: "Too many people" },
      { id: "tree", name: "Climb Tree", emoji: "🌳", description: "Get a better view" },
      { id: "jesus", name: "Jesus Notices", emoji: "✨", description: "Jesus looks up" },
      { id: "invite", name: "Jesus Invites", emoji: "🏠", description: "Come down, I'll visit" },
      { id: "repent", name: "Zacchaeus Repents", emoji: "💔", description: "Heart changes" },
      { id: "give", name: "Give to Poor", emoji: "💰", description: "Share wealth" }
    ],
    correctOrder: ["crowd", "tree", "jesus", "invite", "repent", "give"],
    completed: false,
    unlocked: false
  }
];