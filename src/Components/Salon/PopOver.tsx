import React, { FC } from "react";
import { Popover, Typography } from "@mui/material";

const PopOver: FC<{
  anchor: HTMLElement | null;
  open: boolean;
  setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  titel: string;
}> = ({ anchor, open, setAnchor, titel }) => {
  return (
    <Popover
      id="mouse-over-popover"
      sx={{
        pointerEvents: "none",
      }}
      open={open}
      anchorEl={anchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={() => setAnchor(null)}
      disableRestoreFocus
    >
      <Typography sx={{ p: 1, fontWeight: "bold" }}>{titel}</Typography>
    </Popover>
  );
};

export default PopOver;
