import React from "react";
import { render } from "react-dom";
import "./styles.css";
import { Bookmarks } from "./bookmarks";
import { ProvideOptions } from "./hooks/useOptions.js";

render(
  <ProvideOptions>
    <Bookmarks />
  </ProvideOptions>,
  document.querySelector("#app")
);
