import React from "react";
import { TrashIcon, ImageIcon, AudioIcon, VideoIcon } from "../../../icons";
import { Dropdown } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function MediaPicker({
  options,
  activeSelection,
  handleSelectChange,
  handleRemove,
  confirmSelection,
  handleOnDragEnd,
  label,
}) {
  return (
    <div className="textpicker">
      <label>
        {label === "category"
          ? "Categories:"
          : `${label[0].toUpperCase()}${label.substring(1)}(s):`}

        <span className="req">*</span>
      </label>
      {activeSelection && activeSelection.length > 0 && (
        <div className="textpicker__scroll">
          <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
            <Droppable droppableId="textpicker">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {activeSelection.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          className="textpicker__selected"
                        >
                          <span className="selected__title">
                            <span classname="selected__icon">
                              {renderIcon(label)}
                            </span>
                            <div className="selected__media__meta">
                              <label className="caption">
                                <strong>Caption: </strong>
                                {item.title}
                              </label>
                              <label className="url">
                                <strong>URL: </strong>
                                {item.url}
                              </label>
                            </div>
                          </span>
                          <button onClick={() => handleRemove(item._id)}>
                            <TrashIcon />
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
      <div className="textpicker__picker">
        <Dropdown
          onChange={(e, data) => handleSelectChange(e, data)}
          placeholder={`Select an existing ${label[0].toUpperCase()}${label.substring(
            1
          )}`}
          search
          selection
          options={options}
        />
        <button onClick={() => confirmSelection()}>
          Add Existing {`${label[0].toUpperCase()}${label.substring(1)}`}
        </button>
      </div>
      <div className="textpicker__footer">
        <span className="or">
          <span>Or</span>
        </span>
        <button>
          Upload A New {`${label[0].toUpperCase()}${label.substring(1)}`}
        </button>
      </div>
    </div>
  );
}

const renderIcon = (label) => {
  switch (label) {
    case "image":
      return <ImageIcon />;
    case "video":
      return <VideoIcon />;
    case "Audio File":
      return <AudioIcon />;
    default:
      return <ImageIcon />;
  }
};
