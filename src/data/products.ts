export interface Product {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: Review[];
  images: string[];
  category: string;
  collection: string;
  fragranceNotes: string[];
  ingredients: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

const img = {
  amber: 'https://images.pexels.com/photos/36389336/pexels-photo-36389336.jpeg?auto=compress&cs=tinysrgb&w=800',
  rose: 'https://images.pexels.com/photos/31188628/pexels-photo-31188628.jpeg?auto=compress&cs=tinysrgb&w=800',
  oud: 'https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg?auto=compress&cs=tinysrgb&w=800',
  notorious: 'https://images.pexels.com/photos/7702669/pexels-photo-7702669.jpeg?auto=compress&cs=tinysrgb&w=800',
  janan: 'https://images.pexels.com/photos/21574949/pexels-photo-21574949.jpeg?auto=compress&cs=tinysrgb&w=800',
  shaheer: 'https://images.pexels.com/photos/13284500/pexels-photo-13284500.jpeg?auto=compress&cs=tinysrgb&w=800',
  bless: 'https://images.pexels.com/photos/15097440/pexels-photo-15097440.jpeg?auto=compress&cs=tinysrgb&w=800',
  blissful: 'https://images.pexels.com/photos/8624586/pexels-photo-8624586.jpeg?auto=compress&cs=tinysrgb&w=800',
  lifestyle: 'https://images.pexels.com/photos/32817141/pexels-photo-32817141.jpeg?auto=compress&cs=tinysrgb&w=800',
};

export const products: Product[] = [
  {
    id: 1,
    name: "Amber",
    description: "A captivating blend of dark woods, amber, and rare spices. This signature fragrance opens with bergamot and black pepper, unfolds into a heart of saffron and rose, and settles into a base of oud, leather, and vanilla. A scent for those who command attention.",
    shortDescription: "Dark woods, amber, and rare spices",
    price: 295,
    originalPrice: 345,
    rating: 4.9,
    reviews: [
      { id: 1, name: "Sophia L.", rating: 5, date: "2026-06-15", comment: "Absolutely divine. Lasts all day and receives compliments everywhere." },
      { id: 2, name: "James R.", rating: 5, date: "2026-05-28", comment: "The most sophisticated scent I've ever worn. Worth every penny." },
      { id: 3, name: "Amara K.", rating: 4.5, date: "2026-05-10", comment: "Beautiful depth and complexity. The oud note is perfectly balanced." },
    ],
    images: [img.amber, img.notorious, img.shaheer],
    category: "Eau de Parfum",
    collection: "Signature",
    fragranceNotes: ["Bergamot", "Black Pepper", "Saffron", "Rose", "Oud", "Leather", "Vanilla", "Amber"],
    ingredients: ["Alcohol Denat.", "Parfum (Fragrance)", "Aqua (Water)", "Limonene", "Linalool", "Coumarin", "Citral"],
    isBestSeller: true,
  },
  {
    id: 2,
    name: "Rose",
    description: "An enchanting floral symphony that captures the magic of midnight blossoms. Top notes of pear and white freesia give way to a heart of jasmine and tuberose, resting on a base of sandalwood and musk.",
    shortDescription: "Midnight blossoms and white florals",
    price: 265,
    rating: 4.8,
    reviews: [
      { id: 4, name: "Olivia M.", rating: 5, date: "2026-06-20", comment: "This is my signature scent now. So elegant and feminine." },
      { id: 5, name: "Emma W.", rating: 4.5, date: "2026-06-01", comment: "Beautiful floral that isn't overpowering. Sophisticated." },
    ],
    images: [img.rose, img.blissful],
    category: "Eau de Parfum",
    collection: "Floral",
    fragranceNotes: ["Pear", "White Freesia", "Jasmine", "Tuberose", "Sandalwood", "Musk"],
    ingredients: ["Alcohol Denat.", "Parfum (Fragrance)", "Aqua (Water)", "Benzyl Salicylate", "Hydroxycitronellal", "Citronellol"],
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Oud",
    description: "A masterful interpretation of rare Cambodian oud blended with smoky birch and rich labdanum. This opulent fragrance is a statement of unparalleled refinement and luxury.",
    shortDescription: "Rare Cambodian oud and smoky birch",
    price: 420,
    rating: 5.0,
    reviews: [
      { id: 6, name: "Marcus D.", rating: 5, date: "2026-06-18", comment: "The finest oud fragrance I've encountered. Truly royal." },
      { id: 7, name: "Liam S.", rating: 5, date: "2026-05-30", comment: "Incredible longevity and projection. A masterpiece." },
    ],
    images: [img.oud, img.amber],
    category: "Extrait de Parfum",
    collection: "Oud",
    fragranceNotes: ["Cambodian Oud", "Birch", "Labdanum", "Frankincense", "Patchouli", "Musk"],
    ingredients: ["Alcohol Denat.", "Parfum (Fragrance)", "Aqua (Water)", "Oud Oil", "Birch Tar", "Labdanum Absolute"],
    isBestSeller: true,
  },
  {
    id: 4,
    name: "Janan",
    description: "A luminous rose fragrance that sparkles like cut glass. Fresh pink pepper and lychee introduce a heart of Damask rose and peony, with a warm ambrette and cashmere wood base.",
    shortDescription: "Sparkling rose with pink pepper",
    price: 285,
    rating: 4.7,
    reviews: [
      { id: 8, name: "Isabella N.", rating: 5, date: "2026-06-12", comment: "So beautiful and unique. The lychee note is perfection." },
    ],
    images: [img.janan, img.rose],
    category: "Eau de Parfum",
    collection: "Signature",
    fragranceNotes: ["Pink Pepper", "Lychee", "Damask Rose", "Peony", "Ambrette", "Cashmere Wood"],
    ingredients: ["Alcohol Denat.", "Parfum (Fragrance)", "Aqua (Water)", "Citronellol", "Geraniol", "Eugenol"],
    isNew: true,
  },
  {
    id: 5,
    name: "Shaheer",
    description: "A warm embrace of golden amber and dark oud. This sensual fragrance weaves together honeyed tobacco, vanilla absolute, and a whisper of saffron for an unforgettable trail.",
    shortDescription: "Golden amber and dark oud",
    price: 380,
    rating: 4.9,
    reviews: [
      { id: 9, name: "Nathan P.", rating: 5, date: "2026-06-08", comment: "Rich, warm, and incredibly alluring. Gets compliments every time." },
    ],
    images: [img.shaheer, img.notorious],
    category: "Extrait de Parfum",
    collection: "Oud",
    fragranceNotes: ["Amber", "Oud", "Tobacco", "Vanilla", "Saffron", "Honey"],
    ingredients: ["Alcohol Denat.", "Parfum (Fragrance)", "Aqua (Water)", "Amber Extract", "Vanilla Absolute"],
    isNew: true,
  },
  {
    id: 6,
    name: "Bless",
    description: "A pristine gardenia soliflore with modern elegance. Dewy green notes open to a lush gardenia heart, while creamy sandalwood and white musk provide an ethereal finish.",
    shortDescription: "Pristine gardenia with white musk",
    price: 245,
    rating: 4.6,
    reviews: [
      { id: 10, name: "Charlotte B.", rating: 4.5, date: "2026-05-20", comment: "Like a garden in full bloom. So fresh and elegant." },
    ],
    images: [img.bless, img.blissful],
    category: "Eau de Parfum",
    collection: "Floral",
    fragranceNotes: ["Dewy Greens", "Gardenia", "Sandalwood", "White Musk", "Coconut Water"],
    ingredients: ["Alcohol Denat.", "Parfum (Fragrance)", "Aqua (Water)", "Gardenia Extract", "Benzyl Alcohol"],
  },
  {
    id: 7,
    name: "Notorious",
    description: "An intense dark fragrance for evening sophistication. Black truffle, dark chocolate, and incense create a mysterious opening that evolves into a heart of rose absolute and patchouli.",
    shortDescription: "Dark chocolate, incense, and rose",
    price: 450,
    rating: 4.9,
    reviews: [
      { id: 11, name: "Alexander H.", rating: 5, date: "2026-06-22", comment: "Dark, mysterious, and absolutely captivating. A nighttime essential." },
    ],
    images: [img.notorious, img.oud],
    category: "Extrait de Parfum",
    collection: "Oud",
    fragranceNotes: ["Black Truffle", "Dark Chocolate", "Incense", "Rose Absolute", "Patchouli", "Leather"],
    ingredients: ["Alcohol Denat.", "Parfum (Fragrance)", "Aqua (Water)", "Oud Oil", "Rose Absolute", "Incense Resinoid"],
    isNew: true,
    isBestSeller: true,
  },
  {
    id: 8,
    name: "Blissful",
    description: "A limited edition celebration of sun-drenched days. Mediterranean citrus and sea salt mingle with fig leaf and coconut water, drying down to a warm driftwood and amber base.",
    shortDescription: "Mediterranean citrus and sea salt",
    price: 195,
    rating: 4.5,
    reviews: [
      { id: 12, name: "Zoe T.", rating: 4.5, date: "2026-06-05", comment: "Perfect summer scent. Light, fresh, and sophisticated." },
    ],
    images: [img.blissful, img.bless],
    category: "Eau de Toilette",
    collection: "Limited Edition",
    fragranceNotes: ["Bergamot", "Sea Salt", "Fig Leaf", "Coconut Water", "Driftwood", "Amber"],
    ingredients: ["Alcohol Denat.", "Parfum (Fragrance)", "Aqua (Water)", "Sea Salt Extract", "Coconut Water"],
    isNew: true,
  },
  {
    id: 9,
    name: "Velvet",
    description: "A sumptuous tuberose fragrance draped in velvet. Creamy tuberose and orange blossom are entwined with warm cinnamon, benzoin, and a trace of exotic ylang-ylang.",
    shortDescription: "Creamy tuberose and warm cinnamon",
    price: 310,
    rating: 4.8,
    reviews: [
      { id: 13, name: "Grace F.", rating: 5, date: "2026-06-14", comment: "Rich, creamy, and utterly luxurious. Tuberose at its finest." },
    ],
    images: [img.janan, img.rose],
    category: "Eau de Parfum",
    collection: "Floral",
    fragranceNotes: ["Tuberose", "Orange Blossom", "Cinnamon", "Benzoin", "Ylang-Ylang", "Musk"],
    ingredients: ["Alcohol Denat.", "Parfum (Fragrance)", "Aqua (Water)", "Tuberose Absolute", "Benzoin Resin"],
  },
  {
    id: 10,
    name: "Santal",
    description: "A dark take on sandalwood that pushes the boundary of woody fragrances. Smoky Australian sandalwood is paired with black cardamom, cumin, and a leathery suede accord.",
    shortDescription: "Smoky sandalwood and black cardamom",
    price: 350,
    rating: 4.7,
    reviews: [
      { id: 14, name: "Oliver K.", rating: 5, date: "2026-06-10", comment: "The most unique sandalwood fragrance. Smoky, spicy, and sophisticated." },
    ],
    images: [img.janan, img.shaheer],
    category: "Eau de Parfum",
    collection: "Signature",
    fragranceNotes: ["Black Cardamom", "Cumin", "Sandalwood", "Suede", "Vetiver", "Musk"],
    ingredients: ["Alcohol Denat.", "Parfum (Fragrance)", "Aqua (Water)", "Sandalwood Oil", "Vetiver Oil"],
  },
  {
    id: 11,
    name: "Golden",
    description: "A luminous limited edition celebrating the golden hour. Sparkling champagne, honeyed apricot, and a heart of tuberose and narcissus rest on a base of amber and vanilla.",
    shortDescription: "Champagne, apricot, and tuberose",
    price: 430,
    rating: 4.9,
    reviews: [
      { id: 15, name: "Victoria S.", rating: 5, date: "2026-06-25", comment: "Pure luxury in a bottle. The champagne note is divine." },
    ],
    images: [img.lifestyle, img.amber],
    category: "Extrait de Parfum",
    collection: "Limited Edition",
    fragranceNotes: ["Champagne", "Apricot", "Tuberose", "Narcissus", "Amber", "Vanilla"],
    ingredients: ["Alcohol Denat.", "Parfum (Fragrance)", "Aqua (Water)", "Tuberose Absolute", "Vanilla Absolute"],
    isNew: true,
    isBestSeller: true,
  },
  {
    id: 12,
    name: "Musk",
    description: "A clean, modern musk that feels like a second skin. White musk is layered with ambrette seed, bergamot, and a touch of iris for an effortlessly elegant signature.",
    shortDescription: "Clean white musk and ambrette",
    price: 230,
    rating: 4.6,
    reviews: [
      { id: 16, name: "Aria N.", rating: 4.5, date: "2026-05-25", comment: "The perfect everyday scent. Clean, sophisticated, and subtle." },
    ],
    images: [img.bless, img.janan],
    category: "Eau de Parfum",
    collection: "Signature",
    fragranceNotes: ["Bergamot", "Ambrette Seed", "Iris", "White Musk", "Cotton Blossom"],
    ingredients: ["Alcohol Denat.", "Parfum (Fragrance)", "Aqua (Water)", "Musk Ketones", "Ambrette Seed Oil"],
  },
];

export const collections = [
  { id: "Signature", name: "Signature Collection", description: "Timeless elegance for the discerning", image: img.lifestyle, count: 4 },
  { id: "Floral", name: "Floral Collection", description: "Nature's finest blossoms captured", image: img.rose, count: 3 },
  { id: "Oud", name: "Oud Collection", description: "Rare and precious wood essences", image: img.oud, count: 3 },
  { id: "Limited Edition", name: "Limited Edition", description: "Exclusive creations, limited in number", image: img.notorious, count: 2 },
];

export const categories = ["Eau de Parfum", "Extrait de Parfum", "Eau de Toilette"];
