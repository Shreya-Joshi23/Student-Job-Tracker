import {
  Alert,
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
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const SignUp = () => {
  const [userData, setuserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError("Password and confirmPassword don't match");
      return;
    }
    try {
      setloading(true);
      const result = await axios.post(
        `${process.env.BACKEND_URL}/api/v1/auth/signup`,
        userData,
        {
          withCredentials: true,
        }
      );
      alert(result.data.message);
      setError("");
    } catch (error) {
      setError(error.message);
    }
    setloading(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setuserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper elevation={3} sx={{ margin: 4, padding: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              onChange={handleChange}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid>
                  <TextField
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    type="text"
                    id="username"
                    value={userData.username}
                    label="Username"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={userData.password}
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    value={userData.confirmPassword}
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>

              {error ? (
                <>
                  <Grid item xs={12}>
                    <Alert severity="error">{error}</Alert>
                  </Grid>
                </>
              ) : (
                <></>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "Signing up" : "Sign Up"}
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => {console.log("Navigate to login");navigate("/login")}}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default SignUp;
