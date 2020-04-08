import React from 'react';

import AppState from './context/App/AppState';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import './App.css';
import Main from './components/Main';

const App = () => {
  return (
    <div className="App">
      <AppState>
        <Main />
      </AppState>
    </div>
  );
}

export default App;
