import React, { Component } from 'react'

type TotalState = {
  totalThisSession: number,
  totalThisWeek?: number,
  totalThisMonth?: number,
}

export default class Total extends Component<{}, TotalState> {
  constructor() {
    super({});
    this.state = {
      totalThisSession: 0,
    }
  }

  endSession = ():void => {
    this.setState({totalThisSession: +(localStorage.getItem('totalToday') || 0)});
    localStorage.setItem('totalToday', '0');
  }

  render() {
    return (
      <>
      <button onClick={() => this.endSession()}>Завершить сеанс</button>
        <span>totalThisSession: {this.state.totalThisSession}</span>
        <span>totalThisWeek: {this.state.totalThisWeek}</span>
        <span>totalThisMonth: {this.state.totalThisMonth}</span>
      </>
    )
  }
}
