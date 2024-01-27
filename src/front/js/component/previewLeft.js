import React, { useContext } from "react";
import CreateEventButton from "./createEventButton";
import DateCellRender from "./dateCellRender";
import { Typography } from "antd";
import moment from "moment";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const { Title } = Typography;

const PreviewLeft = ({ selectedDate, selectedEvents, addEvents }) => {
  const { store, actions } = useContext(Context);
  const mappedEvents = selectedEvents.map((event) => ({
    id: event.id,
    date: moment(event.start_time).format("YYYY-MM-DD"),
    modifier: "success", // You might want to adjust this based on your needs
    title: event.title,
    time: [moment(event.start_time), moment(event.end_time)],
  }));

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
              handleEdit={actions.updateEvent}
              handleDelete={actions.deleteEvent}
              showButtons={true}
            />
          </div>

          <CreateEventButton
            addEvents={addEvents}
            selectedDate={selectedDate ? selectedDate.format("D-MMM") : ""}
          />
        </div>
      </div>
    </>
  );
};

export default PreviewLeft;
