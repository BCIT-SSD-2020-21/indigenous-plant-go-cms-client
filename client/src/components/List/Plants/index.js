import React from "react";
import DashHeader from "../../DashHeader";
import { Dropdown, Input, Checkbox } from "semantic-ui-react";

export default function ListPlants({
  plantData,
  categories,
  handleFilterChange,
  applyFilter,
}) {
  return (
    <div>
      <DashHeader
        title="Plants"
        action="Add New"
        method={() => console.log("Add new")}
      />
      <p>
        <strong>Results</strong> ({plantData.length})
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

          <div className="table__action">
            <Dropdown
              placeholder={"All Categories"}
              selection
              search
              onChange={(e, data) => handleFilterChange(e, data)}
              options={[
                { key: "default", value: "default", text: "All Categories" },
                ...categories,
              ]}
            />
            <button onClick={() => applyFilter()}>Filter</button>
          </div>
        </div>

        <div>
          <div className="table__action" style={{ marginRight: 0 }}>
            <Input style={style.input} placeholder={`Enter search query`} />
            <button>Search</button>
          </div>
        </div>
      </div>
      <form>
        <div className="table__heading table__row">
          <div className="table__col head select">
            <Checkbox />
          </div>
          <div className="table__col head title">
            <h3>Title</h3>
          </div>
          <div className="table__col head author">
            <h3>Author</h3>
          </div>
          <div className="table__col head categories">
            <h3>Categories</h3>
          </div>
          <div className="table__col head tags">
            <h3>Tags</h3>
          </div>
          <div className="table__col head updated">
            <h3>Last Updated</h3>
          </div>
        </div>

        <ul className="table__list">
          {plantData &&
            plantData.length > 0 &&
            plantData.map((plant, index) => {
              const lastRevision = {
                date:
                  plant.revision_history[plant.revision_history.length - 1]
                    .date,
                user:
                  plant.revision_history[plant.revision_history.length - 1].user
                    .user_name,
              };

              return (
                <li className="table__row" key={index}>
                  <div className="table__col select">
                    <Checkbox value={plant._id} />
                  </div>
                  <div className="table__col title">
                    <p>{plant.plant_name}</p>
                    <span className="action">
                      <button type="button" value={plant._id}>
                        Edit&nbsp;
                      </button>
                      <button type="button" value={plant._id}>
                        &nbsp;Delete
                      </button>
                    </span>
                  </div>
                  <div className="table__col author">
                    <p>{plant.revision_history[0].user.user_name}</p>
                  </div>
                  <div className="table__col categories">
                    <p>
                      {plant.categories
                        .map((category) => category.category_name)
                        .join(", ")}
                    </p>
                  </div>
                  <div className="table__col tags">
                    {plant.tags.map((tag) => tag.tag_name).join(", ")}
                  </div>
                  <div className="table__col updated">
                    <p>
                      {lastRevision.date} by {lastRevision.user}
                    </p>
                  </div>
                </li>
              );
            })}
        </ul>
      </form>
    </div>
  );
}

const style = {
  input: {
    width: "100%",
    minWidth: "300px",
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
