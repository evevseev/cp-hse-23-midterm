import './App.css';
import { useState, useRef } from 'react';

function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentMark, setCurrentMark] = useState(0)
  const [laps, setLaps] = useState([])

  const interval = useRef()
  const startTime = useRef()

  function handleResetTimer() {
    if (isRunning) {
      setIsRunning(false)
      clearInterval(interval.current)
    } else {
      setCurrentMark(0);
      setLaps([])
    }
  }

  function handleStartTimer() {
    if (!isRunning) {
      startTime.current = Date.now()
      interval.current = setInterval(() => setCurrentMark(Date.now() - startTime.current), 50)
      setIsRunning(true)
    }
  }

  function handlerNewLap() {
    if (isRunning) {
      setLaps([currentMark, ...laps])
    }
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
          {laps.map((lap) => <li key={lap}>{(lap / 1000).toFixed(2)}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
