export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
  author: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: 'The Art of Olfactory Storytelling',
    excerpt: 'Every fragrance tells a story. Learn how our master perfumers compose scents that evoke emotion, memory, and desire.',
    content: `Perfumery is often called the most intimate of arts. Unlike a painting that hangs on a wall or a melody that fills a room, a fragrance is worn on the skin — it becomes part of the wearer's identity, their invisible signature.

At SMAR'S, we approach each composition as a narrative. Every note is a character, every accord is a scene, and the dry-down is the resolution. Our perfumers spend months — sometimes years — crafting these olfactory stories, ensuring that each transition is seamless and each emotion is authentic.

The opening notes set the stage. A burst of bergamot might evoke a sun-drenched morning in Calabria, while a dash of black pepper introduces an element of intrigue. These top notes are the first impression, but they are only the beginning.

As the fragrance settles, the heart notes emerge. This is where the story deepens. Jasmine from Grasse unfolds its narcotic sweetness. Oud from Cambodia reveals its smoky complexity. These middle notes are the soul of the composition, and they must resonate with the wearer for hours.

Finally, the base notes — the foundation. Amber, musk, sandalwood — these are the notes that linger on skin and clothing long after the wearer has left the room. They are the memories that remain.

This is the art of olfactory storytelling: crafting a journey that unfolds over time, that changes with the wearer's chemistry, that becomes uniquely theirs.`,
    category: 'Craft',
    date: 'June 2026',
    image: 'https://images.pexels.com/photos/27274783/pexels-photo-27274783.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 2,
    title: 'The Perfumer\u2019s Nose: A Rare Gift',
    excerpt: 'Behind every great fragrance is a perfumer with an extraordinary sense of smell. Discover what it takes to become a nose.',
    content: `The term "nose" refers to a master perfumer — someone with the rare ability to identify and compose thousands of individual scent notes. It is estimated that a trained nose can distinguish between 3,000 and 10,000 distinct aromas.

But the journey to becoming a nose begins early. Most master perfumers show an extraordinary sensitivity to scent from childhood. They notice the difference between rain on hot asphalt and rain on cold stone. They can detect the subtle shift in a rose's fragrance from morning to evening.

Training at our atelier in Grasse takes a minimum of seven years. Apprentices begin by learning to identify raw materials — hundreds of essential oils, absolutes, and synthetic molecules. They study the structure of fragrance families: the fresh citrus notes, the floral hearts, the woody bases.

But identification is only half the battle. A true nose must also understand how notes interact — how bergamot lifts jasmine, how oud deepens vanilla, how a trace of pepper can transform an entire composition.

Our master perfumers work in small, quiet rooms lined with thousands of ingredients. They compose with patience, often revisiting a formula dozens of times before achieving the perfect balance. It is this dedication that defines SMAR'S.`,
    category: 'Craft',
    date: 'March 2026',
    image: 'https://images.pexels.com/photos/36355219/pexels-photo-36355219.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '6 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 3,
    title: 'Hand-Filled, Wax-Sealed: The SMAR\'S Ritual',
    excerpt: 'Every bottle of SMAR\'S is filled and sealed by hand in our Grasse studio. Here is why we never automate.',
    content: `In an age of mass production, SMAR'S remains steadfastly artisanal. Every bottle that leaves our atelier has been filled, inspected, and sealed by hand.

The process begins with the glass bottles, which are crafted by master glassblowers in Murano, Italy. Each bottle is hand-blown and inspected for clarity and weight. Only those that meet our exacting standards proceed to the next stage.

Filling is done by hand using precision glass pipettes. Our fillers work slowly and deliberately, ensuring that each bottle receives the exact volume. A single bottle takes approximately three minutes to fill — far longer than an automated line, but the result is a product of unmatched quality.

After filling, each bottle is sealed with our signature wax seal. Using a custom brass stamp, our artisans press deep burgundy wax into the cap, creating a seal that is both beautiful and functional. It is a ritual that connects every bottle to the centuries-old tradition of fine perfumery.

Finally, each bottle is placed in its presentation box, lined with Italian silk paper, and accompanied by a handwritten note from the perfumer who composed it.`,
    category: 'Craft',
    date: 'January 2026',
    image: 'https://images.pexels.com/photos/16722501/pexels-photo-16722501.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '4 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 4,
    title: 'Oud: The Liquid Gold of Perfumery',
    excerpt: 'From the forests of Cambodia to the still rooms of Grasse, discover why oud is the most precious ingredient in our collection.',
    content: `Oud — also known as agarwood — is the most expensive natural ingredient in perfumery. At its finest, it can command prices exceeding $50,000 per kilogram, earning it the nickname "liquid gold."

The story of oud begins in the forests of Southeast Asia. When the Aquilaria tree becomes infected with a specific mold, it produces a dark, fragrant resin as a defense mechanism. This resin-saturated wood is oud — and it takes decades to develop.

Harvesting oud is a patient art. In Cambodia's Pursat province, our sourcing partners wait fifteen years for the resin to reach peak complexity. The wood is then carefully harvested and distilled using traditional methods that have remained unchanged for centuries.

The resulting oil is extraordinary. Oud has a complexity that few other ingredients can match — simultaneously smoky, animalic, sweet, and woody. It has the rare ability to transform an entire composition, adding depth and mystery that lingers for hours.

At SMAR'S, we use oud in its purest form. Our oud extrait is sourced from wild Cambodian Aquilaria, distilled in copper alembics, and aged for three years before it enters a bottle. This is oud as nature intended — uncompromised, undiluted, unforgettable.`,
    category: 'Ingredients',
    date: 'May 2026',
    image: 'https://images.pexels.com/photos/34089129/pexels-photo-34089129.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '7 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 5,
    title: 'Rose de Mai: A Harvest Like No Other',
    excerpt: 'Every May, the fields of Grasse transform into a sea of pink. Follow the journey from petal to perfume.',
    content: `In the hills above Grasse, France, something extraordinary happens every May. The Rose de Mai — Rosa centifolia — blooms for just three to four weeks, transforming the landscape into a sea of pink.

The Rose de Mai is the most prized rose in perfumery. Its fragrance is richer, more complex, and more honeyed than any other variety. It takes approximately 60,000 roses to produce a single gram of absolute — making it one of the most concentrated and precious materials in our collection.

Harvesting begins before dawn, when the essential oils in the petals are at their peak. Teams of pickers work quickly but gently, hand-selecting only the most perfect blooms. By mid-morning, the harvest is complete — the heat of the sun would begin to evaporate the delicate oils.

The petals are transported immediately to the distillery, where they undergo two separate processes. First, steam distillation produces rose otto — a clear, liquid oil with a fresh, green character. Then, solvent extraction yields rose absolute — a deeper, more opulent material with rich, honeyed undertones.

Both materials are essential to SMAR'S compositions. Our Crystal Rose uses rose absolute for its heart, while our lighter compositions employ otto for its freshness.`,
    category: 'Ingredients',
    date: 'April 2026',
    image: 'https://images.pexels.com/photos/4735908/pexels-photo-4735908.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '6 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 6,
    title: 'Bergamot: The Sunshine of Calabria',
    excerpt: 'The brightest note in our collection comes from a small citrus fruit grown on the coast of southern Italy.',
    content: `Bergamot is the backbone of fine perfumery — the note that lifts, brightens, and brings clarity to any composition. And the finest bergamot in the world comes from the narrow coastal strip of Calabria, Italy.

Bergamot is a small, green-gold citrus fruit, roughly the size of an orange. Its rind contains an essential oil of extraordinary complexity — simultaneously citrusy, floral, peppery, and slightly sweet. It is this complexity that makes bergamot so valuable to perfumers.

Harvesting bergamot is a seasonal ritual. From November to February, farmers hand-pick the fruit using a specialized cutting technique that preserves the oil-rich rind. Each fruit is cut in a single motion, and the rind is cold-pressed within hours to capture the oil at its freshest.

The resulting essential oil is then aged for six months before it enters our collection. This aging process allows the oil's sharper edges to soften, revealing a rounder, more harmonious character.

At SMAR'S, we use bergamot as the opening note in nearly every composition. Its ability to create instant freshness and luminosity makes it indispensable — the first word in every olfactory sentence we write.`,
    category: 'Ingredients',
    date: 'February 2026',
    image: 'https://images.pexels.com/photos/264819/pexels-photo-264819.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 7,
    title: 'Why Niche Perfumery Matters',
    excerpt: 'In a world of mass production, we choose craft over compromise. Here is why niche fragrances are worth the investment.',
    content: `The perfume industry is divided into two worlds: mass-market and niche. While mass-market brands produce millions of bottles using cost-efficient ingredients, niche houses like SMAR'S take a fundamentally different approach.

Niche perfumery is about purity of vision. Where a mass-market brand might compromise on ingredients to hit a price point, a niche house uses the finest materials available — regardless of cost. Our Oud Royale contains genuine Cambodian oud oil at a concentration that would be unthinkable in a mass-market product.

But niche is also about artistic freedom. Our perfumers are not constrained by focus groups or trend reports. They compose according to their own vision, creating fragrances that challenge, provoke, and inspire. The result is a collection that is cohesive in quality but wildly diverse in character.

There is also the matter of intimacy. A mass-market fragrance might be recognized by millions. A niche fragrance is discovered by the few who appreciate its complexity. It becomes a personal signature, a conversation starter, a mark of individual taste.

At SMAR'S, we believe that perfume should be an art form, not a commodity. Every bottle we produce is a testament to that belief.`,
    category: 'Philosophy',
    date: 'April 2026',
    image: 'https://images.pexels.com/photos/21008941/pexels-photo-21008941.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '4 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 8,
    title: 'The Paradox of Restraint',
    excerpt: 'In perfumery, what you leave out matters as much as what you put in. Our philosophy of olfactory minimalism.',
    content: `The greatest perfumes share a common quality: restraint. It is a paradox — to create something truly luxurious, you must know what to leave out.

Consider a symphony orchestra. The most powerful moments are often the quietest — a single violin, a held note, a breath of silence. The same principle applies to perfumery. A composition with twenty notes is not necessarily better than one with five. What matters is how each note is chosen, how it relates to the others, and how it evolves over time.

At SMAR'S, we practice what we call "olfactory minimalism." Our perfumers work within strict constraints — limiting each composition to the fewest possible notes. This forces them to find the essence of each ingredient, to distill it to its most expressive form.

The result is a collection of fragrances that are simultaneously simple and complex. On the surface, they appear effortless — a clean bergamot, a rich oud, a warm amber. But beneath that simplicity lies a depth that reveals itself over hours on the skin.

This is the paradox of restraint: by saying less, we say more.`,
    category: 'Philosophy',
    date: 'February 2026',
    image: 'https://images.pexels.com/photos/32816851/pexels-photo-32816851.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 9,
    title: 'The SMAR\'S Approach to Sustainability',
    excerpt: 'Luxury and responsibility are not opposites. How we source, produce, and package with the planet in mind.',
    content: `At SMAR'S, we believe that true luxury must be sustainable. The ingredients we use are gifts from nature, and we have a responsibility to ensure that future generations can enjoy them too.

Our approach begins with sourcing. We work directly with farmers and distillers who share our commitment to ethical practices. Our bergamot comes from family-run groves in Calabria that have been cultivated for five generations. Our oud is harvested from sustainably managed forests in Cambodia, where new trees are planted for every one that is felled.

In our atelier, we minimize waste at every stage. Our glass bottles are made from 100% recycled glass. Our packaging uses FSC-certified paper and vegetable-based inks. Even our wax seals are made from natural beeswax, sourced from local apiaries in Provence.

We are also committed to transparency. Every SMAR'S bottle includes a complete list of ingredients and their sources. We believe that our customers deserve to know exactly what they are putting on their skin — and where it comes from.

Luxury, at its finest, is not about excess. It is about intention. And at SMAR'S, every intention is guided by respect for the natural world.`,
    category: 'Philosophy',
    date: 'December 2025',
    image: 'https://images.pexels.com/photos/12053222/pexels-photo-12053222.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 10,
    title: 'Layering Scents: A Complete Guide',
    excerpt: 'Master the art of fragrance layering to create a signature that is uniquely yours. Our expert tips inside.',
    content: `Fragrance layering is the art of combining two or more scents to create a unique, personalized aroma. At SMAR'S, we design our collection with layering in mind — each fragrance is crafted to complement the others.

The basic principle is simple: start with a lighter scent and build toward heavier ones. A citrus-forward fragrance like our Bergamot can serve as a bright base, while a richer composition like Oud adds depth and complexity.

Here are some of our favorite combinations:

Amber + Rose: The warmth of amber meets the romance of rose. A classic combination that works beautifully in evening settings.

Oud + Bless: The darkness of oud is lifted by the pristine gardenia of Bless, creating a tension between shadow and light.

Notorious + Velvet: A bold pairing for those who want to make a statement. The intensity of Notorious is softened by the creamy tuberose of Velvet.

The key to successful layering is subtlety. Apply the lighter scent first, wait a few minutes for it to settle, then add the heavier scent. Start with less than you think you need — you can always add more.

Layering transforms your fragrance wardrobe from a collection of individual scents into a palette of infinite possibilities.`,
    category: 'Rituals',
    date: 'March 2026',
    image: 'https://images.pexels.com/photos/11711808/pexels-photo-11711808.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 11,
    title: 'The Art of Application',
    excerpt: 'Where you apply your fragrance matters as much as what you apply. Master the technique for maximum impact.',
    content: `Fragrance application is an art that is often overlooked. Where and how you apply your perfume can dramatically affect its performance — its longevity, its projection, and its character.

The key principle is simple: apply to pulse points. These are the areas where blood vessels are closest to the skin's surface, generating warmth that helps diffuse the fragrance. The most effective pulse points are the wrists, the neck, the chest, and behind the ears.

But there are subtleties. Applying to the wrists is the most common technique, but avoid rubbing them together — the friction breaks down the fragrance molecules and can alter the scent. Instead, press gently and let the perfume dry naturally.

For maximum longevity, apply to clothing as well as skin. The fibers of natural fabrics — cotton, silk, wool — hold fragrance beautifully and release it slowly throughout the day. A light mist on a scarf or lapel can extend your fragrance by hours.

Temperature matters too. In warm weather, fragrance projects more aggressively, so use less. In cold weather, fragrance sits closer to the skin, so a slightly heavier application is appropriate.

The SMAR'S ritual: Apply in the morning to clean, moisturized skin. Allow the fragrance to develop for thirty minutes before assessing its character. Reapply lightly in the evening if desired.`,
    category: 'Rituals',
    date: 'January 2026',
    image: 'https://images.pexels.com/photos/7703038/pexels-photo-7703038.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '6 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 12,
    title: 'Building a Fragrance Wardrobe',
    excerpt: 'Just as you curate your clothing, your fragrance collection should reflect the different facets of your personality.',
    content: `A single fragrance is like owning one suit — it might be excellent, but it cannot serve every occasion. True fragrance connoisseurs build wardrobes — collections that adapt to mood, season, and setting.

We recommend three essential categories:

Everyday: A clean, versatile scent that works in any setting. Our Musk is ideal — a modern, skin-like fragrance that is present without being overpowering.

Evening: A richer, more dramatic composition for nights out and special occasions. Oud or Notorious — both make a powerful impression.

Signature: The fragrance that defines you. This is the one you reach for most often, the one that becomes associated with your identity. It might be Amber, Rose, or Shaheer — whatever resonates most deeply with your personal aesthetic.

Seasonal considerations also matter. Lighter, citrus-forward fragrances work beautifully in spring and summer. Richer, warmer compositions — oud, amber, vanilla — come into their own in autumn and winter.

The goal is not to own dozens of bottles, but to own the right ones. A well-curated wardrobe of three to five fragrances will serve you better than a shelf of twenty mediocre ones.`,
    category: 'Rituals',
    date: 'November 2025',
    image: 'https://images.pexels.com/photos/10924522/pexels-photo-10924522.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 13,
    title: 'The SMAR\'S Atelier: Where Time Stands Still',
    excerpt: 'Step inside our studio in Grasse, where master perfumers work in quiet contemplation to compose our most iconic fragrances.',
    content: `Our atelier sits in a converted 18th-century stone building in the heart of Grasse — the world capital of perfumery. Inside, time moves differently.

The studio is deliberately simple. Whitewashed walls, natural light, wooden workbenches lined with hundreds of glass bottles. Each bottle contains a single ingredient — an essential oil, an absolute, a synthetic molecule. Together, they form our palette.

Our perfumers work alone, in small private rooms. There are no distractions, no interruptions. The only sounds are the clink of glass and the scratching of formula notes. This solitude is essential — composing a fragrance requires a depth of focus that cannot be achieved in a busy open-plan office.

The creative process varies. Some compositions begin with a single ingredient — a beautiful oud, a perfect rose — and build outward. Others start with an emotion or a memory that the perfumer seeks to capture in scent.

There are no deadlines in the traditional sense. A composition is finished when the perfumer says it is finished — and not before. Some fragrances are composed in weeks. Others take years. Our most recent signature composition, Amber, was in development for three years before we deemed it ready.

This is the SMAR'S way: patience, precision, and an uncompromising commitment to excellence.`,
    category: 'Behind the Scenes',
    date: 'January 2026',
    image: 'https://images.pexels.com/photos/36389336/pexels-photo-36389336.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '8 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 14,
    title: 'From Grasse to the World',
    excerpt: 'How a small atelier in southern France creates fragrances that are worn by connoisseurs across the globe.',
    content: `Grasse is a small town on the French Riviera, population 20,000. But in the world of perfumery, it is the center of the universe.

The town's perfume heritage dates to the 17th century, when local tanneries discovered that certain flower oils could mask the smell of leather. Over the centuries, Grasse became the undisputed capital of fine perfumery, home to the world's most prestigious fragrance houses.

SMAR'S was founded in Grasse in 2024, with a clear mission: to honor the town's heritage while pushing the boundaries of contemporary perfumery. Our founders believed that the traditional methods of Grasse — hand-harvesting, copper alembic distillation, artisanal blending — were not relics of the past, but the foundation of the future.

Today, our fragrances are sold in twelve countries, from boutique perfume shops in Paris to luxury department stores in Tokyo. But every bottle is still filled and sealed in our Grasse atelier, by the same hands that have been doing this work for decades.

The journey from Grasse to the world is a long one — but it begins with a single drop of perfume, composed with care, in a quiet room above the rooftops of southern France.`,
    category: 'Behind the Scenes',
    date: 'December 2025',
    image: 'https://images.pexels.com/photos/31188628/pexels-photo-31188628.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '6 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 15,
    title: 'Quality Control: Our Final Inspection',
    excerpt: 'Before a single bottle leaves our atelier, it undergoes a rigorous 12-point inspection. Here is what we check.',
    content: `Quality is not negotiable at SMAR'S. Every bottle that bears our name must pass a 12-point inspection before it is released.

The process begins with the glass. Each bottle is examined for clarity, weight, and structural integrity. Any bottle with bubbles, scratches, or uneven walls is rejected.

Next, the fill level is verified. Using precision instruments, our quality team confirms that each bottle contains the exact volume stated on the label — to within 0.5 milliliters.

The spray mechanism is tested next. Each atomizer is fired three times to ensure consistent spray pattern and volume. A faulty atomizer is the fastest way to ruin a luxury experience.

The cap is inspected for fit and finish. It must sit flush with the bottle, with no gaps or wobble. The wax seal is examined for completeness and adhesion.

The fragrance itself is tested for color, clarity, and — of course — scent. Our team compares each batch against the approved reference sample, ensuring absolute consistency.

Finally, the packaging is inspected. The box, the silk paper, the handwritten note — every element must be perfect.

Only when all twelve checkpoints have been passed is the bottle approved for shipping. It is a rigorous process, but it is the only way to ensure that every SMAR'S experience begins with perfection.`,
    category: 'Behind the Scenes',
    date: 'October 2025',
    image: 'https://images.pexels.com/photos/15097440/pexels-photo-15097440.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 16,
    title: 'The Chemistry of Sillage',
    excerpt: 'What makes a fragrance linger in a room long after you have left? The science behind sillage and skin chemistry.',
    content: `Sillage — the French word for "wake" — describes the trail of fragrance that lingers in the air as you move. It is one of the most sought-after qualities in perfumery, yet it remains one of the most elusive.

The chemistry of sillage begins with molecular weight. Heavier molecules — those with higher molecular weights — evaporate more slowly and therefore last longer on the skin. These are typically the base notes: amber, musk, vanillin, and the various woods. Lighter molecules — citrus, green notes, aldehydes — evaporate quickly, creating the initial burst that fades within minutes.

But sillage is not just about the fragrance itself. It depends equally on the wearer's skin chemistry. pH levels, oil content, and even diet can dramatically affect how a fragrance performs. People with oilier skin tend to hold fragrance longer because the oils trap the volatile molecules. Dry skin, by contrast, allows fragrance to evaporate more quickly — which is why we often recommend moisturizing before application.

Temperature plays a role too. Warm skin accelerates evaporation, which can actually increase sillage in the short term — the fragrance projects more aggressively — but reduces longevity. Cool skin slows evaporation, creating a subtler, more intimate scent experience.

At SMAR'S, we formulate our fragrances to perform beautifully across a wide range of skin types. Our higher concentration extraits — with 25-30% perfume oil — naturally produce richer sillage and longer longevity than our eau de parfums. But regardless of concentration, every SMAR'S composition is designed to leave a memorable trail.`,
    category: 'Craft',
    date: 'July 2026',
    image: 'https://images.pexels.com/photos/3060888/pexels-photo-3060888.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '6 min read',
    author: 'Maison SMAR\'S',
  },
  {
    id: 17,
    title: 'Saffron: The Red Gold of Perfumery',
    excerpt: 'More expensive than gold by weight, saffron lends an unparalleled warmth and complexity to our most luxurious compositions.',
    content: `Saffron is the most expensive spice in the world — and one of the most precious ingredients in fine perfumery. Derived from the dried stigmas of Crocus sativus, it takes approximately 150,000 flowers to produce a single kilogram of saffron.

The harvesting process is extraordinarily labor-intensive. Each crocus flower blooms for only one week in autumn, and the three delicate red stigmas must be hand-picked before dawn, before the sun causes them to wilt. A skilled picker can harvest only 60-80 grams of saffron per day.

In perfumery, saffron is valued for its unique olfactory profile: simultaneously sweet, honeyed, leathery, and slightly metallic. It has the rare ability to add both warmth and brightness to a composition — a quality that few other ingredients possess.

Our saffron is sourced from the Taliouine region of Morocco, where the soil and microclimate produce a particularly nuanced expression of the spice. The stigmas are dried naturally in the shade for ten days before being shipped to our atelier in Grasse.

When used in a fragrance, saffron creates a sensation of warmth that is almost tactile — like a ray of autumn sunlight on the skin. It pairs beautifully with oud, adding a luminous quality to the wood's darkness. It also complements rose, where its honeyed undertones amplify the flower's natural sweetness.

Saffron is the signature ingredient in our Notorious composition, where it appears alongside black pepper and Cambodian oud to create a fragrance of extraordinary depth and character.`,
    category: 'Ingredients',
    date: 'July 2026',
    image: 'https://images.pexels.com/photos/4197442/pexels-photo-4197442.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '6 min read',
    author: 'Maison SMAR\'S',
  },
];

export const categories = ['All', 'Craft', 'Ingredients', 'Philosophy', 'Rituals', 'Behind the Scenes'];
