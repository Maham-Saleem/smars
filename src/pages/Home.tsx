import CinematicHero from '../components/home/CinematicHero';
import EditorialSignature from '../components/home/EditorialSignature';
import EditorialFloral from '../components/home/EditorialFloral';
import EditorialOud from '../components/home/EditorialOud';
import EditorialLimited from '../components/home/EditorialLimited';
import TheAtelier from '../components/home/TheAtelier';
import ArtShowcase from '../components/home/ArtShowcase';

export default function Home() {
  return (
    <>
      <CinematicHero />
      <EditorialSignature />
      <EditorialFloral />
      <EditorialOud />
      <EditorialLimited />
      <TheAtelier />
      <ArtShowcase />
    </>
  );
}
