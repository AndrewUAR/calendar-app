import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import './Toast.css';

import AppContext from '../../context/App/appContext';
import { useLocalStorage } from '../../hooks/storage';

const Toast = () => {
  const appContext = useContext(AppContext);
  const { activeEvents, events, activeCalendarEvents, deleteSelectedEvent, selected } = appContext;

  const [getActiveEvent, setActiveEvent] = useLocalStorage('eventActive');

  useEffect(() => {
    const interval = setInterval(() => {
      addEvent();
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  });

  useEffect(() => {
    console.log(getActiveEvent)
    if (Object.keys(getActiveEvent).length) {
      //play sound
    }
  }, [getActiveEvent]);

  const addEvent = () => {
    if (events.length) {
      for (let event of events) {
        const startEventDate = `${moment(new Date(event.start)).format('YYYY-MM-DDTHH:mm:ss')}`;
        const now = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');
        if (now < startEventDate) {
          activeEvents(event);
          setActiveEvent(event);
        }
      }
    }
  }

  const deleteEvent = event => {
    deleteSelectedEvent(event);
    selected({});
  }

  return (
    <>
      <div className="notification-container notification-bottom-left">
        { activeCalendarEvents.map((e, i) => 
          <div key={i} className="notification toast" style={{backgroundColor: e.backgroundColor}}>
            <button onClick={() => deleteEvent(e)}>X</button>
            <p className="notification-title">{e.title}</p>
            <p className="notification-subtitle">Overdue {moment(e.start).fromNow()}</p>
            <p className="notification-message">
              {e.description}
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default Toast;
