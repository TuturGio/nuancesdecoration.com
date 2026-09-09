import CategoryPage from './CategoryPage';
import { drawNautical, drawWeave } from '../utils/canvasDrawing';
import RealisationsOutdoor from '../components/RealisationsOutdoor';

export default function Bateaux() {
  return (
    <CategoryPage
      title="Outdoor & Bateaux"
      subtitle="Sellerie nautique"
      description="Donnez vie à vos espaces extérieurs avec des réalisations textiles entièrement sur mesure. Banquettes, coussins, bains de soleil, ou encore transats : nous concevons chaque projet dans notre atelier, en vous proposant une large sélection de tissus techniques et étanches spécialement conçus pour l'extérieur."
      features={[
        'Banquettes d\'extérieur',
        'Coussins de salon de jardin',
        'Bains de soleil & transats',
        'Mousses sur mesure',
        'Large sélection de tissus traités pour l\'extérieur : résistants aux UV, intempéries, imperméables, étanches...',
        'Conseil personnalisés style et finitions',
      ]}
      heroImage={`${import.meta.env.BASE_URL}outdoor-cat.jpg`}
      heroDraw={drawNautical}
      galleryDraws={[
        drawNautical,
        (c) => drawWeave(c, '#8A9EA8', '#6B8090'),
        drawNautical,
        (c) => drawWeave(c, '#7A8E98', '#5B7080'),
        drawNautical,
        (c) => drawWeave(c, '#9AAEB8', '#7B90A0'),
      ]}
      extraContent={<RealisationsOutdoor />}
    />
  );
}
