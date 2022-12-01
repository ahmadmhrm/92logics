import React from "react";
import { CircularProgress } from "@material-ui/core";
import { Box } from "@material-ui/core";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "330px",
      }}
    >
      <CircularProgress size="5rem" />
    </Box>
  );
};

export default Loader;
