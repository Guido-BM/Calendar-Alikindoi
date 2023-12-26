import React, { useState } from "react";
import { ConfigProvider, Calendar } from "antd";
import moment from "moment";
import DateCellRender from "./dateCellRender";
import PreviewLeft from "./previewLeft";

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [savedMonthlyEvents, setSavedMonthlyEvents] = useState([]);

  const getListData = (value) => {
    console.log(selectedEvents);
    return savedMonthlyEvents.filter(
      (event) => event.date === value.format("D-MMM")
    );
  };

  const handleDateSelect = (date, info) => {
    if (info.source === "date") {
      const eventsForSelectedDate = getListData(date);

      setSelectedDate(date);
      setSelectedEvents(eventsForSelectedDate);
    }
  };
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const cellRender = (current, info) => {
    if (info.type === "date")
      return <DateCellRender listData={getListData(current)} />;
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Calendar: {
            itemActiveBg: "rgba(255,255,255, 0.3)",
            fullBg: "rgba(255,255,255, 0.4)",
            fullPanelBg: "rgba(255,255,255, 0.3)",
          },
          CalendarHeader: {
            background: "rgba(255,255,255, 0.3)", // Fondo del encabezado del calendario
          },
          CalendarHeaderButton: {
            background: "rgba(255,255,255, 0.3)", // Fondo de los botones del encabezado
          },
          CalendarHeaderSelect: {
            background: "rgba(255,255,255, 0.3)", // Fondo del select del encabezado
          },
        },
      }}
    >
      <PreviewLeft
        selectedDate={selectedDate}
        selectedEvents={getListData(selectedDate)}
        addEvents={(newEvent) => {
          const eventExists = savedMonthlyEvents.some(
            (event) =>
              event.title === newEvent.title &&
              event.date === newEvent.date &&
              event.time === newEvent.time
          );

          if (!eventExists) {
            setSavedMonthlyEvents([...savedMonthlyEvents, newEvent]);
          }
        }}
      />
      <Calendar onSelect={handleDateSelect} cellRender={cellRender} />
    </ConfigProvider>
  );
};

export default CalendarView;
