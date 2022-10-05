import React, { Component, useContext } from 'react'
import { Link } from 'react-router-dom';
import { context } from '../context';
import { TimerProps, TimerState } from '../types';
import '../scss/timer.scss'



export default function Timer() {
  const {pomodoro} = useContext(context);
  console.log(pomodoro);
  return (
    <>
      <PomodoroTimer timer={pomodoro.timer} break={pomodoro.break} />
      <Link className="set__button" to="/set" >Настройка</Link>
    </>
  );
}

class PomodoroTimer extends Component<TimerProps, TimerState> {
  constructor(props: TimerProps) {
    super(props);
    this.state = {
      timerTime: props.timer * 60 - 1,
      breakTime: props.break * 60 - 1,
      currentTimer: +(localStorage.getItem('lastTimer') || props.timer * 60 - 1),
      currentTimerName: localStorage.getItem('lastTimerName') || 'timer',
      output: this.timeToString(+(localStorage.getItem('lastTimer') || props.timer * 60)),
      total: +(localStorage.getItem('totalThisSession') || 0),
      totalHours: this.getHoursFromSeconds(+(localStorage.getItem('totalThisSession') || 0)),

    }
  }

  getHoursFromSeconds = (seconds:number):number => Math.floor(seconds / 3600);

  private timeToString = (time: number): string => {
    let minutes = String(Math.floor(time / 60));
    let seconds = String(time % 60);

    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;
    return minutes + ':' + seconds;
  }

  private renderTimer = ():void => {
    if (this.isTimeUp()) return;

    let secondsLeft = this.state.currentTimer;
    this.setState({currentTimer: secondsLeft - 1});

    if (this.state.currentTimerName === 'timer') {
      this.setState({total: this.state.total + 1});
      this.setState({totalHours: this.getHoursFromSeconds(this.state.total)});
      localStorage.setItem('totalThisSession', String(this.state.total));
    }

    this.setState({output: this.timeToString(secondsLeft)});
  }

  start = ():void => {
    this.setState({interval: setInterval(() => this.renderTimer(), 1000)});
  }

  stop = ():void => {
    localStorage.setItem('lastTimer', String(this.state.currentTimer));
    localStorage.setItem('lastTimerName', String(this.state.currentTimerName));
    this.setState({interval: clearInterval(this.state.interval)});
  }

  private isTimeUp = ():boolean => {
    if (this.state.currentTimer < 0) {
      this.stop();
      this.changeTimer();
      this.start();
      return true;
    }
    return false;
  }

  private changeTimer = ():void => {
    if (this.state.currentTimerName === 'timer')
      this.setState({currentTimer: this.state.breakTime, currentTimerName: 'break'});
    else
      this.setState({currentTimer: this.state.timerTime, currentTimerName: 'timer'});
  }

  render() {
    return (
      <>
        <div className="timer">
          <div className="timer__output">{this.state.output}</div>
        </div>
        <button className="start__button" onClick={() => this.start()}>Старт</button>
        <button className="stop__button" onClick={() => this.stop()}>Стоп</button>
        <span>Hours: {this.state.totalHours}</span>
        <Link className="finish__button" to='/total'>Завершить сеанс</Link>
      </>
    )
  }
}
