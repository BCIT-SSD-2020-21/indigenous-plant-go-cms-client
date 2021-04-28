import React from "react";
import DashHeader from "../../DashHeader";
import { Dropdown, Input, Icon } from "semantic-ui-react";
import { ResetIcon } from "../../../icons";
import Table from "./Table";

export default function ListPlants({
  plantData,
  categories,
  handleFilterChange,
  handleQueryChange,
  applyFilters,
  clearSearch,
  searchQuery,
  categoryFilter,
  resetFilters,
  handleSelected,
  selectedPlants,
  batchSelect,
  pages,
  hasPages,
  page,
  prevPage,
  nextPage,
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
            {categoryFilter !== "default" && (
              <button
                onClick={() => resetFilters()}
                className="sub__action resets"
              >
                <span>
                  <ResetIcon />
                </span>
                Reset Filters
              </button>
            )}
            <Dropdown
              placeholder={"All Categories"}
              selection
              search
              onChange={(e, data) => handleFilterChange(e, data)}
              value={categoryFilter}
              options={[
                { key: "default", value: "default", text: "All Categories" },
                ...categories,
              ]}
            />
            <button onClick={() => applyFilters()}>Filter</button>
          </div>
        </div>

        <div>
          <div className="table__action" style={{ marginRight: 0 }}>
            {searchQuery && (
              <button onClick={() => clearSearch()} className="sub__action">
                Clear search
              </button>
            )}
            <Input
              onChange={(e) => handleQueryChange(e)}
              style={style.input}
              value={searchQuery}
              placeholder={`Enter search query`}
            />
            <button onClick={() => applyFilters()}>Search</button>
          </div>
        </div>
      </div>
      <form>
        <div className="table__heading table__row">
          <div className="table__col head select">
            <input
              type="checkbox"
              onChange={(e) => batchSelect(e)}
              value={"select all"}
            />
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

        <Table
          plantData={hasPages ? pages[page - 1] : plantData}
          handleSelected={handleSelected}
          selectedPlants={selectedPlants}
        />
      </form>
      {hasPages && (
        <div className="pagination__control">
          <div>
            <p style={{ marginBottom: "7px" }}>
              Page {page} of {pages.length}
            </p>
            <div className="control">
              <button onClick={() => prevPage()}>
                <Icon name="caret left" />
              </button>
              <span>{page}</span>
              <button onClick={() => nextPage()}>
                <Icon name="caret right" />
              </button>
            </div>
          </div>
        </div>
      )}
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
