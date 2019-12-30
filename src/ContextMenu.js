import React from "react";
import styled from "@emotion/styled";

let optionsURL = browser.runtime.getURL("dist/options.html");

let Menu = styled.div(({ top, left }) => ({
  position: "absolute",
  top,
  left,
  fontFamily: "Arial, Helvetica, sans-serif;",
  fontSize: "14px",
  border: "1px solid #c7c7c7",
  backgroundColor: "#e0e0e0",
  "& a": {
    color: "#000",
    padding: "7px",
    textDecoration: "none",
    display: "block",
    cursor: "default",
    "&:hover": {
      backgroundColor: "#29b6f6"
    }
  }
}));

export default ({ top, left }) => (
  <Menu {...{ top, left }}>
    <a href={optionsURL} target="_blank">
      Change Wallpaper
    </a>
  </Menu>
);
