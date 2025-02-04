import { BibleStory } from '../types';

export const BIBLE_STORIES: BibleStory[] = [
  // EASY STORIES (50)
  {
    id: 'creation',
    title: 'The Creation Story',
    description: 'God creates the world in six days and rests on the seventh',
    scripture: 'Genesis 1-2',
    difficulty: 'easy',
    image: {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
      alt: 'Creation of the world'
    },
    fallbackDescription: 'God creating the heavens and earth, light and darkness, land and sea, plants and animals, and finally humans.',
    options: [
      'The Creation Story',
      'Noah\'s Flood',
      'The Tower of Babel',
      'The Garden of Eden'
    ],
    correctAnswer: 'The Creation Story',
    devotional: 'God\'s power and creativity are displayed in all of creation.'
  },
  {
    id: 'adam-eve',
    title: 'Adam and Eve',
    description: 'The first humans disobey God and eat the forbidden fruit',
    scripture: 'Genesis 3',
    difficulty: 'easy',
    image: {
      url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1920&auto=format&fit=crop',
      alt: 'Adam and Eve'
    },
    fallbackDescription: 'Two humans, Adam and Eve, standing in a garden.',
    options: [
      'Adam and Eve',
      'Cain and Abel',
      'Abraham and Sarah',
      'Isaac and Rebekah'
    ],
    correctAnswer: 'Adam and Eve',
    devotional: 'Sin has consequences, but God provides a way of redemption.'
  },
  {
    id: 'cain-abel',
    title: 'Cain and Abel',
    description: 'Two brothers bring offerings to God with very different outcomes',
    scripture: 'Genesis 4',
    difficulty: 'easy',
    image: {
      url: 'https://images.unsplash.com/photo-1533000971552-6a962ff0b9f9?q=80&w=1920&auto=format&fit=crop',
      alt: 'Cain and Abel'
    },
    fallbackDescription: 'Two men standing, one holding an offering, the other not.',
    options: [
      'Cain and Abel',
      'Jacob and Esau',
      'Moses and Aaron',
      'David and Jonathan'
    ],
    correctAnswer: 'Cain and Abel',
    devotional: 'God desires sincere worship from a pure heart.'
  },
  {
    id: 'noahs-ark',
    title: 'Noah\'s Ark',
    description: 'Noah builds an ark to save his family and animals from a great flood',
    scripture: 'Genesis 6-9',
    difficulty: 'easy',
    image: {
      url: 'https://images.unsplash.com/photo-1578165219176-ece04edbd053?q=80&w=1920&auto=format&fit=crop',
      alt: 'Noah\'s Ark'
    },
    fallbackDescription: 'A large wooden boat with animals entering two by two, while rain clouds gather overhead.',
    options: [
      'Noah\'s Ark',
      'The Creation Story',
      'Moses Crossing the Red Sea',
      'Jonah and the Whale'
    ],
    correctAnswer: 'Noah\'s Ark',
    devotional: 'God provides a way of salvation for those who trust and obey Him.'
  },
  {
    id: 'moses-basket',
    title: 'Baby Moses in the Basket',
    description: 'Moses\' mother places him in a basket on the Nile to save his life',
    scripture: 'Exodus 2:1-10',
    difficulty: 'easy',
    image: {
      url: 'https://images.unsplash.com/photo-1516714819001-8ee7a13b88d3?q=80&w=1920&auto=format&fit=crop',
      alt: 'Baby Moses in basket'
    },
    fallbackDescription: 'A baby in a basket floating on water, with reeds around it.',
    options: [
      'Baby Moses in the Basket',
      'Jesus in the Manger',
      'Samuel as a Child',
      'Young David'
    ],
    correctAnswer: 'Baby Moses in the Basket',
    devotional: 'God protects and guides those He has chosen for His purpose.'
  },
  {
    id: 'david-goliath',
    title: 'David and Goliath',
    description: 'A young shepherd defeats a giant warrior with a sling and stone',
    scripture: '1 Samuel 17',
    difficulty: 'easy',
    image: {
      url: 'https://images.unsplash.com/photo-1578165219176-ece04edbd053?q=80&w=1920&auto=format&fit=crop',
      alt: 'David and Goliath'
    },
    fallbackDescription: 'A young boy with a sling facing a giant warrior.',
    options: [
      'David and Goliath',
      'Samson and the Lion',
      'Joshua at Jericho',
      'Gideon\'s Battle'
    ],
    correctAnswer: 'David and Goliath',
    devotional: 'With God, even the smallest can overcome the greatest challenges.'
  },
  {
    id: 'daniel-lions',
    title: 'Daniel in the Lions\' Den',
    description: 'Daniel is thrown into a den of lions but God protects him',
    scripture: 'Daniel 6',
    difficulty: 'easy',
    image: {
      url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1920&auto=format&fit=crop',
      alt: 'Daniel and lions'
    },
    fallbackDescription: 'A man surrounded by lions in a den, but remaining unharmed.',
    options: [
      'Daniel in the Lions\' Den',
      'Samson and the Lion',
      'David as Shepherd',
      'Noah and the Animals'
    ],
    correctAnswer: 'Daniel in the Lions\' Den',
    devotional: 'God protects those who remain faithful to Him.'
  },
  // Continue with more easy stories...

  // MEDIUM STORIES (50)
  {
    id: 'abraham-sacrifice',
    title: 'Abraham\'s Test',
    description: 'Abraham is asked to sacrifice his son Isaac as a test of faith',
    scripture: 'Genesis 22',
    difficulty: 'medium',
    image: {
      url: 'https://images.unsplash.com/photo-1533000971552-6a962ff0b9f9?q=80&w=1920&auto=format&fit=crop',
      alt: 'Abraham'
    },
    fallbackDescription: 'Abraham standing with his son Isaac, preparing to sacrifice him.',
    options: [
      'Abraham\'s Test',
      'Jephthah\'s Vow',
      'The Binding of Isaac',
      'The Sacrifice of Samuel'
    ],
    correctAnswer: 'Abraham\'s Test',
    devotional: 'True faith means trusting God even when we don\'t understand His plan.'
  },
  {
    id: 'joseph-dreams',
    title: 'Joseph\'s Dreams',
    description: 'A young man\'s dreams lead to jealousy from his brothers',
    scripture: 'Genesis 37',
    difficulty: 'medium',
    image: {
      url: 'https://images.unsplash.com/photo-1533000971552-6a962ff0b9f9?q=80&w=1920&auto=format&fit=crop',
      alt: 'Joseph'
    },
    fallbackDescription: 'A young man, Joseph, standing with his brothers, looking troubled.',
    options: [
      'Joseph\'s Dreams',
      'Daniel\'s Visions',
      'Jacob\'s Ladder',
      'Pharaoh\'s Dreams'
    ],
    correctAnswer: 'Joseph\'s Dreams',
    devotional: 'God can use difficult circumstances to fulfill His greater purpose.'
  },
  {
    id: 'gideon-fleece',
    title: 'Gideon and the Fleece',
    description: 'Gideon asks God for signs using a wool fleece to confirm His will.',
    scripture: 'Judges 6:36-40',
    difficulty: 'medium',
    image: {
      url: 'https://images.unsplash.com/photo-1572371753946-2ebf2f799ad2?q=80&w=1920&auto=format&fit=crop',
      alt: 'Gideon'
    },
    fallbackDescription: 'A man, Gideon, standing with a fleece in his hand.',
    options: [
      'Gideon and the Fleece',
      'Moses and the Burning Bush',
      'Elijah and the Ravens',
      'Jonah and the Fish'
    ],
    correctAnswer: 'Gideon and the Fleece',
    devotional: 'God is patient with our doubts and strengthens our faith.'
  },
  {
    id: 'elijah-widow',
    title: 'Elijah and the Widow’s Oil',
    description: 'A widow’s oil miraculously does not run out during a famine.',
    scripture: '1 Kings 17:8-16',
    difficulty: 'medium',
    image: {
      url: 'https://images.unsplash.com/photo-1563206767-5f4eeb72f324?q=80&w=1920&auto=format&fit=crop',
      alt: 'Elijah'
    },
    fallbackDescription: 'A woman, possibly a widow, holding a jar of oil.',
    options: [
      'Elijah and the Widow’s Oil',
      'Elisha and the Shunammite',
      'Jesus Feeds the 5,000',
      'Manna in the Desert'
    ],
    correctAnswer: 'Elijah and the Widow’s Oil',
    devotional: 'God provides for those who trust Him.'
  },
  {
    id: 'handwriting-wall',
    title: 'The Handwriting on the Wall',
    description: 'Mysterious writing appears on the wall at King Belshazzar’s feast.',
    scripture: 'Daniel 5',
    difficulty: 'medium',
    image: {
      url: 'https://images.unsplash.com/photo-1533000971552-6a962ff0b9f9?q=80&w=1920&auto=format&fit=crop',
      alt: 'King Belshazzar'
    },
    fallbackDescription: 'A man, King Belshazzar, standing in front of a wall with writing on it.',
    options: [
      'The Handwriting on the Wall',
      'Moses and the Ten Commandments',
      'Jesus Writing in the Sand',
      'Joseph Interprets Pharaoh’s Dreams'
    ],
    correctAnswer: 'The Handwriting on the Wall',
    devotional: 'God warns those who dishonor Him.'
  },
  {
    id: 'rahab-spies',
    title: 'Rahab and the Spies',
    description: 'A woman helps Israelite spies escape from Jericho',
    scripture: 'Joshua 2',
    difficulty: 'medium',
    image: {
      url: 'https://images.unsplash.com/photo-1578165219176-ece04edbd053?q=80&w=1920&auto=format&fit=crop',
      alt: 'Rahab and spies'
    },
    fallbackDescription: 'A woman lowering men with a rope from a city wall.',
    options: [
      'Rahab and the Spies',
      'David Escaping Saul',
      'Paul’s Escape in a Basket',
      'The Gibeonite Deception'
    ],
    correctAnswer: 'Rahab and the Spies',
    devotional: 'God can use anyone who puts their faith in Him.'
  },
  {
    id: 'elisha-bears',
    title: 'Elisha and the Bears',
    description: 'Young men mock Elisha and face consequences',
    scripture: '2 Kings 2:23-25',
    difficulty: 'medium',
    image: {
      url: 'https://images.unsplash.com/photo-1578165219176-ece04edbd053?q=80&w=1920&auto=format&fit=crop',
      alt: 'Elisha and bears'
    },
    fallbackDescription: 'A prophet being mocked by young men, with bears nearby.',
    options: [
      'Elisha and the Bears',
      'Daniel in the Lions’ Den',
      'Samson and the Lion',
      'David and the Bear'
    ],
    correctAnswer: 'Elisha and the Bears',
    devotional: 'Respect for God’s servants is important.'
  },
  // Continue with more medium stories...

  // HARD STORIES (50)
  {
    id: 'melchizedek',
    title: 'Melchizedek Blesses Abraham',
    description: 'A mysterious priest-king blesses Abraham after battle',
    scripture: 'Genesis 14:17-20',
    difficulty: 'hard',
    image: {
      url: 'https://images.unsplash.com/photo-1533000971552-6a962ff0b9f9?q=80&w=1920&auto=format&fit=crop',
      alt: 'Melchizedek'
    },
    fallbackDescription: 'A man, Melchizedek, blessing Abraham after a battle.',
    options: [
      'Melchizedek Blesses Abraham',
      'Aaron Blesses Israel',
      'Samuel Anoints David',
      'Eli Blesses Hannah'
    ],
    correctAnswer: 'Melchizedek Blesses Abraham',
    devotional: 'Christ\'s priesthood is eternal, like Melchizedek\'s.'
  },
  {
    id: 'urim-thummim',
    title: 'The Urim and Thummim',
    description: 'Sacred lots used by the high priest to determine God\'s will',
    scripture: 'Exodus 28:30',
    difficulty: 'hard',
    image: {
      url: 'https://images.unsplash.com/photo-1533000971552-6a962ff0b9f9?q=80&w=1920&auto=format&fit=crop',
      alt: 'Urim and Thummim'
    },
    fallbackDescription: 'Two objects, Urim and Thummim, used by a high priest.',
    options: [
      'The Urim and Thummim',
      'The Ark of the Covenant',
      'The Golden Censer',
      'The Bronze Serpent'
    ],
    correctAnswer: 'The Urim and Thummim',
    devotional: 'God provides ways to know His will and guidance.'
  },
  {
    id: 'jael-sisera',
    title: 'Jael and Sisera',
    description: 'A woman named Jael kills the enemy general Sisera with a tent peg.',
    scripture: 'Judges 4:17-22',
    difficulty: 'hard',
    image: {
      url: 'https://images.unsplash.com/photo-1580136578134-e1a6b34b6100?q=80&w=1920&auto=format&fit=crop',
      alt: 'Jael'
    },
    fallbackDescription: 'A woman, Jael, standing with a tent peg in her hand.',
    options: [
      'Jael and Sisera',
      'Deborah and Barak',
      'David and Goliath',
      'Judith and Holofernes'
    ],
    correctAnswer: 'Jael and Sisera',
    devotional: 'God can use unexpected people to bring victory.'
  },
  {
    id: 'ezekiel-visions',
    title: 'Ezekiel’s Vision of the Dry Bones',
    description: 'Ezekiel sees a valley of dry bones come to life through God’s power.',
    scripture: 'Ezekiel 37:1-14',
    difficulty: 'hard',
    image: {
      url: 'https://images.unsplash.com/photo-1619942867431-f7bc0cbf124c?q=80&w=1920&auto=format&fit=crop',
      alt: 'Ezekiel'
    },
    fallbackDescription: 'Ezekiel standing in a valley with bones.',
    options: [
      'Ezekiel’s Vision of the Dry Bones',
      'Daniel’s Vision of the Four Beasts',
      'John’s Vision of the New Jerusalem',
      'Elijah’s Vision of the Chariots of Fire'
    ],
    correctAnswer: 'Ezekiel’s Vision of the Dry Bones',
    devotional: 'God can bring life to what seems hopeless.'
  },
  {
    id: 'paul-shipwreck',
    title: 'Paul’s Shipwreck',
    description: 'Paul is shipwrecked on the island of Malta but is unharmed.',
    scripture: 'Acts 27',
    difficulty: 'hard',
    image: {
      url: 'https://images.unsplash.com/photo-1545256993-6d5034b6bf22?q=80&w=1920&auto=format&fit=crop',
      alt: 'Paul'
    },
    fallbackDescription: 'A man, Paul, standing on a boat, looking out to sea.',
    options: [
      'Paul’s Shipwreck',
      'Jonah and the Big Fish',
      'Noah and the Flood',
      'Moses Crossing the Red Sea'
    ],
    correctAnswer: 'Paul’s Shipwreck',
    devotional: 'God protects His servants in times of danger.'
  },
  {
    id: 'ehud-eglon',
    title: 'Ehud and King Eglon',
    description: 'A left-handed judge delivers Israel through an unusual strategy',
    scripture: 'Judges 3:12-30',
    difficulty: 'hard',
    image: {
      url: 'https://images.unsplash.com/photo-1578165219176-ece04edbd053?q=80&w=1920&auto=format&fit=crop',
      alt: 'Ehud and Eglon'
    },
    fallbackDescription: 'A man presenting himself before a king with a hidden weapon.',
    options: [
      'Ehud and King Eglon',
      'Samson and the Philistines',
      'Gideon’s Battle',
      'David and Saul'
    ],
    correctAnswer: 'Ehud and King Eglon',
    devotional: 'God can use our unique characteristics for His purpose.'
  },
  {
    id: 'uzza-ark',
    title: 'Uzza and the Ark',
    description: 'A man touches the Ark of the Covenant with severe consequences',
    scripture: '2 Samuel 6:1-7',
    difficulty: 'hard',
    image: {
      url: 'https://images.unsplash.com/photo-1578165219176-ece04edbd053?q=80&w=1920&auto=format&fit=crop',
      alt: 'Uzza and Ark'
    },
    fallbackDescription: 'A man reaching out to steady the Ark on a cart.',
    options: [
      'Uzza and the Ark',
      'The Ark in Dagon’s Temple',
      'Moving the Tabernacle',
      'The Temple Dedication'
    ],
    correctAnswer: 'Uzza and the Ark',
    devotional: 'God’s holiness demands proper reverence and obedience.'
  }
  // Continue with more hard stories...
];

// Helper function to get stories by difficulty
export const getStoriesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): BibleStory[] => {
  return BIBLE_STORIES.filter(story => story.difficulty === difficulty);
};

// Helper function to get random stories
export const getRandomStories = (count: number, difficulty?: 'easy' | 'medium' | 'hard'): BibleStory[] => {
  console.log("difficulty level",difficulty)
  const availableStories = difficulty ? getStoriesByDifficulty(difficulty) : BIBLE_STORIES;
  const shuffled = [...availableStories].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
