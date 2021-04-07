import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { useState } from "react";
import Input from "./Input";
import useStyles from "./styles";

const Auth = () => {
  const classes = useStyles();
  const state = null;
  const [isSignUp, switchMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {};
  const handleChange = () => {};

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSwitchMode = () => {
    switchMode((lastMode) => !lastMode);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstname"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastname"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="text"
            />
            <Input
              name="password"
              label="Password"
              handleShowPassword={handleShowPassword}
              type={showPassword ? "text" : "password"}
              autoComplete="false"
            />
            {isSignUp && (
              <Input
                name="repeatPassword"
                label="Confirm Password"
                handleShowPassword={handleShowPassword}
                type={showPassword ? "text" : "password"}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Button fullWidth color="secondary" variant='contained' onClick={handleSwitchMode}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
