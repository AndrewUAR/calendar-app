import React, { useReducer } from 'react';
import _ from 'lodash';
import AppReducer from './appReducer';
import AppContext from './appContext';
import { useLocalStorage } from '../../hooks/storage';

import { ADD_EVENT, GET_EVENTS, SELECT_EVENT, EDIT_EVENT, DELETE_EVENT, ACTIVE_EVENTS, GET_ACTIVE_EVENTS } from '../types';

const AppState = props => {
  const initialState = {
    events: [],
    colors: ['Primary', 'Success', 'Info', 'Warning', 'Danger'],
    activeCalendarEvents: [],
    selectedEvent: {},
    colorObj: {
      primary: '#0275d8',
      success: '#5cd85c',
      info: '#5bc0de',
      warning: '#f0ad4e',
      danger: '#d9534f'
    }
  }

  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [item, setValue] = useLocalStorage('events');
  // eslint-disable-next-line no-unused-vars
  const [selectedItem, setSelectedItem] = useLocalStorage('selectedEvent');
  const [active, setActiveEvents] = useLocalStorage('activeCalendarEvents');
  // eslint-disable-next-line no-unused-vars
  const [getActiveEvent, setActiveEvent] = useLocalStorage('eventActive');

  const addEvent = event => {
    let userEvents = [...state.events];
    userEvents.push(event);
    setValue(userEvents);
    dispatch({
      type: ADD_EVENT,
      payload: userEvents
    });
  }

  const getEvents = () => {
    if (item) {
      dispatch({
        type: GET_EVENTS,
        payload: item
      })
    }
  }

  const getActiveEvents = () => {
    if (active) {
      dispatch({
        type: GET_ACTIVE_EVENTS,
        payload: active
      })
    }
  }

  const selected = event => {
    setSelectedItem(event);
    dispatch({
      type: SELECT_EVENT,
      payload: event
    });
  }

  const editSelectedEvent = event => {
    const newEvents = item.map(e => {
      return e.id === event.id ? event : e;
    })
    setValue(newEvents);
    dispatch({
      type: EDIT_EVENT,
      payload: newEvents
    });
  }

  const activeEvents = event => {
    console.log('active')
    let calendarEvents = [...state.activeCalendarEvents];
    calendarEvents.push(event);
    const activeEventsArray = _.uniqBy(calendarEvents, 'id');
    setActiveEvents(activeEventsArray);
    dispatch({ 
      type: ACTIVE_EVENTS, 
      payload: activeEventsArray 
    });
  }

  const deleteSelectedEvent = event => {
    const updatedEvents = item.filter(e => e.id !== event.id)
    setValue(updatedEvents);
    dispatch({
      type: DELETE_EVENT,
      payload: updatedEvents
    });

    const activeEventsArray = active.filter(e => e.id !== event.id);
    setActiveEvents(activeEventsArray);
    dispatch({ 
      type: ACTIVE_EVENTS, 
      payload: activeEventsArray 
    });

    setActiveEvent({});
  }

  

  return (
    <AppContext.Provider 
      value={{
        events: state.events,
        colors: state.colors,
        selectedEvent: state.selectedEvent,
        colorObj: state.colorObj,
        activeCalendarEvents: state.activeCalendarEvents,
        addEvent,
        getEvents,
        selected,
        editSelectedEvent,
        deleteSelectedEvent,
        activeEvents,
        getActiveEvents
      }}
    >
      {props.children}
    </AppContext.Provider>

  )
}

export default AppState
