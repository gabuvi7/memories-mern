import { AppBar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.jpg";

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.br}>

        </div>
      <Typography className={classes.heading} variant="h2" align="center">
        Memo
      </Typography>
      <img
        className={classes.image}
        src={memories}
        alt="memories"
        height="50"
        width="50"
      />
    </AppBar>
  );
};

export default Navbar;
