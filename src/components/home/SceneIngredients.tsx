import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ingredients = [
  {
    name: 'Bergamot',
    origin: 'Calabria, Italy',
    description: 'Hand-peeled at dawn when the essential oils reach their peak concentration. Our bergamot adds a luminous citrus top note.',
    image: 'https://images.pexels.com/photos/2307648/pexels-photo-2307648.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'https://images.pexels.com/photos/13284500/pexels-photo-13284500.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Oud',
    origin: 'Cambodia',
    description: 'Aged for fifteen years in the forests of Pursat. This rare agarwood yields a smoky, animalic depth that defines our darker compositions.',
    image: 'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'https://images.pexels.com/photos/36389336/pexels-photo-36389336.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Rose',
    origin: 'Grasse, France',
    description: 'May roses, harvested by hand in the fields of Grasse. It takes 60,000 flowers to produce a single gram of absolute.',
    image: 'https://images.pexels.com/photos/242847/pexels-photo-242847.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'https://images.pexels.com/photos/31188628/pexels-photo-31188628.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Vanilla',
    origin: 'Madagascar',
    description: 'Bourbon vanilla from the SAVA region, cured for nine months. Its warm, gourmand sweetness forms the heart of our most sensual creations.',
    image: 'https://images.pexels.com/photos/14381802/pexels-photo-14381802.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'https://images.pexels.com/photos/15097440/pexels-photo-15097440.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function SceneIngredients() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ['0%', '100%']);

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F5EFE6 0%, #E8DDD0 50%, #F5EFE6 100%)' }}
    >
      {/* Header */}
      <div className="px-8 sm:px-12 lg:px-20 mb-20 sm:mb-24 lg:mb-32">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[10px] tracking-editorial uppercase text-bronze/50 font-body mb-6"
        >
          Ingredients
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl lg:text-7xl text-espresso leading-[0.95] max-w-3xl"
        >
          Sourced from
          <span className="block italic text-bronze">the finest terroirs</span>
        </motion.h2>

        {/* Animated divider */}
        <div className="mt-10 sm:mt-12 max-w-3xl h-[1px] bg-espresso/10 relative overflow-hidden">
          <motion.div
            style={{ width: lineWidth }}
            className="absolute inset-y-0 left-0 bg-bronze/40"
          />
        </div>
      </div>

      {/* Ingredients list */}
      <div className="max-w-[1600px] mx-auto px-8 sm:px-12 lg:px-20">
        {ingredients.map((ingredient, i) => (
          <IngredientRow key={ingredient.name} ingredient={ingredient} index={i} />
        ))}
      </div>
    </section>
  );
}

function IngredientRow({
  ingredient,
  index,
}: {
  ingredient: (typeof ingredients)[0];
  index: number;
}) {
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const textX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [index % 2 === 0 ? -30 : 30, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={rowRef}
      style={{ opacity }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
        index > 0 ? 'mt-20 sm:mt-28 lg:mt-36' : ''
      }`}
    >
      {/* Image */}
      <motion.div
        className={`${isEven ? 'lg:col-span-7 lg:order-1' : 'lg:col-span-7 lg:order-2'} relative`}
      >
        <div className={`relative overflow-hidden ${isEven ? 'aspect-[4/5]' : 'aspect-[5/4]'}`}>
          <motion.img
            style={{ y: imageY }}
            src={ingredient.image}
            alt={ingredient.name}
            className="w-full h-[115%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/10 via-transparent to-transparent" />
        </div>

        {/* Accent image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`absolute w-28 h-36 sm:w-36 sm:h-44 overflow-hidden shadow-xl ${
            isEven
              ? '-bottom-6 -right-4 sm:-right-6'
              : '-bottom-6 -left-4 sm:-left-6'
          }`}
          style={{ border: '1px solid rgba(199, 163, 107, 0.2)' }}
        >
          <img
            src={ingredient.accent}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.div
        style={{ x: textX }}
        className={`${isEven ? 'lg:col-span-4 lg:col-start-9 lg:order-2' : 'lg:col-span-4 lg:order-1 lg:pr-8'}`}
      >
        {/* Index */}
        <span className="text-[80px] sm:text-[100px] font-display text-espresso/[0.04] leading-none block -mb-12 sm:-mb-16 select-none">
          {String(index + 1).padStart(2, '0')}
        </span>

        <p className="text-[10px] tracking-editorial uppercase text-bronze/50 font-body mb-3">
          {ingredient.origin}
        </p>
        <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-espresso leading-tight mb-6">
          {ingredient.name}
        </h3>
        <div className="w-8 h-[1px] bg-bronze/30 mb-6" />
        <p className="text-sm sm:text-base text-espresso/50 leading-relaxed font-light max-w-md">
          {ingredient.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
