import React from "react";
import { Link } from "react-router-dom";

export default function Table({ userDatas, selectedUsers, handleSelected }) {
  return (
    <ul className="table__list">
      {userDatas &&
        userDatas.length > 0 &&
        userDatas.map((user, index) => {
          return (
            <li
              className={
                selectedUsers.includes(user._id)
                  ? "table__row selected"
                  : "table__row"
              }
              key={index}
            >
              <div className="table__col select">
                <input
                  type="checkbox"
                  value={user._id}
                  checked={selectedUsers.includes(user._id) ? true : false}
                  onChange={(e) => handleSelected(e)}
                />
              </div>
              <div className="table__col title">
                <p>{user.user_name}</p>
                <span className="action">
                  <Link
                    // to={`/plants/edit/${plant._id}`}
                    type="button"
                    value={user._id}
                  >
                    Edit&nbsp;
                  </Link>
                  <button
                    type="button"
                    // onClick={(e) => handleDelete(e)}
                    value={user._id}
                  >
                    &nbsp;Delete
                  </button>
                </span>
              </div>
              <div className="table__col author">
                <p>{user.role}</p>
              </div>
              <div className="table__col categories">
                <p>{user.email}</p>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
