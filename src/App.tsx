import './App.css';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import Timer from './Components/Timer';
import Total from './Components/Total';

const App = () => (
      <>
        <BrowserRouter>
            <Switch>
              <Route path='/' element={<Timer timer={45} break={15}/>}/>
              <Route path='/total' element={<Total/>}/>
              {/* <Route path='/set' element={<Set/>}/> */}
            </Switch>
        </BrowserRouter>
      </>
    );

export default App;
