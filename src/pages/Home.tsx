import Hero from '../components/home/Hero';
import FeaturedCollections from '../components/home/FeaturedCollections';
import BestSellers from '../components/home/BestSellers';
import BrandStory from '../components/home/BrandStory';
import WhyChoose from '../components/home/WhyChoose';
import Reviews from '../components/home/Reviews';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <BestSellers />
      <BrandStory />
      <WhyChoose />
      <Reviews />
      <Newsletter />
    </>
  );
}
