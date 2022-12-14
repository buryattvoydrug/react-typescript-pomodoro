import React, { Component, useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import { context } from '../context';
import { TimerProps, TimerState } from '../types';
import '../scss/timer.scss'
import TimerOutput from './TimerOutput';



export default function Timer() {
  const {pomodoro} = useContext(context);
  return (
    <PomodoroTimer timer={pomodoro.timer} break={pomodoro.break} />
  );
}

class PomodoroTimer extends Component<TimerProps, TimerState> {
  constructor(props: TimerProps) {
    super(props);
    this.state = {
      isActive: false,
      timerTime: props.timer * 60,
      breakTime: props.break * 60,
      currentTimer: +(localStorage.getItem('lastTimer') || props.timer * 60),
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
    this.setState({isActive: true});

  }

  stop = ():void => {
    localStorage.setItem('lastTimer', String(this.state.currentTimer));
    localStorage.setItem('lastTimerName', String(this.state.currentTimerName));
    this.setState({interval: clearInterval(this.state.interval)});
    this.setState({isActive: false});
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
    console.log(this.state.currentTimer, this.state.timerTime)
    const currentPropgress = Math.ceil(this.state.currentTimer / this.state.timerTime * 100) !== 100 ? 
                             100 - Math.ceil(this.state.currentTimer / this.state.timerTime * 100) - 1 : 0;
    return (
      <>
        <TimerOutput totalHours={this.state.totalHours}
                     currentTimerName={this.state.currentTimerName}
                     output={this.state.output}
                     progress={currentPropgress}/>
        {this.state.isActive? 
            <button className="start__button shadows" onClick={() => this.stop()}>
              <img src="/images/pause.png" alt="" />
            </button>
        :
          <>
            <button className="start__button shadows" onClick={() => this.start()}>
              <img src="/images/play.png" alt="" />
            </button>
          </>
        }
        {this.state.total !== 0 && !this.state.isActive &&
          <Link className="finish__button shadows" to='/total'>finish <img src="/images/finish.png" alt="" /></Link>
        }
        {!this.state.isActive &&
              <Link className="set__button" to="/set" >
                <img src="/images/settings.png" alt="" />
              </Link>
        }
      </>
    )
  }
}
