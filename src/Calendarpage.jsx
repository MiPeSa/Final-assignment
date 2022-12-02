import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridplugin from '@fullcalendar/timegrid'
import { useState, useEffect } from "react";
import dayjs from 'dayjs';

export default function Calendarpage() {

    const [events, setEvents] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setEvents(data))
    }
 
    const EventItem = ({ info }) => {

        return (
            <div className="event-box">
                <p>{info.timeText}</p>               
                <p>{info.event.extendedProps.activity} / {info.event.extendedProps.customer.firstname} {info.event.extendedProps.customer.lastname}</p>
            </div>
            );
          };


    return (
        <div className="calendar-header">
                <h1>Training Calendar</h1>
            <div>
                <FullCalendar
                    editable
                    selectable 
                    height='900px'
                    expandRows={true}
                    dayMaxEvents={true}
                    eventBackgroundColor='lightblue'
                    eventBorderColor='lightblue'
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        meridiem: 'short'
                    }}
                    events={events}
                    headerToolbar={{
                        start: "today prev next",
                        center: 'title',
                        end: "dayGridMonth timeGridWeek timeGridDay",
                    }}
                    initialView='dayGridMonth'
                    eventContent={(events) => <EventItem info={events} />}
                    plugins={[daygridPlugin, interactionPlugin, timeGridplugin]}
                    views={["dayGridMonth", "timeGridWeek", "timeGridDay"]}
                />
            </div>

        </div>
    )
};