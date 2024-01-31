import React, { useContext } from "react";
import { Badge, Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../store/appContext";
import EventButton from "./eventButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <li className="listaEventosPreviewLeft" key={uuidv4()}>
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
            <div style={{ display: "flex", flexGrow: "1" }}>
              <span style={{ flexGrow: "1", paddingLeft: "15px" }}>
                {item.description}
              </span>
              <EventButton
                onCreate={handleEdit}
                eventId={item.id}
                modalTitle={"Update Event"}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </EventButton>
              <Button type="text" onClick={() => actions.deleteEvent(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
export default DateCellRender;
