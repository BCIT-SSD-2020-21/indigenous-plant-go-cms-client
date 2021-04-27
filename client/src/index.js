import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { AuthProvider } from "./context/AuthContext";

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./db");
const cors = require("cors");

const port = 8080;
(async function db() {
  await connection();
})();

app.use(cors());
app.use(express.json());
app.use("/api/v1", require("./routes/index.route"));
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

app.listen(port, () => {
  console.log("Listening to Port ", port);
});

module.exports = app;