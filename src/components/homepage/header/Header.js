import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';


const Header = (props) => {
  const closingTimes = ['17:00', '15:30', '13:00'];
  const [isOpen, setIsOpen] = useState(true);
  const [timeToShow, setTimeToShow] = useState(closingTimes[0]);
  const [week, setWeek] = useState([]);
  const [holidayToday, setHolidayToday] = useState(false);
  const [holidayIn1, setHolidayIn1] = useState(false);
  const [holidayIn2, setHolidayIn2] = useState(false);
  const [holidayIn3, setHolidayIn3] = useState(false);
  const [error, setError] = useState(null);

  const weekDay = new Date().getDay();
  const date = new Date().getDate();
  const month = new Date().getMonth() - 1
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();

  function timeToDecimal() {
    let arr = [hour, minute];
    let dec = parseInt((arr[1] / 6) * 10, 10);
    return parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec);
  }
  useEffect(() => {
    // fetching data
    for (let day = 0; day < 7; day++) {
      let currentDate = new Date();
      let followingTime = new Date(
        currentDate.getTime() + day * 24 * 60 * 60 * 1000
      );
      let followingDay =
        followingTime.getDate() < 10
          ? '0' + followingTime.getDate()
          : followingTime.getDate();
      let followingMonth =
        followingTime.getMonth() + 1 < 10
          ? '0' + (followingTime.getMonth() + 1)
          : followingTime.getMonth() + 1;
      let followingYear = followingTime.getFullYear();

      const fetchHoliday = async () => {
        setError(null);
        console.log(
          `https://svatkyapi.cz/api/day/${followingYear}-${followingMonth}-${followingDay}`
        );
        try {
          const response = await fetch(
            `https://svatkyapi.cz/api/day/${followingYear}-${followingMonth}-${followingDay}`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
              },
            }
          );
          if (!response.ok) {
            throw new Error(
              'Něco se pokazilo. Zkuste prosím aktualizovat stránku'
            );
          }

          let holiday = await response.json();

          console.log(holiday)

          let openingHours = {};
          if (
            holiday.dayInWeek === 'pondělí' ||
            holiday.dayInWeek === 'středa'
          ) {
            openingHours = { openingHours: '07:00 - 17:00' };
          } else if (
            holiday.dayInWeek === 'úterý' ||
            holiday.dayInWeek === 'čtvrtek'
          ) {
            openingHours = { openingHours: '07:00 - 15:30' };
          } else if (holiday.dayInWeek === 'pátek') {
            openingHours = { openingHours: '07:00 - 13:00' };
          } else if (
            holiday.dayInWeek === 'sobota' ||
            holiday.dayInWeek === 'neděle'
          ) {
            openingHours = { openingHours: 'Zavřeno' };
          }

          let mergedHolidayHours = { ...holiday, ...openingHours };

          if (day === 0) {
            if (mergedHolidayHours.isHoliday) {
              setIsOpen(false);
              setHolidayToday(true);
            }
          }
          if (day === 1) {
            mergedHolidayHours.isHoliday && setHolidayIn1(true);
          }
          if (day === 2) {
            mergedHolidayHours.isHoliday && setHolidayIn2(true);
          }
          if (day === 3) {
            mergedHolidayHours.isHoliday && setHolidayIn3(true);
          }
          setWeek((week) => [...week, mergedHolidayHours]);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchHoliday();
    }
    // end of fetching data

    // finding out if open
    if (weekDay < 6 && weekDay !== 0) {
      if (weekDay === 1 || weekDay === 3) {
        setTimeToShow(closingTimes[0]);
        if (hour > 16 || hour < 7) {
          setIsOpen(false);
        }
      } else if (weekDay === 2 || weekDay === 4) {
        setTimeToShow(closingTimes[1]);
        if (timeToDecimal() > 15.5 || hour < 7) {
          setIsOpen(false);
        }
      } else if (weekDay === 5) {
        setTimeToShow(closingTimes[2]);
        if (timeToDecimal() > 13.5 || hour < 7) {
          setIsOpen(false);
        }
      }
    } else if (weekDay === 0 || weekDay === 6) {
      setIsOpen(false);
    }
    //
  }, []);

  useEffect(() => {
    props.liftWeek(week);
  }, [week]);

  useEffect(()=>{
    error && props.liftError(error);
  },[error])

  useEffect(() => {
    props.liftOpenState(isOpen);
  }, [isOpen]);

  return (
    <>
      <div className={styles.mainImg}></div>
      <div className={styles.mainTimeInfo}>
        {(date !== 24 || date !== 25 || date !== 26) && month !== 12 ? (
          <>
            {isOpen && <h2>Dnes je otevřeno do {timeToShow}</h2>}
            {!holidayToday ? (
              <>
                {!isOpen &&
                  hour > 0 &&
                  hour < 7 &&
                  weekDay > 0 &&
                  weekDay < 6 && (
                    <h2>Dnes je zatím zavřeno. Otevíráme v 7:00</h2>
                  )}
              </>
            ) : (
              <>
                {!isOpen &&
                  hour > 0 &&
                  hour < 7 &&
                  weekDay > 0 &&
                  weekDay < 6 && (
                    <h2>
                      Dnes je zavřeno, je svátek :) Otevíráme následující
                      pracovní den v 7:00
                    </h2>
                  )}
              </>
            )}
            {!holidayIn1 ? (
              <>
                {!isOpen &&
                  hour > 7 &&
                  hour <= 23 &&
                  weekDay > 0 &&
                  weekDay < 5 && (
                    <h2>Dnes je již zavřeno. Otevíráme zítra v 7:00</h2>
                  )}
              </>
            ) : (
              <>
                {!isOpen &&
                  hour > 7 &&
                  hour <= 23 &&
                  weekDay > 0 &&
                  weekDay < 5 && (
                    <h2>
                      Dnes je již zavřeno a čeká nás svátek :) Otevíráme
                      následující pracovní den v 7:00
                    </h2>
                  )}
              </>
            )}
            {!holidayIn3 ? (
              <>
                {!isOpen && hour > 7 && hour <= 23 && weekDay === 5 && (
                  <h2>Dnes je již zavřeno. Otevíráme v pondělí v 7:00</h2>
                )}
              </>
            ) : (
              <>
                {!isOpen && hour > 7 && hour <= 23 && weekDay === 5 && (
                  <h2>
                    Dnes již máme zavřeno a příští týden nás čeká svátek :)
                    Otevíráme následující pracovní den v 7:00
                  </h2>
                )}
              </>
            )}
            {!holidayIn2 ? (
              <>
                {!isOpen && weekDay === 6 && (
                  <h2>O víkendu máme zavřeno. Otevíráme v pondělí v 7:00</h2>
                )}
              </>
            ) : (
              <>
                {!isOpen && weekDay === 6 && (
                  <h2>
                    O víkendu máme zavřeno a příští týden nás čeká svátek :)
                    Otevíráme následující pracovní den v 7:00
                  </h2>
                )}
              </>
            )}
            {!holidayIn1 ? (
              <>
                {!isOpen && weekDay === 0 && (
                  <h2>O víkendu máme zavřeno. Otevíráme zítra v 7:00</h2>
                )}
              </>
            ) : (
              <>
                {!isOpen && weekDay === 0 && (
                  <h2>
                    O víkendu máme zavřeno a příští týden nás čeká svátek :)
                    Otevíráme následující pracovní den v 7:00
                  </h2>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <h2>Veselé Vánoce! </h2>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
