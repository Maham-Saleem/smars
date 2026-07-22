import SceneBottle from '../components/home/SceneBottle';
import ScenePhilosophy from '../components/home/ScenePhilosophy';
import SceneFamilies from '../components/home/SceneFamilies';
import SceneArtistic from '../components/home/SceneArtistic';
import SceneIngredients from '../components/home/SceneIngredients';
import SceneCraftsmanship from '../components/home/SceneCraftsmanship';
import SceneShop from '../components/home/SceneShop';

export default function Home() {
  return (
    <>
      <SceneBottle />
      <ScenePhilosophy />
      <SceneFamilies />
      <SceneArtistic />
      <SceneIngredients />
      <SceneCraftsmanship />
      <SceneShop />
    </>
  );
}
