import styles from "./App.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Approved from "./pages/approved";
import Pending from "./pages/pending";
import Rejected from "./pages/rejected";
import NewImages from "./pages/new";
import CustomNav from "./components/navbar";

function App() {
  return (
    <div className={styles.container}>
      <Router>
        <CustomNav />
        <Switch>
          <Route path="/approved" component={Approved} />
          <Route path="/pending" component={Pending} />
          <Route path="/rejected" component={Rejected} />
          <Route path="/new" component={NewImages} />
          <Route path="/">
            <Redirect to="/new" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
