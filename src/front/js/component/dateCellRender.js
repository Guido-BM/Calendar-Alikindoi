import React from "react";
import { Badge } from "antd";

const DateCellRender = ({ listData = [] }) => {
  // const listData = getListData(value);

  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.date}>
          <Badge
            status={item.modifier}
            text={`${item.title} ${
              item.time
                ? `(${item.time[0].format("HH:mm")} - ${item.time[1].format(
                    "HH:mm"
                  )})`
                : ""
            }`}
          />
        </li>
      ))}
    </ul>
  );
};
export default DateCellRender;
