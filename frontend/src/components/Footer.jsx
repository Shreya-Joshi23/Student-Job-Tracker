import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "#131313",
          color: "white",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexFlow: "column",
            }}
          >
            <Typography sx={{ textAlign: "center" }}>
              Student Job Tracker
              <br />
              2025 &#169; All Rights Reserved
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
