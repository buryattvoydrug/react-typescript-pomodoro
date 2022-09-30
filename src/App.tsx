import React from 'react';
import './App.css';
import Timer from './Components/Timer';
import Total from './Components/Total';

function App() {
  return (
    <div className="App">
      <Timer timer={1} break={1}/>
      <Total />
    </div>
  );
}

export default App;
