import React, { Component } from 'react'
import { AppContextInterface, context } from '../context';

type TimerState = {
  timerMins: string,
  breakMins: string,
  context: AppContextInterface
}

export default class Set extends Component<{},TimerState> {
  static contextType = context;
  context!: React.ContextType<typeof context>

  constructor({}) {
    super({});
    this.state = {
      timerMins: '45',
      breakMins: '15',
      context: {timer: 0, break: 0},
    }
  }

  handleChangeTimer = (e: React.FormEvent<HTMLInputElement>):void => {
    this.setState({
      timerMins: e.currentTarget.value,
    })
  }

  handleChangeBreak = (e: React.FormEvent<HTMLInputElement>):void => {
    this.setState({
      breakMins: e.currentTarget.value,
    })
  }

  changeContext = () => {
    this.setState({
      context: {
        timer: +this.state.timerMins,
        break: +this.state.breakMins,
      }
    });
  };

  render() {
    const localContext = this.state.context;
    const context: AppContextInterface = {
      timer: localContext.timer, 
      break: localContext.break, 
      changeContext: this.changeContext 
    };
    console.log(this.context)

    return (
      <form>
        <div className="set-block">
          <label htmlFor="timer">Timer</label>
          <input type="text" name="timer" value={this.state.timerMins} onChange={this.handleChangeTimer}/>
        </div>
        <div className="set-block">
          <label htmlFor="break">Break</label>
          <input type="text" name="break" value={this.state.breakMins} onChange={this.handleChangeBreak}/>
        </div>
      </form>
    )
  }
}