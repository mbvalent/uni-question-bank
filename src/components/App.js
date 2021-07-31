import React from "react";
import SignUp from "./SignUp";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgetPassword from "./ForgetPassword";
import UpdateProfile from "./UpdateProfile";
import Home from "./Home";
import PaperSearchResult from "./PaperSearchResult";
import ViewPaper from "./ViewPaper";
import AdminDashboard from "./AdminDashboard";
import AddPaper from "./papers/AddPaper";
import EditPaper from "./papers/EditPaper";
import ViewPaperDetails from "./papers/ViewPaperDetails";
import Header from "./Header";
import NewHome from "./NewHome";

function App() {
  window.onunload = () => {
   // Clear the local storage
    window.MyStorage.clear()
  }
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute path="/profile" component={Dashboard} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/admin-dashboard" component={AdminDashboard} />
            <Route path="/signup" component={SignUp} />
            <Route path="/forget-password" component={ForgetPassword} />
            <Route path="/login" component={Login} />
            <Route path="/view-paper/:id" component={ViewPaper} />
            <Route exact path="/papers/add" component={AddPaper} />
            <Route exact path="/papers/edit/:id" component={EditPaper} />
            <Route exact path="/papers/:id" component={ViewPaperDetails} />
            <Route exact path="/search-all" component={NewHome} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
