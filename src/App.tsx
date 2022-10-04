import './App.css';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import Timer from './Components/Timer';
import Total from './Components/Total';
import Set from './Components/Set';
import {AppContextInterface, context, defaultContext } from './context';
import React, { useState } from 'react';

const App = () => {
    return (
      <context.Provider value={defaultContext}>
        <BrowserRouter>
            <Switch>
              <Route path='/' element={<Timer timer={45} break={15}/>}/>
              <Route path='/total' element={<Total/>}/>
              <Route path='/set' element={<Set/>}/>
            </Switch>
        </BrowserRouter>
      </context.Provider>
    )
  };

export default App;
