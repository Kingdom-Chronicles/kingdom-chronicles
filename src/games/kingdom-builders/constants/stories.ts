export const STORY_LEVELS = {
  1: {
    title: "God Makes the World",
    description: "Create the world in 7 days with God!",
    objective: "Drag and drop items to create the world in order",
    scripture: "Genesis 1-2",
    items: [
      { id: 'light', name: 'Light', emoji: '💡', description: 'Let there be light! (Day 1)' },
      { id: 'sky', name: 'Sky', emoji: '☁️', description: 'Waters above and below (Day 2)' },
      { id: 'land', name: 'Land', emoji: '🌍', description: 'Dry ground appears (Day 3)' },
      { id: 'plants', name: 'Plants', emoji: '🌱', description: 'Trees and flowers grow (Day 3)' },
      { id: 'sun', name: 'Sun', emoji: '☀️', description: 'Greater light to rule the day (Day 4)' },
      { id: 'moon', name: 'Moon', emoji: '🌙', description: 'Lesser light for the night (Day 4)' },
      { id: 'fish', name: 'Fish', emoji: '🐟', description: 'Sea creatures (Day 5)' },
      { id: 'birds', name: 'Birds', emoji: '🐦', description: 'Flying creatures (Day 5)' },
      { id: 'animals', name: 'Animals', emoji: '🦁', description: 'Land animals (Day 6)' },
      { id: 'people', name: 'People', emoji: '👫', description: 'Adam and Eve (Day 6)' }
    ],
    correctOrder: ['light', 'sky', 'land', 'plants', 'sun', 'moon', 'fish', 'birds', 'animals', 'people']
  },
  
  2: {
    title: "Noah Builds the Boat",
    description: "Gather animals and build the ark to prepare for the flood",
    objective: "Match animal pairs and assemble the ark",
    scripture: "Genesis 6-9",
    items: [
      { id: 'wood', name: 'Gather Wood', emoji: '🪵', description: 'Collect materials for the ark' },
      { id: 'build', name: 'Build Ark', emoji: '🔨', description: 'Construct the boat' },
      { id: 'animals', name: 'Gather Animals', emoji: '🐘', description: 'Two by two' },
      { id: 'food', name: 'Store Food', emoji: '🌾', description: 'Provisions for the journey' },
      { id: 'family', name: 'Board Family', emoji: '👨‍👩‍👧‍👦', description: 'Noah\'s family enters' },
      { id: 'rain', name: 'Rain Begins', emoji: '🌧️', description: 'The flood starts' },
      { id: 'float', name: 'Ark Floats', emoji: '🌊', description: 'Water covers the earth' },
      { id: 'dove', name: 'Send Dove', emoji: '🕊️', description: 'Looking for dry land' },
      { id: 'rainbow', name: 'Rainbow Promise', emoji: '🌈', description: 'God\'s covenant' },
      { id: 'land', name: 'Reach Dry Land', emoji: '⛰️', description: 'The ark rests on mountains' }
    ],
    correctOrder: ['wood', 'build', 'food', 'animals', 'family', 'rain', 'float', 'dove', 'land', 'rainbow']
  },
  
  3: {
    title: "David Defeats Goliath",
    description: "Help young David prepare to face the giant!",
    objective: "Collect smooth stones and aim your slingshot",
    scripture: "1 Samuel 17",
    items: [
      { id: 'refuse', name: 'Refuse Armor', emoji: '🛡️', description: 'Too heavy for David' },
      { id: 'staff', name: 'Take Staff', emoji: '🦯', description: 'Shepherd\'s tool' },
      { id: 'stones', name: 'Choose Stones', emoji: '🪨', description: 'Five smooth stones' },
      { id: 'sling', name: 'Ready Sling', emoji: '🎯', description: 'David\'s weapon' },
      { id: 'faith', name: 'Trust God', emoji: '🙏', description: 'Have faith in God' },
      { id: 'challenge', name: 'Challenge Goliath', emoji: '🗣️', description: 'Speak boldly' },
      { id: 'aim', name: 'Aim Carefully', emoji: '👁️', description: 'Focus on target' },
      { id: 'shoot', name: 'Shoot Stone', emoji: '💫', description: 'Release the stone' },
      { id: 'hit', name: 'Hit Forehead', emoji: '💥', description: 'Stone strikes Goliath' },
      { id: 'victory', name: 'Victory!', emoji: '🏆', description: 'Goliath falls' }
    ],
    correctOrder: ['refuse', 'staff', 'stones', 'sling', 'faith', 'challenge', 'aim', 'shoot', 'hit', 'victory']
  },
  
  4: {
    title: "Daniel and the Lions",
    description: "Help Daniel stay faithful and survive in the lion's den",
    objective: "Calm the lions and find places to pray",
    scripture: "Daniel 6",
    items: [
      { id: 'pray', name: 'Pray Daily', emoji: '🙏', description: 'Daniel prays three times a day' },
      { id: 'law', name: 'New Law', emoji: '📜', description: 'King signs decree against prayer' },
      { id: 'continue', name: 'Continue Praying', emoji: '🪟', description: 'Daniel keeps praying anyway' },
      { id: 'caught', name: 'Get Caught', emoji: '👁️', description: 'Officials see Daniel praying' },
      { id: 'king', name: 'Face the King', emoji: '👑', description: 'Daniel brought before the king' },
      { id: 'den', name: 'Thrown in Den', emoji: '🕳️', description: 'Daniel cast into lions\' den' },
      { id: 'angel', name: 'Angel Arrives', emoji: '👼', description: 'God sends an angel' },
      { id: 'protect', name: 'Lions Calmed', emoji: '🦁', description: 'Lions\' mouths are shut' },
      { id: 'morning', name: 'Morning Comes', emoji: '🌅', description: 'Daniel survives the night' },
      { id: 'rescue', name: 'King Rescues', emoji: '🔓', description: 'Daniel is lifted from the den' }
    ],
    correctOrder: ['pray', 'law', 'continue', 'caught', 'king', 'den', 'angel', 'protect', 'morning', 'rescue']
  },
  
  5: {
    title: "Jesus Visits Zacchaeus",
    description: "Help Zacchaeus meet Jesus and change his heart!",
    objective: "Climb the tree and share your wealth",
    scripture: "Luke 19:1-10",
    items: [
      { id: 'short', name: 'Too Short', emoji: '👨', description: 'Zacchaeus is short' },
      { id: 'crowd', name: 'See Crowd', emoji: '👥', description: 'Many people around Jesus' },
      { id: 'tree', name: 'Find Tree', emoji: '🌳', description: 'Spot a sycamore tree' },
      { id: 'climb', name: 'Climb Tree', emoji: '🧗', description: 'Climb up to see better' },
      { id: 'jesus', name: 'Jesus Notices', emoji: '👀', description: 'Jesus looks up and sees him' },
      { id: 'call', name: 'Jesus Calls', emoji: '📣', description: '"Zacchaeus, come down!"' },
      { id: 'home', name: 'Go Home', emoji: '🏠', description: 'Jesus visits Zacchaeus\' house' },
      { id: 'repent', name: 'Heart Changes', emoji: '💖', description: 'Zacchaeus repents' },
      { id: 'give', name: 'Give to Poor', emoji: '💰', description: 'Share half of possessions' },
      { id: 'restore', name: 'Restore Money', emoji: '4️⃣', description: 'Pay back four times' }
    ],
    correctOrder: ['short', 'crowd', 'tree', 'climb', 'jesus', 'call', 'home', 'repent', 'give', 'restore']
  }
};

export const COMPLETION_MESSAGE = {
  title: "🎉 Well done, Builder!",
  subtitle: "You've completed the first Bible Adventures.",
  message: "🛠️ New stories and levels are coming soon in the next update!",
  footer: "📦 Stay tuned and keep building with kindness!"
};