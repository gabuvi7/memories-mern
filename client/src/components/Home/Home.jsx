import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "../../actions/posts";
import { useResizeScreen } from "../../customHooks/useResizeScreen";
import { Grid, Grow, Container } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const { screen } = useResizeScreen();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          style={{
            flexDirection: `${screen.sWidth <= 600 ? "column-reverse" : ""}`,
          }}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
