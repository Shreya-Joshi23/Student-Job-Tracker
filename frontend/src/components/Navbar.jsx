import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userState from "../atom/useratom";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

const Navbar = () => {
  const user = useRecoilValue(userState);
  const setuser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const [quote, setquote] = useState("");

  const handleLogout = async (e) => {
    try {
      console.log("Logout called");
      const result = await axios.post(
        "http://localhost:5000/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setuser({
        isLoading: false,
        isAuthenticated: false,
        user: null,
      });
      alert(result.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getquotes = async () => {
      try {
        const response = await axios.get(
          "https://quotes-api-self.vercel.app/quote"
        );
        console.log(response.data);
        setquote(response.data.quote);
      } catch (error) {
        console.log(error.message);
      }
    };
    getquotes();
  }, []);

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", boxShadow: 2 }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              py: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Student Job Tracker
              </Typography>
            </Box>

            {user.user && (
              <Box
                sx={{
                  textAlign: "center",
                  flex: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold",color:"green" }}>
                  WELCOME BACK, {user.user.username}
                </Typography>
              </Box>
            )}
            <Box sx={{ flex: 1, textAlign: "right" }}>
              {!user.user ? (
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ marginRight: "5px" }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate("/signup")}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <Button variant="outlined" size="small" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mt: 1,
        }}
      >
        {quote && (
          <Box
            sx={{
              mt: 1,
              backgroundColor: "#f1f1f1",
              p: 2,
              borderRadius: 2,
              maxWidth: 500,
              textAlign: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontStyle: "italic", color: "#333" }}
            >
              “{quote}”
            </Typography>
            <Typography
              variant="caption"
              sx={{ display: "block", mt: 1, color: "#777" }}
            >
              — Daily Motivation
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
