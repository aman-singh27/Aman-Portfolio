
import { useState, useEffect } from 'react';

const formatTimeUnit = (unit: number) => unit.toString().padStart(2, '0');

export const useTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const hours = formatTimeUnit(time.getHours());
  const minutes = formatTimeUnit(time.getMinutes());
  const seconds = formatTimeUnit(time.getSeconds());
  
  const offset = -time.getTimezoneOffset() / 60;
  const gmt = `GMT${offset >= 0 ? '+' : ''}${offset}`;

  return `${hours}:${minutes}:${seconds} ${gmt}`;
};
