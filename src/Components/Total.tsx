import { Component } from 'react'
import { Link } from 'react-router-dom';
import '../scss/total.scss';

type TotalState = {
  totalThisSession: number,
}
type TotalOutputState = {
  hours: string,
  minutes: string,
}

export default class Total extends Component<{}, TotalState> {
  
  endSession = ():void => {
    localStorage.setItem('totalThisSession', '0');
    localStorage.setItem('lastTimer', '');
    localStorage.setItem('lastTimerName', '');
  }
  
  toStringDate = (seconds: number):TotalOutputState => {
    let mins = Math.floor(seconds / 60);
    let hours = Math.floor(mins / 60);
    let minsName = mins === 1? ' minute ' : ' minutes '; 
    let hoursName = hours === 1? ' hour ' : ' hours '; 
    return { hours: hours + hoursName, minutes: 'and ' + (mins - hours * 60) + minsName};
  }
  

  render() {
    const thisSession = +(localStorage.getItem('totalThisSession') || 0);
    const { hours, minutes } = this.toStringDate(thisSession);
    return (
      <>
        <div className="total__text">
        {thisSession ? 
          <>
          <h3>good job!</h3>
          <span className="total__hours">today you spent <strong>{hours}</strong></span>
          <span className="total__minutes"><strong>{minutes}</strong> with benefit</span>
          </>
          :
          <h3>just do it!</h3>}
         </div>
        <div className="ok__button">
          <Link to='/' onClick={() => this.endSession()}>
            <img src="/images/ok.png" alt="" />
          </Link>
        </div>
      </>
    )
  }
}
