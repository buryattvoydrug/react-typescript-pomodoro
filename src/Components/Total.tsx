import React, { Component } from 'react'
import { Link } from 'react-router-dom';

type TotalState = {
  totalThisSession: number,
}

export default class Total extends Component<{}, TotalState> {
  
  endSession = ():void => {
    localStorage.setItem('totalThisSession', '0');
    localStorage.setItem('lastTimer', '');
    localStorage.setItem('lastTimerName', '');
  }
  
  toStringDate = (seconds: number):string => {
    let mins = Math.floor(seconds / 60);
    let hours = Math.floor(mins / 60);
    let minsName = mins === 1? ' minute ' : ' minutes '; 
    let hoursName = hours === 1? ' hour ' : ' hours '; 
    return hours + hoursName + 'and ' + (mins - hours * 60) + minsName;
  }
  

  render() {

    return (
      <>
        <Link to='/' onClick={() => this.endSession()}>Новый сеанс</Link>
        <span>totalThisSession: {this.toStringDate(+(localStorage.getItem('totalThisSession') || 0))}</span>
      </>
    )
  }
}
