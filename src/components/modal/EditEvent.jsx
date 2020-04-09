import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import EventForm from './EventForm';
import AppContext from '../../context/App/appContext';

const EditEvent = () => {
  const [color, setColor] = useState('');
  const [eventName, setEventName] = useState('');
  const [checkbox, setCheckBox] = useState(false);
  const [showtime, setShowTime] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const appContext = useContext(AppContext);

  const { events, colors, selectedEvent, colorObj, editSelectedEvent } = appContext;

  useEffect(() => {
    if (Object.keys(selectedEvent).length > 0) {
      setColor(selectedEvent.bgColor);
      setEventName(selectedEvent.title);
      setCheckBox(selectedEvent.title);
      let start = "";
      let end = "";
      if (!selectedEvent.allDay) {
        setShowTime(false);
        start = `${moment(new Date(selectedEvent.start)).format()}`
        end = `${moment(new Date(selectedEvent.end)).format()}`
      } else {
        setShowTime(true);
        start = `${moment(new Date(selectedEvent.start)).format('YYYY-MM-DD')}`
        end = `${moment(new Date(selectedEvent.end)).format('YYYY-MM-DD')}`
      }
      setStartDate(new Date(start));
      setEndDate(new Date(end));
    }
    // eslint-disable-next-line
  }, [selectedEvent, events])

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
      allDay: checkbox,
      bgColor: color,
      backgroundColor: colorObj[color]
    }
    return event;
  }

  const editEvent = () => {
    const event = setEvent(selectedEvent.id);
    editSelectedEvent(event);
  }

  const closeModal = () => {

  }

  return (
    <div>
      <EventForm 
        modalId="edit-event"
        title="Edit Event"
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
        colorObj={colorObj}
        handleChange={handleChange}
        eventType={editEvent}
        buttonText="Update"
      />
    </div>
  )
}

export default EditEvent;
