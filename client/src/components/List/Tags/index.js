import React from "react";
import DashHeader from "../../DashHeader";
import Table from "./Table";
import Modal from "../../Modal";
import { Dropdown, Input, Icon } from "semantic-ui-react";

export default function ListTags({
  newTag,
  newTagValue,
  tags,
  handleQueryChange,
  searchQuery,
  clearSearch,
  selectedTags,
  batchSelect,
  handleSelected,
  page,
  pages,
  hasPages,
  nextPage,
  prevPage,
  applySearch,
  submitNewTag,
  closeModal,
  handleDelete,
  modalActive,
  modalState,
  pendingDelete,
  applyDelete,
  handleEdit,
  editTag,
  editTagValue,
  applyEdit,
  pendingEdit,
}) {
  const editModal = () => (
    <>
      <fieldset style={style.fieldset}>
        <p style={style.label}>
          Tag name <span style={style.req}>*</span>
        </p>
        <Input
          onChange={(e) => editTag(e.target.value)}
          value={editTagValue}
          style={style.input}
          placeholder="Enter category name"
        />
      </fieldset>
      <button onClick={() => applyEdit()} className="field__button">
        Update category
      </button>
      <button
        onClick={() => closeModal()}
        style={{ color: "var(--highlight)" }}
      >
        Cancel
      </button>
    </>
  );

  const deleteModal = () => (
    <>
      <p>
        Deleting this tag will remove all instances of the tag&nbsp;
        <strong style={{ color: "var(--danger)" }}>
          {pendingDelete.tag_name}
        </strong>
        . Do you wish to proceed?
      </p>
      <button
        onClick={() => applyDelete("attempt delete")}
        className="field__button"
      >
        Yes, I know what I am doing.
      </button>
      <button onClick={() => closeModal()} className="field__button secondary">
        No, cancel my request.
      </button>
    </>
  );
  return (
    <div>
      <DashHeader title="Tags" />
      <div className="resource__container">
        <div className="resource__col left">
          <h3>Add New Tag</h3>
          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Tag name <span style={style.req}>*</span>
            </p>
            <Input
              onChange={(e) => newTag(e.target.value)}
              value={newTagValue}
              style={style.input}
              placeholder="Enter tag name"
            />
          </fieldset>

          <button onClick={() => submitNewTag()} className="field__button">
            Create new tag
          </button>
        </div>
        <div className="resource__col right">
          <p>
            <strong>Results</strong> ({tags.length})
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
                {searchQuery && (
                  <button onClick={() => clearSearch()} className="sub__action">
                    Clear search
                  </button>
                )}
                <Input
                  onChange={(e) => handleQueryChange(e)}
                  value={searchQuery}
                  style={{ ...style.input, minWidth: 250 }}
                  placeholder={`Enter search query`}
                />
                <button onClick={() => applySearch()}>Search</button>
              </div>
            </div>
          </div>

          <div className="table__heading table__row">
            <div className="table__col head select">
              <input
                type="checkbox"
                value={"select all"}
                onChange={(e) => batchSelect(e)}
              />
            </div>
            <div className="table__col head title">
              <h3>name</h3>
            </div>
          </div>

          <Table
            tags={hasPages ? pages[page - 1] : tags}
            selectedTags={selectedTags}
            handleSelected={handleSelected}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
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

          <Modal
            isActive={modalActive}
            title={
              modalState === "delete"
                ? `Delete ${pendingDelete.tag_name}?`
                : `Edit ${pendingEdit?.tag_name}`
            }
            closeModal={closeModal}
          >
            {modalState === "delete" ? deleteModal() : editModal()}
          </Modal>
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
