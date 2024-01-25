import React from "react";
import CreateEventButton from "./createEventButton";
import DateCellRender from "./dateCellRender";
import { Typography } from "antd";
import moment from "moment";

const { Title } = Typography;

const PreviewLeft = ({ selectedDate, selectedEvents, addEvents }) => {
  const mappedEvents = selectedEvents.map((event) => ({
    date: moment(event.start_time).format("YYYY-MM-DD"),
    modifier: "success", // You might want to adjust this based on your needs
    title: event.title,
    time: [moment(event.start_time), moment(event.end_time)],
  }));

  return (
    <>
      <div id="PreviewLeftContainer">
        <div id="dayOfWeek">
          <h1> {selectedDate ? selectedDate.format("dddd") : ""}</h1>
        </div>
        <div id="numberOfDayToPreview">
          {selectedDate ? selectedDate.format("D") : ""}
        </div>
        <DateCellRender listData={mappedEvents} />
        <CreateEventButton
          addEvents={addEvents}
          selectedDate={selectedDate ? selectedDate.format("D-MMM") : ""}
        />
      </div>
    </>
  );
};

export default PreviewLeft;
