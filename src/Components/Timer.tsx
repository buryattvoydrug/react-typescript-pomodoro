import React, { Component } from 'react'
import { Link } from 'react-router-dom';

type TimerProps = {
  timer: number,
  break: number,
}

type TimerState = {
  timerTime: number,
  breakTime: number,
  currentTimer: number,
  currentTimerName: string,
  output: string,
  total: number,
  totalHours: number,
  interval?: any,
}

class Timer extends Component<TimerProps, TimerState> {
  constructor(props: TimerProps) {
    super(props);
    this.state = {
      timerTime: props.timer * 60 - 1,
      breakTime: props.break * 60 - 1,
      currentTimer: props.timer * 60 - 1,
      currentTimerName: 'timer',
      output: this.addZero(props.timer)+':00',
      total: +(localStorage.getItem('totalThisSession') || 0),
      totalHours: this.getHoursFromSeconds(+(localStorage.getItem('totalThisSession') || 0)),

    }
  }

  getHoursFromSeconds = (seconds:number):number => Math.floor(seconds / 3600);

  addZero = (time: number): string => {
    let res = String(time);
    if (res.length < 2) return '0' + res;
    return res;
  }

  renderTimer = ():void => {
    if (this.isTimeUp()) return;

    let secondsLeft = this.state.currentTimer;
    this.setState({currentTimer: secondsLeft - 1});

    if (this.state.currentTimerName === 'timer') {
      this.setState({total: this.state.total + 1});
      this.setState({totalHours: this.getHoursFromSeconds(this.state.total)});
      localStorage.setItem('totalThisSession', String(this.state.total));
    }

    let mins = this.addZero(Math.floor(secondsLeft / 60));
    let secs = this.addZero(secondsLeft % 60);
    this.setState({output: mins + ':' + secs});
  }

  start = ():void => {
    this.setState({interval: setInterval(() => this.renderTimer(), 1)});
  }

  stop = ():void => {
    this.setState({interval: clearInterval(this.state.interval)});
  }

  isTimeUp = ():boolean => {
    if (this.state.currentTimer < 0) {
      this.stop();
      this.changeTimer();
      this.start();
      return true;
    }
    return false;
  }

  changeTimer = ():void => {
    if (this.state.currentTimerName === 'timer')
      this.setState({currentTimer: this.state.breakTime, currentTimerName: 'break'});
    else
      this.setState({currentTimer: this.state.timerTime, currentTimerName: 'timer'});
  }

  render() {
    return (
      <>
        <div className="timer">{this.state.output}</div>
        <button onClick={() => this.start()}>Старт</button>
        <button onClick={() => this.stop()}>Стоп</button>
        <span>Hours: {this.state.totalHours}</span>
        <Link to='/total'>Завершить сеанс</Link>
        {/* <button onClick={() => this.endSession()}>Завершить сеанс</button> */}
      </>
    )
  }
}

export default Timer;