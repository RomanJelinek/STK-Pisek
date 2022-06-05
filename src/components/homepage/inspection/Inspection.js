import React from 'react';
import styles from './Inspection.module.css';


const Inspection = () => {
    return (
      <>
        <h2 className={styles.homepageHeadline} id="prubeh-prohlidky">
          Průběh prohlídky
        </h2>
        <div className={styles.inspectionContainer}>
          <h3> Před prohlídkou </h3>
          <p>
            Je potřeba si vzít s sebou originály malého a velkého technického
            průkazu. Dále si prosím sundejte snímatelné disky z kol automobilů,
            případně i přívěsů. Poté stačí již jen zjistit otevírací dobu. Berte
            prosím na vědomí, že Vás přijímáme bez objednání a platby
            akceptujeme pouze v hotovosti.
          </p>
          <h3>Jak probíhá prohlídka </h3>
          <p>
            V zadní části areálu Vám budou nejprve změřeny emise. Poté se
            přesuňte do kanceláře u vjezdu STK, kde odevzdáte potřebné doklady a
            budete zařazeni mezi čekající vozidla. Pořadí se určuje dle času
            odevzdání dokladů. Viz video níže.
          </p>
          <h3>Stanice technické kontroly v Písku nabízí následující služby:</h3>
          <ol>
            <li>
              <span>
                Technické prohlídky osobních a nákladních automobilů do 3,5t
                včetně přívěsů a motocyklů.
              </span>
            </li>
            <li>
              <span>Stavby.</span>
            </li>
            <li>
              <span>Přestavby.</span>
            </li>
            <li>
              <span>Evidenční kontroly.</span>
            </li>
            <li>
              {' '}
              <span>TP na přání zákazníka.</span>
            </li>
            <li>
              <span>Technické kontroly vozidel ze zahraničí.</span>
            </li>
            <li>
              <span>
                Měření emisí většiny vozidel, včetně alternativního pohonu LPG a CNG
                (BRC, LANDI RENZO, LOVATO, ZAVOLI, AUTRONIC, KME, EUROPEGAS, STAG, STAG).
              </span>
            </li>
            <li>
              <span>
                Určení emisního stupně a prodej ekologických plaket do vybraných
                měst Německa.
              </span>
            </li>
            <li>
              <span>
                Prohlídky pro pojišťovny: Slavia, Wüstenrot, Chartis, Triglav,
                DCS, Srovnávač, Mai Insurance Brokers, Klik pojištění.
              </span>
            </li>
          </ol>
          <p>
            <br /> <b>Oprávnění měření emisí na plynových zařízení značky:</b>
            BRC, LANDI RENZO, LOVATO, ZAVOLI, AUTRONIC, KME, EUROPEGAS, STAG,
            ESGI
          </p>
          <div className={styles.inspectionVideo}>
            <iframe
              width="1200"
              height="675"
              src="https://www.youtube.com/embed/J6_FOV0HkUk"
              title="STK Písek průběh prohlídky"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </>
    );
};

export default Inspection;