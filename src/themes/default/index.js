import React, { Fragment } from "react";
import Box from "./Box.js";
import Title from "./Title.js";
import Grid from "./Grid.js";
import Link from "./Link.js";
import Theme from "./Theme.js";
import Breadcrumbs from "./Breadcrumbs.js";

export default ({
  bookmarks,
  currentFolder,
  path,
  theme,
  isRoot,
  changeFolder,
  folderTarget,
  handleContextMenu
}) => (
  <Theme {...{ theme }} onContextMenu={handleContextMenu}>
    {!isRoot && (
      <Breadcrumbs
        {...{ theme, path, currentFolder, changeFolder, handleContextMenu }}
      />
    )}
    <Grid {...{ currentFolder, isRoot }} onContextMenu={handleContextMenu}>
      {bookmarks.map(({ title, url, type, name, id }) => (
        <Fragment key={id}>
          <Link
            {...{
              url,
              type,
              id,
              title,
              changeFolder,
              currentFolder,
              isRoot,
              folderTarget
            }}
          >
            <Box {...{ name, type, theme }} />
            <Title {...{ title, theme }} />
          </Link>
        </Fragment>
      ))}
    </Grid>
  </Theme>
);
