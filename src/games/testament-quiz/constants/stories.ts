import type { BibleStory } from '../types';

export const BIBLE_STORIES: BibleStory[] = [
  // Old Testament Stories
  {
    id: 'creation',
    title: 'Creation of the World',
    description: 'God creates the universe and everything in it over six days',
    testament: 'old',
    scripture: 'Genesis 1-2'
  },
  {
    id: 'exodus',
    title: 'The Exodus from Egypt',
    description: 'Moses leads the Israelites out of slavery in Egypt',
    testament: 'old',
    scripture: 'Exodus 12-14'
  },
  {
    id: 'david-goliath',
    title: 'David and Goliath',
    description: 'A young shepherd defeats a mighty warrior with faith and a sling',
    testament: 'old',
    scripture: '1 Samuel 17'
  },
  {
    id: 'daniel-lions',
    title: 'Daniel in the Lions\' Den',
    description: 'Daniel is thrown into a den of lions but God protects him',
    testament: 'old',
    scripture: 'Daniel 6'
  },
  {
    id: 'noah-ark',
    title: 'Noah\'s Ark',
    description: 'God instructs Noah to build an ark to save creation from a flood',
    testament: 'old',
    scripture: 'Genesis 6-9'
  },
  {
    id: 'burning-bush',
    title: 'The Burning Bush',
    description: 'God appears to Moses in a bush that burns but is not consumed',
    testament: 'old',
    scripture: 'Exodus 3'
  },
  // New Testament Stories
  {
    id: 'nativity',
    title: 'Birth of Jesus',
    description: 'Jesus is born in Bethlehem to Mary and Joseph',
    testament: 'new',
    scripture: 'Luke 2:1-20'
  },
  {
    id: 'crucifixion',
    title: 'The Crucifixion',
    description: 'Jesus is crucified at Calvary',
    testament: 'new',
    scripture: 'Matthew 27:32-56'
  },
  {
    id: 'resurrection',
    title: 'The Resurrection',
    description: 'Jesus rises from the dead on the third day',
    testament: 'new',
    scripture: 'Matthew 28:1-10'
  },
  {
    id: 'pentecost',
    title: 'Day of Pentecost',
    description: 'The Holy Spirit descends upon the disciples',
    testament: 'new',
    scripture: 'Acts 2'
  },
  {
    id: 'paul-conversion',
    title: 'Paul\'s Conversion',
    description: 'Saul encounters Jesus on the road to Damascus',
    testament: 'new',
    scripture: 'Acts 9'
  },
  {
    id: 'feeding-5000',
    title: 'Feeding the Five Thousand',
    description: 'Jesus multiplies five loaves and two fish to feed a multitude',
    testament: 'new',
    scripture: 'Matthew 14:13-21'
  }
];