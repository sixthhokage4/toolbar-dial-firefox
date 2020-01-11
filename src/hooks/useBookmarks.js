import React, { useState, useEffect } from "react";
import { filter } from "./filter.js";
import { useOptions } from "./useOptions.js";

const rootTitle = "Bookmarks";

function useBookmarks() {
  const auth = useAuth();
  const user = auth.user;
  const database = auth.database;
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

  useEffect(() => {
    let bookmarksRef =
      process.env.NODE_ENV === "development"
        ? `dev/${user.uid}/`
        : `users/${user.uid}/`;
    bookmarksRef = database().ref(bookmarksRef);
    bookmarksRef.on("value", snap => {
      if (snap.val()) {
        updateBookmarks({
          fbBookmarks: snap.val()["bookmarks"],
          fbFolders: snap.val()["folders"]
        });
      } else {
        updateBookmarks({});
      }
    });
  }, []);

  // Default folder has been changed in Options
  useEffect(() => {
    setCurrentFolder({
      id: defaultFolder,
      title: rootTitle
    });
    setPath([]);
  }, [defaultFolder]);

  function updateBookmarks({ fbBookmarks = [], fbFolders = [] }) {
    setBookmarks(getBookmarks(currentFolder, fbBookmarks, fbFolders));
    setAllBookmarks({
      bookmarks: fbBookmarks,
      folders: fbFolders
    });
  }

  function getBookmarks(folder, bookmarks, folders) {
    folders = Object.keys(folders)
      .map(key => ({
        id: key,
        title: folders[key]["title"],
        url: "",
        parentID: folders[key]["parentID"] || defaultFolder
      }))
      .filter(({ parentID = defaultFolder }) => parentID === folder.id);

    bookmarks = Object.keys(bookmarks)
      .map(key => ({
        id: key,
        ...bookmarks[key]
      }))
      .filter(({ parentID = defaultFolder }) => parentID === folder.id);

    let sort = (a, b) => {
      let titleA = a.title.toUpperCase();
      let titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    };

    return filter([...folders.sort(sort), ...bookmarks.sort(sort)]);
  }

  function getFolders() {}

  function changeFolder({ currentFolder = "", nextFolder }) {
    setBookmarks(
      getBookmarks(nextFolder, allBookmarks.bookmarks, allBookmarks.folders)
    );
    if (currentFolder) {
      setPath([...path, currentFolder]);
    } else {
      setPath(path.slice(0, path.map(({ id }) => id).indexOf(nextFolder.id)));
    }
    setCurrentFolder(nextFolder);
  }

  return {
    bookmarks,
    currentFolder,
    changeFolder,
    path,
    folders: getFolders()
  };
}

export { useBookmarks };
