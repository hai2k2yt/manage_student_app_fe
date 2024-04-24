import PropTypes from 'prop-types';
// @mui
import { Button, Card, Container, DialogTitle } from '@mui/material';
import Iconify from '../../../../components/Iconify';
import { CalendarStyle, CalendarToolbar } from '../../calendar';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timelinePlugin from '@fullcalendar/timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DialogAnimate } from '../../../../components/animate';
import useSettings from '../../../../hooks/useSettings';
import { useDispatch, useSelector } from '../../../../redux/store';
import { useEffect, useRef, useState } from 'react';
import { getEvents, openModal, selectEvent, updateEvent } from '../../../../redux/slices/calendar';
import ClubSessionCalendarForm from './ClubSessionCalendarForm';
import ClubSessionCalendarToolbar from './ClubSessionCalendarToolbar';

// ----------------------------------------------------------------------

ClubSessionCalendar.propTypes = {
  id: PropTypes.string,
};

const selectedEventSelector = (state) => {
  const { events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    return events.find((_event) => _event.id === selectedEventId);
  }
  return null;
};

const eventsInit = [
  {
    id: '1',
    title  : 'event1',
    description: 'des1',
    start  : '2024-04-15',
  },
  {
    id: '2',
    title  : 'event2',
    start  : '2024-04-15',
    end  : '2024-04-17'
  },
  {
    id: '3',
    title  : 'event3',
    start  : '2024-04-08',
  }
]

export default function ClubSessionCalendar({ id }) {
  const { themeStretch } = useSettings();

  const calendarRef = useRef(null);

  const [date, setDate] = useState(new Date());

  const [view, setView] = useState( 'dayGridMonth' );

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [events, setEvents] = useState(eventsInit)

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };


  const handleSelectEvent = (arg) => {
    const selectEvent = events.find(e => e.id = arg.event.id);
    setSelectedEvent(selectEvent);
    setIsOpenModal(true)
  };



  const handleDropEvent = async ({ event }) => {

  };

  const handleAddEvent = () => {

  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleClickDate = (args) => {
    setIsOpenModal(true)
    console.log(args);
  };


  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>

      <Button
        variant="contained"
        startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
        onClick={handleAddEvent}
      >
        New Event
      </Button>

      <Card>
        <CalendarStyle>
          <ClubSessionCalendarToolbar
            date={date}
            onNextDate={handleClickDateNext}
            onPrevDate={handleClickDatePrev}
            onToday={handleClickToday}
          />
          <FullCalendar
            weekends
            editable
            droppable
            selectable
            events={events}
            eventColor='purple'
            ref={calendarRef}
            rerenderDelay={10}
            initialDate={date}
            initialView={view}
            dayMaxEventRows={3}
            eventDisplay="block"
            headerToolbar={false}
            allDayMaintainDuration
            eventResizableFromStart
            eventDrop={handleDropEvent}
            eventClick={handleSelectEvent}
            dateClick={handleClickDate}
            height={ 720 }
            plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
          />
        </CalendarStyle>
      </Card>

      <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
        <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>

        <ClubSessionCalendarForm event={selectedEvent || {}} onCancel={handleCloseModal} />
      </DialogAnimate>
    </Container>
  );
}
