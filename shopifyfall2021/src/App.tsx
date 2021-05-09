import { BrowserRouter, Route, Switch } from "react-router-dom";
import MovieSearch from "./screens/MovieSearch";
import NomineesList from "./screens/NomineesList";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

function App() {
  if (localStorage.getItem("UUID") === null) {
    const UUIDToken = uuidv4();
    Cookies.set("UUID", UUIDToken);
    localStorage.setItem("UUID", UUIDToken);
  } else {
    const localStorageUUID = localStorage.getItem("UUID") as string;
    Cookies.set("UUID", localStorageUUID);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MovieSearch} />
        <Route exact path="/nominees/" component={NomineesList} />
        <Route exact path="/nominees/:uuid" component={NomineesList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
