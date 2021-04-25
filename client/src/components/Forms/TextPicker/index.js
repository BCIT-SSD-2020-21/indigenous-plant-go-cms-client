import React from "react";
import { TrashIcon } from "../../../icons";
import { Dropdown } from "semantic-ui-react";

export default function TextPicker({
  options,
  activeSelection,
  handleSelectChange,
  handleRemove,
  confirmSelection,
}) {
  return (
    <div className="textpicker">
      <label>
        Location(s)<span className="req">*</span>
      </label>
      <div className="textpicker__scroll">
        <ul>
          {activeSelection.map((item, index) => (
            <li key={index} className="textpicker__selected">
              <span>{item.title}</span>
              <button onClick={() => handleRemove(item._id)}>
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="textpicker__picker">
        <Dropdown
          onChange={(e, data) => handleSelectChange(e, data)}
          placeholder="Select an existing location"
          search
          selection
          options={options}
        />
        <button onClick={() => confirmSelection()}>
          Add Existing Location
        </button>
      </div>
      <div className="textpicker__footer">
        <span className="or">
          <span>Or</span>
        </span>
        <button>Create A New Location</button>
      </div>
    </div>
  );
}
