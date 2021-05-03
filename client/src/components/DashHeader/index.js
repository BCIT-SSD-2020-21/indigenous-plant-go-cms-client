import React from "react";

/*
  @desc UI component for the Dashboard header. Displays A title, and a controlled button.
  @controller null
*/
export default function DashHeader({ title, subtitle, action, method }) {
  return (
    <>
      <div className="dash__header">
        <div className="dash__title">
          <h2>{title}</h2>
          {action && method && (
            <button onClick={() => method()}>{action}</button>
          )}
        </div>
        {subtitle && <p style={{ margin: 0 }}>{subtitle}</p>}
      </div>
    </>
  );
}
