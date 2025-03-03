import { TextField, Box, Alert, MenuItem, Button, Typography } from "@mui/material";
import { FormControl, FormControlLabel, InputLabel } from "@mui/material";
import React, { useContext, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { MyThemeContext } from "../../context/MyThemeContext";

export default function MUIForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { currentUser, handleUpdateUser } = useUserContext();
  const { theme, darkMode } = useContext(MyThemeContext);

  const maxAttempts = 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userPassword === userEmail) {
      setSubmitResult("Password must not match email address");
      setAttemptsCount((prev) => prev + 1);
    } else if (userPassword.length < 8) {
      setSubmitResult("Password must be at least 8 characters long");
      setAttemptsCount((prev) => prev + 1);
    } else if (!/\d/.test(userPassword)) {
      setSubmitResult("Password must contain a number");
      setAttemptsCount((prev) => prev + 1);
    } else {
      setSubmitResult("Successful login.");
      handleUpdateUser({ email: userEmail });
      setIsLoggedIn(true);
    }
  };
  if ((isLoggedIn && currentUser.email) || attemptsCount >= maxAttempts){
    return(
    <Box sx={{p:4, backgroundColor: theme.background, color: theme.foreground}}>
        {
            isLoggedIn ? (<>
            <Typography variant="h5" component="h2">{`Welcome ${currentUser.email}!`}</Typography>
            <Alert severity="success" sx={{mt: 2}}>{submitResult}</Alert>
            </>): (<Alert severity="error">Too many failed login attempts - form is now disabled!</Alert>)
        }
    </Box>
    )
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center", 
        maxHeight: "450px",
        minWidth: '450px',
        backgroundColor: theme.background, 
        color: theme.foreground,
        borderRadius: '5px',
        border: "2px solid #ff7b00"
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        required
        fullWidth
        type="email"
        label="Email Address"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        type="password"
        label="Password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt:2, backgroundColor: '#ff7b00'}}>Login</Button>
      {submitResult && (
        <Alert severity={isLoggedIn ? 'Success' : 'error'} sx={{mt:2}}>{submitResult}</Alert>
      )}
      <Typography vairiant="body2" sx={{mt:2}}>
        {`Attempts: ${attemptsCount} of ${maxAttempts}`}
      </Typography>
    </Box>
  );
}
