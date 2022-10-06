import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { context } from '../context';
import '../scss/set.scss';

export default function Set() {
  const {pomodoro, setPomodoro} = useContext(context);

  const handleChangeTimer = (e: React.FormEvent<HTMLInputElement>):void => {
    setPomodoro({
      timer: +e.currentTarget.value,
      break: pomodoro.break,
    });
    localStorage.setItem('lastPomodoroTimer', String(e.currentTarget.value));
    localStorage.setItem('lastTimer', String(+e.currentTarget.value * 60));
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
    <form className='set-form'>
        <div className="set-block">
          <label htmlFor="timer">timer</label>
          <input type="text" name="timer" value={isNaN(pomodoro.timer) ? 0 : pomodoro.timer} onChange={(e)=>handleChangeTimer(e)}/>
          <span>:00</span>
        </div>
        <div className="set-block">
          <label htmlFor="break">break</label>
          <input type="text" name="break" value={isNaN(pomodoro.break) ? 0 : pomodoro.break} onChange={(e)=>handleChangeBreak(e)}/>
          <span>:00</span>
        </div>
      </form>
        <div className="ok__button">
          <Link to='/'>
            <img src="/images/ok.png" alt="" />
          </Link>
        </div>
    </>
      
  )
}