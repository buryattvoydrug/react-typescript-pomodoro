import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { context } from '../context';

export default function Set() {
  const {pomodoro, setPomodoro} = useContext(context);

  const handleChangeTimer = (e: React.FormEvent<HTMLInputElement>):void => {
    setPomodoro({
      timer: +e.currentTarget.value,
      break: pomodoro.break,
    });
    localStorage.setItem('lastPomodoroTimer', String(e.currentTarget.value));
  }

  const handleChangeBreak = (e: React.FormEvent<HTMLInputElement>):void => {
    setPomodoro({
      timer: pomodoro.timer,
      break: +e.currentTarget.value,
    });
    localStorage.setItem('lastPomodoroBreak', String(e.currentTarget.value));
  }

  return (
    <>
    <form>
        <div className="set-block">
          <label htmlFor="timer">Timer</label>
          <input type="text" name="timer" value={pomodoro.timer} onChange={(e)=>handleChangeTimer(e)}/>
        </div>
        <div className="set-block">
          <label htmlFor="break">Break</label>
          <input type="text" name="break" value={pomodoro.break} onChange={(e)=>handleChangeBreak(e)}/>
        </div>
      </form>
      <Link to="/" >К таймеру</Link>
    </>
      
  )
}