// import { useContext } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
// import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Router() {
  // const { currentUser } = useContext(AuthContext);

  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Link to="/login" />;
  //   }

  //   return children;
  // };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          {/* <ProtectedRoute> */}
            <Home />
          {/* </ProtectedRoute> */}
        </Route>
        <Route path="/:login">
          <Login />
        </Route>
        <Route path="/:register">
          <Register />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
