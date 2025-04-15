import { Paper } from "@mui/material";
import React from "react";
import Stats from "../components/Stats";

const Homepage = () => {
  return (
    <Paper elevation={6} sx={{ my: 3, p: 3 }}>
      <Stats />
    </Paper>
  );
};

export default Homepage;
