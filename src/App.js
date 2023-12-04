import './App.css';
import { useState, useRef } from 'react';

function App() {
  const [currentMark, setCurrentMark] = useState(0)
  const [laps, setLaps] = useState([])
  const [hasData, setHasData] = useState(true)

  const interval = useRef()
  const startTime = useRef()

  function handleResetTimer() {
    if (!hasData) {
      setCurrentMark(0);
      setLaps([])
    } else {
      setHasData(false)
    }
    clearInterval(interval.current)
  }

  function handleStartTimer() {
    startTime.current = Date.now()
    interval.current = setInterval(() => setCurrentMark(Date.now() - startTime.current), 50)
  }

  function handlerNewLap() {
    setLaps([currentMark, ...laps])
    setHasData(true)
  }

  return (
    <div className="content">
      <div className="timer">
        <div className="clock">
          {(currentMark / 1000).toFixed(2)}
        </div>
        <div className="buttons">
          <button onClick={handleStartTimer} className="btn_start">Start Timet</button>
          <button onClick={handleResetTimer} className="btn_stop">Stop/reset timer</button>
          <button onClick={handlerNewLap} className="btn_lap">New lap</button>
        </div>
        <div className="laps"></div>
        <ul>
          {laps.map((lap) => <li>{(lap / 1000).toFixed(2)}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
