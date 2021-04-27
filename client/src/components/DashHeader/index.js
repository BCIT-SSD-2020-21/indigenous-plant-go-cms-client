import React from "react";

export default function DashHeader({ title, action, method }) {
  return (
    <div className="dash__header">
      <h2>{title}</h2>
      {action && method && <button onClick={() => method()}>{action}</button>}
    </div>
  );
}
