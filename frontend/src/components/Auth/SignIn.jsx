import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const SignIn = () => {
  const theme = createTheme();
  const navigate=useNavigate();
  const [userData,setuserData]=useState({
    username:"",
    password:""
  })

  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
      const result=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/signin`,userData,{
        withCredentials:true
      })
      alert(result.data.message)
      window.location.reload()
    }catch(error){
      console.log(error.message)
    }
  }

  const handleChange=(e)=>{
    e.preventDefault()
    const {name,value}=e.target;
    setuserData({...userData,[name]:value})
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper elevation={3} sx={{ margin: 4, padding: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              onChange={handleChange}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={userData.username}
                    autoComplete="username"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    value={userData.password}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    to="/signup"
                    variant="body2"
                    onClick={() => navigate("/signup")}
                  >
                    Already have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
