import React from "react";
import { css } from "emotion";
import { useAuth } from "../hooks/useAuth.js";
import { Link } from "react-router-dom";

export const ContextMenu = ({ top, left }) => {
  const auth = useAuth();
  const signout = auth.signout;

  function handleSignOut() {
    signout();
  }

  return (
    <div
      className={css`
        position: absolute;
        top: ${top}px;
        left: ${left}px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        background-color: rgba(0, 0, 0, 0.65);
        & ul {
          list-style: none;
          padding: 5px 0;
          margin: 0;
        }
        & li {
          color: #fff;
          font-weight: bold;
          text-decoration: none;
          display: block;
          cursor: pointer;
          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
          a {
            text-decoration: none;
            color: #fff;
            padding: 10px;
            display: block;
          }
        }
      `}
    >
      <ul>
        <li>
          <Link to="/settings" target="_blank">
            Change Wallpaper
          </Link>
        </li>
        <li>
          <a onClick={handleSignOut}>Logout</a>
        </li>
      </ul>
    </div>
  );
};
