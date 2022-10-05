import './App.css';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import Timer from './Components/Timer';
import Total from './Components/Total';
import Set from './Components/Set';
import { context } from './context';
import React, { useState } from 'react';
import { IPomodoro } from './types';

const App = () => {
    const [pomodoro, setPomodoro] = useState<IPomodoro>({
      timer: +(localStorage.getItem('lastPomodoroTimer') || 45), 
      break: +(localStorage.getItem('lastPomodoroBreak') || 15),
    });

    return (
      <context.Provider value={{ pomodoro, setPomodoro }}>
        <BrowserRouter>
            <Switch>
              <Route path='/' element={<Timer/>}/>
              <Route path='/total' element={<Total/>}/>
              <Route path='/set' element={<Set/>}/>
            </Switch>
        </BrowserRouter>
      </context.Provider>
    )
  };

export default App;
