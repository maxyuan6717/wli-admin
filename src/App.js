import { useEffect, useState } from "react";
import styles from "./App.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Images from "./pages/images";
import CustomNav from "./components/navbar";
import { casCheck } from "./util/api";
import axios from "axios";
import { Base } from "./util/base";
import Login from "./pages/login";
import { Spinner } from "react-bootstrap";

function App() {
  const [authed, setAuthed] = useState(-1);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const onMount = async () => {
      const auth = await casCheck();
      if (
        !auth ||
        !auth.data.auth ||
        !auth.data.user ||
        !auth.data.user.netId
      ) {
        setAuthed(0);
      } else {
        setAuthed(1);
      }
    };
    onMount();
  }, []);

  return (
    <div className={styles.container}>
      {authed === -1 ? (
        <Spinner
          className="m-auto"
          animation="border"
          role="status"
          style={{ width: "100px", height: "100px" }}
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Router>
          <CustomNav />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/approved">
              {authed === 0 ? (
                <Redirect to="/login" />
              ) : (
                <Images status="approved" />
              )}
            </Route>
            <Route path="/pending">
              {authed === 0 ? (
                <Redirect to="/login" />
              ) : (
                <Images status="pending" />
              )}
            </Route>
            <Route path="/rejected">
              {authed === 0 ? (
                <Redirect to="/login" />
              ) : (
                <Images status="rejected" />
              )}
            </Route>
            <Route path="/new">
              {authed === 0 ? (
                <Redirect to="/login" />
              ) : (
                <Images status="new" />
              )}
            </Route>
            <Route path="/">
              {authed === 0 ? <Redirect to="/login" /> : <Redirect to="/new" />}
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
