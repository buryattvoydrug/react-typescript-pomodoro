import React, { Component } from 'react'

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
      total: +(localStorage.getItem('totalToday') || 0),
    }
  }

  addZero = (time: number): string => {
    let res = String(time);
    if (res.length < 2) return '0' + res;
    return res;
  }

  renderTimer = ():void => {
    if (this.isTimeUp()) return;

    let secondsLeft = this.state.currentTimer;
    this.setState({currentTimer: secondsLeft - 1});

    this.setState({total: this.state.total + 1});
    localStorage.setItem('totalToday', String(this.state.total));

    let mins = this.addZero(Math.floor(secondsLeft / 60));
    let secs = this.addZero(secondsLeft % 60);
    this.setState({output: mins + ':' + secs});
  }

  start = ():void => {
    this.setState({interval: setInterval(() => this.renderTimer(), 1000)});
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
      </>
    )
  }
}

export default Timer;