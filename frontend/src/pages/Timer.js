import React from "react";
import Countdown from "react-countdown";
function Timer({ time, setIsExpire }) {
  console.log(time);
  return (
    <div>
      <Countdown
        onComplete={() => setIsExpire(true)}
        date={Date.now() + time}
      />
    </div>
  );
}

export default Timer;
