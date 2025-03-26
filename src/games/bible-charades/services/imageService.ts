// ... existing imports ...

const STORY_DESCRIPTIONS: Record<string, string> = {
  'david-goliath': `
    A dramatic confrontation unfolds in a vast valley. A young shepherd boy, 
    armed with only a sling and five smooth stones, faces an imposing warrior 
    who towers above all others. The giant's armor gleams in the sunlight, his 
    weapons meant to instill fear. Yet the young boy stands confident, his faith 
    unwavering as he prepares to defend his people and honor his God.
  `,
  'noahs-ark': `
    An enormous wooden vessel takes shape against a darkening sky. Animals of 
    every kind approach in pairs - from mighty elephants to tiny doves. Workers 
    hurry to complete their task as storm clouds gather ominously overhead. A 
    elderly man directs the work with purpose, following divine instructions 
    with precise care, while onlookers scoff at the seemingly foolish endeavor.
  `,
  'daniel-lions': `
    In the depths of a dimly lit den, a serene figure sits surrounded by powerful 
    beasts. Great lions, normally fierce predators, lay docile and peaceful. 
    Divine light seems to illuminate the scene, as the man's unwavering faith 
    and trust in God creates an inexplicable calm in what should be a place 
    of certain death. The stone seal above remains unmoved, while witnesses 
    wait anxiously for morning.
  `,
  'moses-red-sea': `
    A vast multitude stands before an impossible barrier of water. Their leader, 
    staff raised high, commands the sea itself with divine authority. Walls of 
    water begin to rise on either side, revealing a path where none existed before. 
    Behind them, the dust of an approaching army creates urgency as people begin 
    their miraculous crossing on suddenly dry ground.
  `,
  'jesus-feeding': `
    A vast crowd spreads across a hillside, thousands strong. At their center, 
    a teacher takes five small loaves and two fish from a boy's lunch. With eyes 
    raised to heaven in thanksgiving, he begins to break the bread. As the food 
    passes through the disciples' hands to the people, it multiplies miraculously, 
    ensuring none will go hungry. Amazement spreads through the crowd as baskets 
    of leftovers begin to accumulate.
  `
};

export class ImageService {
  generateFallbackDescription(storyId: string): string {
    // Return specific description if available
    if (STORY_DESCRIPTIONS[storyId]) {
      return STORY_DESCRIPTIONS[storyId].trim();
    }

    // Generate a dynamic description based on the story ID
    const storyName = storyId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    return `
      A powerful scene from the story of ${storyName} unfolds before you. 
      The atmosphere is charged with divine purpose, as witnesses gather to observe 
      what will become a testament to faith and God's power. Every detail of this 
      moment carries significance, as ancient scripture comes to life through this 
      pivotal event in biblical history.
    `.trim();
  }

  // ... rest of the class implementation remains the same ...
}

export const imageService = new ImageService();