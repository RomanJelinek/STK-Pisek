import React, { useState, useEffect } from "react";
import styles from './OpeningHours.module.css';



const OpeningHours = (props) => {
  const [week, setWeek] = useState([]);
  const [openingTimes, setOpeningTimes] = useState([])


  useEffect(() => {
  }, [openingTimes])


  useEffect(() => {

      const sortBy = [
        "pondělí",
        "úterý",
        "středa",
        "čtvrtek",
        "pátek",
        "sobota",
        "neděle",
      ];
      const customSort = ({ data, sortBy, sortField }) => {
        const sortByObject = sortBy.reduce((obj, item, index) => {
          return {
            ...obj,
            [item]: index,
          };
        }, {});
        return data.sort(
          (a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]]
        );
      };
      setWeek(customSort({ data: props.week, sortBy, sortField: "dayInWeek" }));
  
  }, [props.week]);

  return (
    <>
      <h2 className={styles.homepageHeadline} id="oteviraci-doba">Otevírací Doba</h2>
      <div className={styles.openingTimesContainer}>
        <div className={styles.openingTimesDays}>
          {!props.error ? week.map((day) => {
            return (
              <>
                <li>{day.isPublicHoliday ? <div style={{color: "red"}}>{`${day.dayInWeek.toUpperCase()}  (${day.date}) - Zavřeno! Svátek:  ${day.holidayName}`}</div>: day.dayInWeek.toUpperCase()}
                <div className={styles.openingTimesRight}>{day.isPublicHoliday ? "" : day.openingHours}</div></li>
              </>
            );
          }) : props.error}
        </div>
      </div>
    </>
  );
};

export default OpeningHours;
