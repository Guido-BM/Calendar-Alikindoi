import React from "react";
import { Badge } from "antd";
import { v4 as uuidv4 } from "uuid";

const DateCellRender = ({ listData = [] }) => {
  // const listData = getListData(value);
  console.log(listData);
  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={uuidv4()}>
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
