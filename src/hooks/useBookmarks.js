import React, { useState, useEffect } from "react";
import { filter } from "./filter.js";
import { useOptions } from "./useOptions.js";

const rootTitle = "Bookmarks";

function useBookmarks() {
  const { defaultFolder } = useOptions();

  const [bookmarks, setBookmarks] = useState([]);
  const [currentFolder, setCurrentFolder] = useState({
    id: defaultFolder,
    title: rootTitle
  });
  const [path, setPath] = useState([]);
  const [allBookmarks, setAllBookmarks] = useState({
    bookmarks: [],
    folders: []
  });
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    getFolders();
  }, []);

  // Default folder has been changed in Options
  useEffect(() => {
    setCurrentFolder({
      id: defaultFolder,
      title: rootTitle
    });
    setPath([]);
  }, [defaultFolder]);

  function updateBookmarks() {}

  function getBookmarks(folder, bookmarks, folders) {}

  function getFolders() {
    let folders = [];

    function addFolder(id, title) {
      folders.push({ id, title });
    }

    function makeIndent(indentLength) {
      return "\u00A0\u00A0".repeat(indentLength);
    }

    function logItems(bookmarkItem, indent) {
      if (bookmarkItem.type === "folder") {
        if (bookmarkItem.id !== "root________") {
          addFolder(
            bookmarkItem.id,
            `${makeIndent(indent)}${bookmarkItem.title}`
          );
          indent++;
        }
        if (bookmarkItem.children) {
          bookmarkItem.children.forEach(child => logItems(child, indent));
        }
      }
    }

    function logTree(bookmarkItems) {
      logItems(bookmarkItems[0], 0);
      setFolders(folders);
    }

    function onRejected(error) {
      console.log(`An error: ${error}`);
    }

    var gettingTree = browser.bookmarks.getTree();
    gettingTree.then(logTree, onRejected);
  }

  function changeFolder({ currentFolder = "", nextFolder }) {}

  return {
    bookmarks,
    currentFolder,
    changeFolder,
    path,
    folders
  };
}

export { useBookmarks };
