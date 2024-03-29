import React, { useContext } from "react";
import EventButton from "./eventButton";
import DateCellRender from "./dateCellRender";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { message } from "antd";

const PreviewLeft = ({ selectedDate, selectedEvents }) => {
  const { store, actions } = useContext(Context);
  const mappedEvents = selectedEvents.map((event) => ({
    id: event.id,
    date: event.start_time.format("YYYY-MM-DD"),
    modifier: "success", // You might want to adjust this based on your needs
    description: event.description,
    title: event.title,
    time: [event.start_time, event.end_time],
  }));
  const addEvents = async (values) => {
    if (!Array.isArray(values.time)) {
      message.error("Event not created, select a time range");
      return;
    }
    const [start, end] = values.time;

    // Ajusta las horas, minutos y segundos de la fecha seleccionada
    const eventStart = new Date(
      Date.UTC(
        selectedDate.year(),
        selectedDate.month(),
        selectedDate.date(),
        start.hour(),
        start.minute(),
        start.second()
      )
    )
      .toISOString()
      .split(".")[0];

    const eventEnd = new Date(
      Date.UTC(
        selectedDate.year(),
        selectedDate.month(),
        selectedDate.date(),
        end.hour(),
        end.minute(),
        end.second()
      )
    )
      .toISOString()
      .split(".")[0];

    const event = {
      id: values.id,
      title: values.title,
      description: values.description,
      start_time: eventStart,
      end_time: eventEnd,
      user_id: store.user, // Asegúrate de obtener el id del usuario correctamente
    };

    // Guarda el evento usando la acción saveEvent
    actions.saveEvent(event);
  };
  const updateEvent = async (values) => {
    if (!Array.isArray(values.time)) {
      message.error("Event not created, select a time range");
      return;
    }
    const [start, end] = values.time;
    // Ajusta las horas, minutos y segundos de la fecha seleccionada
    const eventStart = new Date(
      Date.UTC(
        selectedDate.year(),
        selectedDate.month(),
        selectedDate.date(),
        start.hour(),
        start.minute(),
        start.second()
      )
    )
      .toISOString()
      .split(".")[0];

    const eventEnd = new Date(
      Date.UTC(
        selectedDate.year(),
        selectedDate.month(),
        selectedDate.date(),
        end.hour(),
        end.minute(),
        end.second()
      )
    )
      .toISOString()
      .split(".")[0];

    const event = {
      id: values.id,
      title: values.title,
      description: values.description,
      start_time: eventStart,
      end_time: eventEnd,
      user_id: store.user, // Asegúrate de obtener el id del usuario correctamente
    };

    console.log(values.time);
    console.log(event);

    // Guarda el evento usando la acción saveEvent
    actions.updateEvent(event);
  };

  return (
    <>
      <div id="PreviewLeftContainer">
        <div id="containerLeftTop">
          <div id="dayOfWeek">
            <h1> {selectedDate ? selectedDate.format("dddd") : ""}</h1>

            <div id="numberOfDayToPreview">
              {selectedDate ? selectedDate.format("D") : ""}
            </div>
          </div>
          <div id="eventsList">
            <DateCellRender
              listData={mappedEvents}
              handleEdit={updateEvent}
              handleDelete={actions.deleteEvent}
              showButtons={true}
            />
          </div>

          <EventButton
            onCreate={addEvents}
            selectedDate={selectedDate ? selectedDate.format("D-MMM") : ""}
            modalTitle={"Create Event"}
          >
            {"Create Event "}
            <FontAwesomeIcon icon={faPlus} />
          </EventButton>
        </div>
      </div>
    </>
  );
};

export default PreviewLeft;
