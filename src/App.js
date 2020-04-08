import React from 'react';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import './App.css';
import Main from './components/Main';

const App = () => {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
