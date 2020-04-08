import React, { useState, useContext } from 'react';
import moment from 'moment';
import EventForm from './EventForm';
import AppContext from '../../context/App/appContext';

const AddEvent = () => {
  const [color, setColor] = useState('');
  const [eventName, setEventName] = useState('');
  const [checkbox, setCheckBox] = useState(false);
  const [showtime, setShowTime] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const appContext = useContext(AppContext);
  const { addEvent, events, colors } = appContext;

  const colorObj = {
    primary: '#0275d8',
    success: '#5cd85c',
    info: '#5bc0de',
    warning: '#f0ad4e',
    danger: '#d9534f'
  }

  const inputChange = (e) => {
    setEventName(e.target.value);
  }
  const onCheckBoxChange = (e) => {
    if (e.target.checked === true) {
      setShowTime(true);
      setCheckBox(true);
    } else {
      setShowTime(false);
      setCheckBox(false);
    }
  }
  const handleChange = (e) => {
    if (e.target.value !== 'Select color') {
      setColor(e.target.value);
    } else {
      setColor('');
    }
  }

  const onInputChange = (propertyName) => e => {
    console.log(propertyName)
    console.log(e)
    if (propertyName === 'startDate') {
      setStartDate(e);
    }
    if (propertyName === 'endDate') {
      setEndDate(e);
    }
  }
  const createEvent = (e) => {
    const event = setEvent(events.length + 1);
    console.log(event);
    addEvent(event);
    reset();
  }

  const reset = () => {
    setColor('');
    setEventName('');
    setCheckBox(false);
    setShowTime(false);
    setStartDate(new Date());
    setEndDate(new Date());
  }

  const setEvent = id => {
    let start = '';
    let end = '';
    if (!checkbox) {
      start = `${moment(startDate).format()}`
      end = `${moment(endDate).format()}`
    } else {
      start = `${moment(startDate).format('YYYY-MM-DD')}`
      end = `${moment(endDate).format('YYYY-MM-DD')}`
    }

    const event = {
      id,
      title: eventName,
      start,
      end,
      bgColor: color,
      backgroundColor: colorObj[color]
    }
    return event;
  }

  const closeModal = () => {
    reset()
  }

  return (
    <div>
      <EventForm 
        modalId="add-event"
        title="Add Event"
        closeModal={closeModal}
        eventName={eventName}
        inputChange={inputChange}
        onInputChange={onInputChange}
        checkbox={checkbox}
        onCheckBoxChange={onCheckBoxChange}
        showtime={showtime}
        startDate={startDate}
        endDate={endDate}
        color={color}
        colors={colors}
        handleChange={handleChange}
        eventType={createEvent}
        buttonText="Save"
      />
    </div>
  )
}

export default AddEvent
