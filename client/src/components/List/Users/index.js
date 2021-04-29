import React from "react";
import Table from "./Table";
import DashHeader from "../../DashHeader";
import { Dropdown, Input, Icon } from "semantic-ui-react";
import { ResetIcon } from "../../../icons";

export default function ListUsers({
  userDatas,
  roleSelection,
  handleBulkActionChange,
  bulkAction,
  handleBulkDelete,
  roleFilter,
  resetFilters,
  searchQuery,
  handleFilterChange,
  applyFilters,
  clearSearch,
  handleQueryChange,
  batchSelect,
  handleSelected,
  selectedUsers,
  page,
  hasPages,
  pages,
  nextPage,
  prevPage,
}) {
  return (
    <div>
      <DashHeader
        title="All Users"
        subtitle="Manage Users"
        action="Add New"
        method={() => console.log("Add New")}
      />
      <p>
        <strong>Results</strong> ({userDatas.length})
      </p>

      <div className="table__controls">
        <div style={{ display: "flex" }}>
          <div className="table__action">
            <Dropdown
              placeholder={"Bulk Actions"}
              onChange={(e, data) => handleBulkActionChange(e, data)}
              value={bulkAction}
              selection
              options={[
                { key: "default", value: "default", text: "Bulk Actions" },
                { key: "delete", value: "delete", text: "Delete" },
              ]}
            />
            <button onClick={() => handleBulkDelete()}>Apply</button>
          </div>

          <div className="table__action">
            {roleFilter !== "default" && (
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
              placeholder={"All Roles"}
              selection
              search
              onChange={(e, data) => handleFilterChange(e, data)}
              value={roleFilter}
              options={[
                { key: "default", value: "default", text: "All Roles" },
                ...roleSelection,
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
            <h3>Username</h3>
          </div>
          <div className="table__col head author">
            <h3>Role</h3>
          </div>
          <div className="table__col head categories">
            <h3>Email</h3>
          </div>
        </div>
      </form>

      <Table
        userDatas={hasPages ? pages[page - 1] : userDatas}
        selectedUsers={selectedUsers}
        handleSelected={handleSelected}
      />
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
