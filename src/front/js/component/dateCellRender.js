import React, { useContext } from "react";
import { Badge } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../store/appContext";

const DateCellRender = ({
  listData = [],
  handleEdit,
  handleDelete,
  showButtons,
}) => {
  const { store, actions } = useContext(Context);
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
          {showButtons && (
            <>
              {/* <button onClick={() => handleEdit(item.eventId)}>Editar</button> */}
              <button onClick={() => actions.deleteEvent(item.id)}>
                Eliminar
              </button>
              <button onClick={() => actions.updateEvent(item.id)}>
                Editar
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
export default DateCellRender;
