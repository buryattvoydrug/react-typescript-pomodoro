import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import Timer from './Components/Timer';
import Total from './Components/Total';
import Set from './Components/Set';
import { context } from './context';
import { useState } from 'react';
import { IPomodoro } from './types';
import './scss/main.scss'


const App = () => {
    const [pomodoro, setPomodoro] = useState<IPomodoro>({
      timer: +(localStorage.getItem('lastPomodoroTimer') || 45), 
      break: +(localStorage.getItem('lastPomodoroBreak') || 15),
    });

    return (
      <context.Provider value={{ pomodoro, setPomodoro }}>
        <div className="container">
          <div className="app">
            <BrowserRouter>
                <Switch>
                  <Route path='/' element={<Timer/>}/>
                  <Route path='/total' element={<Total/>}/>
                  <Route path='/set' element={<Set/>}/>
                </Switch>
            </BrowserRouter>
          </div>
        </div>
      </context.Provider>
    )
  };

export default App;
