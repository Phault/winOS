import React, { useContext } from "react";
import { MenuBar } from "../../widgets/menubar/MenuBar";
import { Item, Separator } from "react-contexify";
import { WindowContext } from "../../windows/WindowManager";
import { MenuBarMenu } from "../../widgets/menubar/MenuBarMenu";

export const NotepadMenuBar = () => {
  const window = useContext(WindowContext)!;

  return (
    <MenuBar>
      <MenuBarMenu label="File">
        <Item>New</Item>
        <Item>Open...</Item>
        <Item>Save</Item>
        <Item>Save As...</Item>
        <Separator />
        <Item>Page Setup...</Item>
        <Item>Print...</Item>
        <Separator />
        <Item onClick={() => window.destroy()}>Exit</Item>
      </MenuBarMenu>

      <MenuBarMenu label="Edit">
        <Item disabled>Undo</Item>
        <Separator />
        <Item disabled>Cut</Item>
        <Item disabled>Copy</Item>
        <Item disabled>Paste</Item>
        <Item disabled>Delete</Item>
        <Separator />
        <Item disabled>Find...</Item>
        <Item disabled>Find Next</Item>
        <Item>Replace...</Item>
        <Item>Go To...</Item>
        <Separator />
        <Item>Select All</Item>
        <Item>Time/Date</Item>
      </MenuBarMenu>

      <MenuBarMenu label="Format">
        <Item>Word Wrap</Item>
        <Item>Font...</Item>
      </MenuBarMenu>

      <MenuBarMenu label="View">
        <Item>Status Bar</Item>
      </MenuBarMenu>

      <MenuBarMenu label="Help">
        <Item>Help Topics</Item>
        <Separator />
        <Item>About Notepad</Item>
      </MenuBarMenu>
    </MenuBar>
  );
};
