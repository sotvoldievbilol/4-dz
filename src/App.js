import React, { useState, useEffect } from 'react'; 
import './time.css'; 
 
function App() { 
  const [time, setTime] = useState(0); 
  const [isOn, setIsOn] = useState(false); 
  const [milliseconds, setMilliseconds] = useState(0); 
  const [results, setResults] = useState([]); 
   
  useEffect(() => { 
    let timer; 
    if (isOn) { 
      timer = setTimeout(() => { 
        setMilliseconds((ms) => { 
          if (ms + 100 >= 1000) { 
            setTime((s) => s + 1); 
            return 0; 
          } 
          return ms + 100; 
        }); 
      }, 100); 
    } else { 
      clearTimeout(timer); 
    } 
 
    return () => { 
      clearTimeout(timer); 
    }; 
  }, [isOn, milliseconds]); 
 
  const start = () => { 
    setIsOn(true); 
  }; 
 
  const pause = () => { 
    setIsOn((isOn) => { 
      if (isOn) { 
        setResults([...results, formatTime(time, milliseconds)]); 
      } 
      return !isOn; 
    }); 
  }; 
 
  const reset = () => { 
    setTime(0); 
    setMilliseconds(0); 
    setIsOn(false); 
  }; 
 
  const formatTime = (totalSeconds, ms) => { 
    const minutes = Math.floor(totalSeconds / 60); 
    const seconds = totalSeconds % 60; 
    const deciseconds = Math.floor(ms / 100); 
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds; 
    const paddedDeciseconds = deciseconds < 10 ? `0${deciseconds}` : deciseconds; 
    return  `${minutes}:${paddedSeconds}.${paddedDeciseconds}`; 
  }; 
 
  return ( 
    <div className="App"> 
      <h1>STOPWATCH</h1> 
      <br /> 
      <h1>{formatTime(time, milliseconds)}</h1> 
      <div className='btns'> 
        <button id="start" onClick={start}>Start</button> 
        <button id="pause" onClick={pause}>Pause</button> 
        <button id="reset" onClick={reset}>Reset</button> 
      </div> 
      <div> 
        <h2>Results:</h2> 
        <ul> 
          {results.map((result, index) => ( 
            <li key={index}>{result}</li> 
          ))} 
        </ul> 
      </div> 
    </div> 
  ); 
} 
 
export default App;
