import "./options.css";

function init() {
  async function getTheme() {
    return await browser.storage.local.get({ theme: "DefaultLight" });
  }

  function setTheme(theme) {
    browser.storage.local.set({ theme });
    themeDiv.className = theme;
  }

  function setLightTheme() {
    setTheme("DefaultLight");
  }

  function setDarkTheme() {
    setTheme("DefaultDark");
  }

  async function getFolder() {
    return await browser.storage.local.get({ folder: "toolbar_____" });
  }

  function setFolder(e) {
    browser.storage.local.set({ folder: e.target.value });
  }

  async function getTarget() {
    return await browser.storage.local.get({ new_tab: true });
  }

  function setTarget(e) {
    browser.storage.local.set({ new_tab: e.target.checked });
    toggleBodyClass("new-tab", e.target.checked);
  }

  async function getDialSize() {
    return await browser.storage.local.get({ larger_dials: true });
  }

  function setDialSize(e) {
    browser.storage.local.set({ larger_dials: e.target.checked });
    toggleBodyClass("larger-dials", e.target.checked);
  }

  function updateFolders(defaultFolder) {
    let folders = "";

    function addFolder(id, title) {
      let selected = id === defaultFolder ? " selected" : "";
      folders += `<option value="${id}"${selected}>${title}</option>`;
    }

    function makeIndent(indentLength) {
      return "&nbsp;&nbsp;".repeat(indentLength);
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
      selectFolder.innerHTML = folders;
    }

    function onRejected(error) {
      console.log(`An error: ${error}`);
    }

    var gettingTree = browser.bookmarks.getTree();
    gettingTree.then(logTree, onRejected);
  }

  function updateTarget(new_tab) {
    folderTarget.checked = new_tab;
    toggleBodyClass("new-tab", new_tab);
  }

  function updateDialSize(larger_dials) {
    dialSize.checked = larger_dials;
    toggleBodyClass("larger-dials", larger_dials);
  }

  function toggleBodyClass(className, value) {
    if (value) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
  }

  let themeDiv = document.querySelector("#theme");
  let lightButton = document.querySelector("#defaultLightBtn");
  let darkButton = document.querySelector("#defaultDarkBtn");
  let urlDiv = document.querySelector("#homepage-url");
  let selectFolder = document.querySelector("#selectFolder");
  let folderTarget = document.querySelector("#folderTarget");
  let dialSize = document.querySelector("#largerDials");
  getTheme().then(({ theme }) => (themeDiv.className = theme));
  getFolder().then(({ folder }) => updateFolders(folder));
  getTarget().then(({ new_tab }) => updateTarget(new_tab));
  getDialSize().then(({ larger_dials }) => updateDialSize(larger_dials));
  let homeURL = browser.runtime.getURL("dist/index.html");
  urlDiv.innerHTML = `<a href="${homeURL}">${homeURL}</a>`;

  lightButton.addEventListener("click", setLightTheme);
  darkButton.addEventListener("click", setDarkTheme);
  selectFolder.addEventListener("change", setFolder);
  folderTarget.addEventListener("change", setTarget);
  dialSize.addEventListener("change", setDialSize);
}

document.onload = init();
