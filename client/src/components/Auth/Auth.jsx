import { useState } from "react";
import { GoogleLogin } from "react-google-login";
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
import Input from "./Input";
import useStyles from "./styles";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const Auth = () => {
  const classes = useStyles();
  const state = null;
  const [isSignUp, switchMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {};
  const handleChange = () => {};

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSwitchMode = () => {
    switchMode((lastMode) => !lastMode);
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
    console.log(res);
    console.log("Google signin was successful.");
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google signin was unsuccessful.");
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
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                onClick={renderProps.onClick}
                disable={renderProps.disabled.toString()}
                startIcon={<Icon />}
                variant="contained"
                fullWidth
              >
                Sign In With Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              onClick={handleSwitchMode}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
