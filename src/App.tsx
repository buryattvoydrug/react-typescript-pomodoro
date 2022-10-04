import './App.css';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import Timer from './Components/Timer';
import Total from './Components/Total';
import Set from './Components/Set';
import {context, defaultContext} from './context';

const App = () => (
      <context.Provider value={defaultContext}>
        <BrowserRouter>
            <Switch>
              <Route path='/' element={<Timer timer={45} break={15}/>}/>
              <Route path='/total' element={<Total/>}/>
              <Route path='/set' element={<Set/>}/>
            </Switch>
        </BrowserRouter>
      </context.Provider>
    );

export default App;
