import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import { Box, Container, Typography } from "@mui/material";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import { useRecoilValue } from "recoil";
import userState from "./atom/useratom";

function App() {
  const user = useRecoilValue(userState);
  console.log(user.isAuthenticated);

  if (user.isLoading) {
    <Typography>Checking Authentication...</Typography>;
  }

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <Container maxWidth="xl">
          <Routes>
            <Route
              path="/"
              element={user.isAuthenticated ? <Homepage /> : <SignIn />}
            />
            <Route
              path="/login"
              element={!user.isAuthenticated ? <SignIn /> : <Homepage />}
            />
            <Route
              path="/signup"
              element={!user.isAuthenticated ? <SignUp /> : <Homepage />}
            />
          </Routes>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default App;
