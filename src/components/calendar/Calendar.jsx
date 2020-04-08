import React, { useContext, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import AppContext from '../../context/App/appContext';

const Calender = () => {
  const appContext = useContext(AppContext);
  const { events, getEvents } = appContext;

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, [events])

  return (
    <div className="col-lg-9">
      <div>
        <FullCalendar 
          defaultView="dayGridMonth" 
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]} 
          header={{ 
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          events={events}
        />
      </div>
    </div>
  )
}

export default Calender
