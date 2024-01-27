import React, { useState, useContext, useEffect } from "react";
import { ConfigProvider, Calendar, Button } from "antd";
import { Context } from "../store/appContext";
import DateCellRender from "./dateCellRender";
import PreviewLeft from "./previewLeft";
import moment from "moment";

const CalendarView = () => {
  const { store, actions } = useContext(Context);
  const selectedDate = store.selectedDate;
  const selectedEvents = store.selectedEvents;
  const savedMonthlyEvents = store.savedMonthlyEvents;
  const setSelectedDate = actions.setSelectedDate;
  const setSelectedEvents = actions.setSelectedEvents;
  const setSavedMonthlyEvents = actions.setSavedMonthlyEvents;

  useEffect(() => {
    actions.loadUserEvents();
  }, []);

  const getListData = (value) => {
    const datesToRender = savedMonthlyEvents.filter((event) => {
      const eventDate = moment(event.start_time);
      return (
        eventDate.year() === value.year() &&
        eventDate.month() === value.month() &&
        eventDate.date() === value.date()
      );
    });
    if (!datesToRender) return [];
    return datesToRender;
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
  const listData = savedMonthlyEvents.map((event) => ({
    date: moment(event.start_time).format("YYYY-MM-DD"),
    modifier: "success", // You might want to adjust this based on your needs
    title: event.title,
    time: [moment(event.start_time), moment(event.end_time)],
  }));
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
    if (info.type === "date") {
      const listData = getListData(current).map((event) => ({
        date: moment(event.start_time).format("YYYY-MM-DD"),
        modifier: "success", // You might want to adjust this based on your needs
        title: event.title,
        time: [moment(event.start_time), moment(event.end_time)],
      }));
      // console.log(listData);
      return <DateCellRender listData={listData} />;
    }
    // if (info.type === "month") return monthCellRender(current);
    // return info.originNode;
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
      {/* <Button onClick={() => actions.loadUserEvents()}>SYNC</Button> */}
      {/* <Button onClick={() => actions.logOut()}>LOGOUT</Button> */}
      <Calendar onSelect={handleDateSelect} cellRender={cellRender} />
    </ConfigProvider>
  );
};

export default CalendarView;
