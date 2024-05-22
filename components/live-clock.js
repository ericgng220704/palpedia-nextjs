import { useState, useEffect } from "react";

const Clock = () => {
     const [time, setTime] = useState(new Date());

     useEffect(() => {
          const timer = setInterval(() => {
               setTime(new Date());
          }, 1000);

          return () => clearInterval(timer);
     }, []);

     const formattedTime = time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
     });

     return <div>{formattedTime}</div>;
};

export default Clock;
