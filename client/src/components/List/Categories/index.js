import React from "react";
import DashHeader from "../../DashHeader";
import { Dropdown, Input, Icon } from "semantic-ui-react";
import Table from "./Table";

export default function ListCategories({
  categories,
  label,
  dataLabel,
  labelPlural,
}) {
  return (
    <div>
      <DashHeader title={labelPlural} subtitle={`${label} Categories`} />
      <div className="resource__container">
        <div className="resource__col left">
          <h3>Add New {label} Category</h3>

          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Category name <span style={style.req}>*</span>
            </p>
            <Input style={style.input} placeholder="Enter category name" />
          </fieldset>

          <button className="field__button">Create new category</button>
        </div>
        <div className="resource__col right">
          <p>
            <strong>Results</strong> ({categories.length})
          </p>
          <div className="table__controls">
            <div style={{ display: "flex" }}>
              <div className="table__action">
                <Dropdown
                  placeholder={"Bulk Actions"}
                  selection
                  options={[
                    { key: "default", value: "default", text: "Bulk Actions" },
                    { key: "delete", value: "delete", text: "Delete" },
                  ]}
                />
                <button>Apply</button>
              </div>
            </div>

            <div>
              <div className="table__action" style={{ marginRight: 0 }}>
                <Input
                  style={{ ...style.input, minWidth: 250 }}
                  placeholder={`Enter search query`}
                />
                <button>Search</button>
              </div>
            </div>
          </div>
          <div className="table__heading table__row">
            <div className="table__col head select">
              <input type="checkbox" value={"select all"} />
            </div>
            <div className="table__col head title">
              <h3>name</h3>
            </div>
          </div>
          <Table categories={categories} />
        </div>
      </div>
    </div>
  );
}

const style = {
  input: {
    width: "100%",
    color: "var(--darksecondary)",
  },
  label: {
    color: "var(--darksecondary)",
    margin: 0,
    fontSize: 11,
    marginBottom: "3px",
  },
  fieldset: {
    marginBottom: "10px",
    padding: 0,
  },
  req: {
    color: "red",
    fontSize: 14,
  },
};
