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
        <div>Loading....</div>
      ) : authed === 0 ? (
        <div
          onClick={async () => {
            window.location.href = `${Base}/auth/cas`;
          }}
        >
          Login with CAS
        </div>
      ) : (
        <Router>
          <CustomNav />
          <Switch>
            <Route path="/approved">
              <Images status="approved" />
            </Route>
            <Route path="/pending">
              <Images status="pending" />
            </Route>
            <Route path="/rejected">
              <Images status="rejected" />
            </Route>
            <Route path="/new">
              <Images status="new" />
            </Route>
            <Route path="/">
              <Redirect to="/new" />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
