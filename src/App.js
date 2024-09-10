import React, { useEffect, useState } from 'react';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;

    if(isRunning) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);


  const handleStartStopBtn = () => {
    setIsRunning(!isRunning);
  }

  const handleResetBtn = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
  }

  const timeFormat = (val, isMinutes = false) => {
    if (isMinutes) {
      return val;
    }
    return String(val).padStart(2, '0');
  }

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <p>Time: {timeFormat(minutes, true)}:{timeFormat(seconds)}</p>
      <div className='controllers'>
        <button onClick={handleStartStopBtn}>{!isRunning ? 'Start' : 'Stop'}</button>
        <button onClick={handleResetBtn}>Reset</button>
      </div>
    </div>
  );
}

export default App;
