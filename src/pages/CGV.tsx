import Seo from '../components/Seo';

export default function CGV() {
  return (
    <div className="min-h-screen bg-[var(--linen)]">
      <Seo
        title="Conditions générales de vente — Nuances Décoration"
        description="Conditions générales de vente de Nuances Décoration : devis, commande, prise de mesures, prix, délais, réception, entretien, garanties et données personnelles."
        path="/cgv"
      />
      <section className="px-8 md:px-16 py-20 bg-[var(--linen)]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-['MaisonNeue'] font-thin text-[9px] tracking-[4px] uppercase text-[var(--primary)] mb-6 block">
            Nuances Décoration
          </span>
          <h1 className="font-['FreeSerif'] italic font-normal text-[30px] md:text-[38px] text-[var(--moka)] leading-[1.4]">
            Conditions Générales de Vente
          </h1>
          <div className="w-16 h-[1px] bg-[var(--primary)] mx-auto mt-10"></div>
        </div>
      </section>

      <section className="px-8 md:px-16 pb-28 bg-white">
        <div className="max-w-3xl mx-auto pt-16">

          <Article title="Article 1 – Objet et champ d'application">
            <p>Les présentes Conditions Générales de Vente (CGV) s'appliquent à toute Commande passée par un Client particulier ou professionnel pour la confection de décoration textile, tels que rideaux, voilages, stores, têtes de lit, banquettes intérieures et extérieures, coussins, housses, ou tout autre article textile, confectionné sur mesure par Nuances Décoration. Sauf accord contraire, les CGV s'appliquent à l'exclusion de tout autre conditions d'achat ou conditions particulières du Client.</p>
            <p>Avant toute commande passée auprès de Nuances Décoration, le Client reconnaît avoir lu attentivement les présentes CGV et les avoir acceptées.</p>
          </Article>

          <Article title="Article 2 – Devis et Commande">
            <p>Tout Devis établi par Nuances Décoration est valable 30 jours à compter de sa date d'envoi. Au-delà de ce délai, Nuances Décoration se réserve la possibilité de modifier les conditions du Devis.</p>
            <p>Toute Commande du Client devient ferme et définitive à compter de la réception du Devis signé par le client avec la mention « Bon pour accord » et du paiement de l'acompte prévu à l'article 4 des CGV.</p>
            <p>En raison du caractère sur mesure des prestations, aucune Commande ne pourra être modifiée ou annulée après validation, sauf accord écrit express de Nuances Décoration.</p>
          </Article>

          <Article title="Article 3 – Prise de mesures et responsabilité">
            <p>Lorsque la prise de mesures est effectuée par Nuances Décoration, celle-ci est garantie. Si le Client fournit lui-même ses mesures, il en assume l'entière responsabilité.</p>
            <p>Il appartient au Client de vérifier les dimensions, la praticité et la compatibilité des créations avec son environnement (rails, tringles, supports, etc.) avant validation du Devis. Nuances Décoration ne pourra être tenu responsable en cas de mesures erronées transmises par le Client.</p>
          </Article>

          <Article title="Article 4 – Prix et modalités de paiement">
            <p>Les prix indiqués sur le Devis sont en euros, toutes taxes comprises (TTC). Ils tiennent compte des matières choisies, des dimensions et des finitions demandées.</p>
            <p>Un acompte de 40 % du montant total TTC de la Commande est exigé à sa confirmation. Sauf accord contraire, le solde est réglé à la livraison ou à la pose, selon les modalités convenues entre les parties.</p>
            <p>Modes de paiement acceptés : virement bancaire, chèque, espèces (dans la limite légale en vigueur).</p>
            <p>Tout retard de paiement entraîne l'application de pénalités de retard fixées à trois (3) fois le taux d'intérêt légal en vigueur, ainsi qu'une indemnité forfaitaire de recouvrement de 40 €, sans préjudice d'éventuels frais supplémentaires applicables.</p>
          </Article>

          <Article title="Article 5 – Délais de fabrication et livraison">
            <p>Les délais de fabrication sont précisés sur le Devis à titre indicatif. Ils courent à compter de la confirmation de la Commande et de la validation de tous les éléments nécessaires à son exécution (choix des tissus, mesures définitives, etc.).</p>
            <p>Nuances Décoration s'engage à tout mettre en œuvre pour respecter les délais annoncés. Toutefois, sa responsabilité ne pourra pas être engagée en cas de retard de livraison indépendant de sa volonté.</p>
          </Article>

          <Article title="Article 6 – Réception et réclamations">
            <p>À la livraison ou à la pose, le Client est invité à vérifier la conformité des articles. Toute réserve ou réclamation doit être signalée par écrit dans un délai de 48 heures suivant la réception. Passé ce délai, les articles sont réputés acceptés en l'état. Nuances Décoration ne pourra être tenu responsable de défauts signalés ultérieurement, sauf vice caché.</p>
          </Article>

          <Article title="Article 8 – Entretien des articles">
            <p>Des conseils d'entretien adaptés aux matières utilisées sont fournis avec chaque création. La responsabilité de Nuances Décoration quant à l'altération des articles (déformation, décoloration, rétrécissement, etc.) ne pourra pas être engagée en cas de non-respect de ces recommandations.</p>
          </Article>

          <Article title="Article 9 – Garanties et limitations de responsabilité">
            <p>Nuances Décoration garantit la conformité de ses créations avec les spécifications validées au Devis (dimensions, modèle, tissu choisi) et la qualité de la confection contre les défauts de confection (coutures, ourlets, fixations) constatés et signalés dans un délai de 3 mois à compter de la livraison ou de la pose, à condition que les articles aient été utilisés et entretenus conformément aux recommandations transmises.</p>
            <p>En revanche, les textiles sont des matières vivantes soumises aux conditions d'usage et d'environnement. Nuances Décoration ne saurait être tenu responsable :</p>
            <ul>
              <li>de la décoloration, du jaunissement ou de l'altération des couleurs liés à l'exposition prolongée à la lumière naturelle ou artificielle (UV) ;</li>
              <li>du rétrécissement, déformation ou dégradation résultant d'un entretien non conforme aux recommandations fournies ;</li>
              <li>de l'usure normale des matières au fil du temps ;</li>
              <li>de dommages causés par des conditions environnementales excessives (humidité, chaleur, moisissures, contacts chimiques, etc.) ;</li>
              <li>de la décoloration ou détérioration des articles utilisés en extérieur sous l'effet des intempéries, du soleil ou de la pollution.</li>
            </ul>
            <p>Pour les articles destinés à un usage extérieur, il est expressément rappelé que même les tissus traités outdoor ne sont pas inaltérables dans le temps. Le Client est informé de cette caractéristique inhérente aux matières textiles avant Commande.</p>
          </Article>

          <Article title="Article 10 – Propriété intellectuelle">
            <p>Les créations, modèles et compositions réalisés par Nuances Décoration demeurent sa propriété intellectuelle. Toute reproduction, même partielle, sans autorisation écrite préalable est interdite.</p>
          </Article>

          <Article title="Article 11 – Protection des données personnelles">
            <p>Nuances Décoration collecte et traite les données personnelles du Client communiquées dans le cadre du Devis et de la Commande aux seules fins de l'exécution de la Commande et de suivi de la relation avec le Client.</p>
            <p>Ces traitements reposent sur l'exécution du contrat conclu avec le Client et l'intérêt légitime de Nuances Décoration à proposer au Client des offres similaires aux Commandes qu'il a passées.</p>
            <p>En tout état de cause, les données du Client ne sont conservées que pendant la durée nécessaire aux finalités susmentionnées. Le Client dispose d'un droit d'accès, de rectification, de portabilité, de limitation et de suppression de ses données, ainsi que de définir leur sort après sa mort, qu'il peut exercer en contactant Nuances Décoration.</p>
          </Article>

          <Article title="Article 12 – Litiges et juridiction compétente">
            <p>Les CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux compétents du ressort du siège social de Nuances Décoration seront seuls compétents.</p>
          </Article>

          <Article title="Article 13 – Clients consommateurs">
            <p>Les stipulations suivantes sont exclusivement applicables aux Clients consommateurs :</p>
            <p><strong>Droit de rétractation.</strong> Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contrats portant sur des biens confectionnés selon les spécifications du consommateur ou nettement personnalisés. Les créations sur mesure de Nuances Décoration entrent dans ce cadre et toute Commande confirmée ne pourra donner lieu à rétractation.</p>
          </Article>

        </div>
      </section>
    </div>
  );
}

function Article({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12 pb-12 border-b border-[var(--pale)] last:border-0 last:pb-0">
      <h2 className="font-['MaisonNeue'] font-normal text-[11px] tracking-[3px] uppercase text-[var(--primary)] mb-6">
        {title}
      </h2>
      <div className="space-y-4 font-['MaisonNeue'] font-light text-[14px] text-[var(--warm)] leading-[1.9] [&_ul]:mt-4 [&_ul]:ml-6 [&_ul]:space-y-2 [&_ul]:list-disc [&_strong]:font-normal [&_strong]:text-[var(--moka)]">
        {children}
      </div>
    </div>
  );
}
