import React from 'react';
import './App.css';
import Timer from './Components/Timer';

function App() {
  return (
    <div className="App">
      <Timer timer={1} break={1}/>
    </div>
  );
}

export default App;
