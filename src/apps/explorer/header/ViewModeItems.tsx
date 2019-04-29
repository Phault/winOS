import React from "react";
import { Item } from "react-contexify";

export function ViewModeItems() {
  return (
    <React.Fragment>
      <Item>Thumbnails</Item>
      <Item>Tiles</Item>
      <Item>Icons</Item>
      <Item>List</Item>
      <Item>Details</Item>
    </React.Fragment>
  );
}
