import Navbar from "./navbar/Navbar";
import News from "./news/News";
import { useState, useEffect, useContext } from "react";
import Icons from "./icons/Icnos";
import Inspection from "./inspection/Inspection"
import OpeningHours from "./opening-hours/OpeningHours"
import Contact from "./contact/Contact"
import Header from "./header/Header"
import Footer from "./footer/Footer"
import styles from './Homepage.module.css';



const Homepage = (props) => {
  const [anyPosts, setAnyPosts] = useState(false);
  const [week, setWeek] = useState([])
  const [error, setError] = useState(null);

   const getWeek = (w) => {
     setWeek(w);
   };

   const getError = (e) => {
     setError(e)
   }

  return (
    <>
      <Navbar />
      <Header liftWeek={getWeek} liftError={getError}/>
      <Icons />
      {anyPosts ? <News /> : ""}

      <div className={styles.mainTexts}>
        <h1>STK Písek</h1>
        <p>
          V JIKONA STK Písek provádíme technické prohlídky osobních a nákladních
          automobilů do 3,5t včetně přívěsů a motocyklů od pondělí do pátku. V
          sekci Otevírací doba zjistíte, kdy za námi můžete přijet. Chystáte se
          na technickou poprvé? Žádný strach, doražte k nám a my Vám vše
          vysvětlíme a ukážeme. Případně můžete mrknout do sekce Průběh
          prohlídky a služby, kde najdete detailní popis toho, jak technická
          prohlídka probíhá. Máte jakýkoliv dotaz? Ozvěte se nám na čísle 382
          219 089. Těšíme se na Vás!
        </p>
      </div>
      <Inspection />
      <OpeningHours week={week} error={error}/>
      <Contact />
      <Footer />
    </>
  );
};

export default Homepage;
