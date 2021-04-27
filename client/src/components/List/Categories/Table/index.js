import React from "react";

export default function Table({ categories }) {
  return (
    <ul className="table__list">
      {categories &&
        categories.length > 0 &&
        categories.map((category, index) => {
          return (
            <li className="table__row" key={index}>
              <div className="table__col select">
                <input type="checkbox" />
              </div>
              <div className="table__col title">
                <p>{category.category_name}</p>
                <span className="action">
                  <button type="button" value={category._id}>
                    Edit&nbsp;
                  </button>
                  <button type="button" value={category._id}>
                    &nbsp;Delete
                  </button>
                </span>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
