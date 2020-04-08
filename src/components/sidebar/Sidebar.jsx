import React, { useContext } from 'react';
import AddEvent from '../modal/AddEvent';
import AppContext from '../../context/App/appContext';

const Sidebar = () => {
  const appContext = useContext(AppContext);
  const { events, selected } = appContext;
  return (
    <div className="col-lg-3">
      <button data-toggle="modal" data-target="#add-event" className="btn btn-primary btn-block">
        Create new event
      </button>
      <div className="m-t-20">
        <br />
        {
          events.length > 0 
          ? events.map(event => 
            <div key={event.id} className={`external-event bg-${event.bgColor}`} onClick={() => selected(event)}>
              {event.title}
            </div>
            )
          : 'No events added'
          
        }
      </div>
      <AddEvent />
    </div>
  )
}

export default Sidebar;

