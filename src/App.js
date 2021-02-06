import React, { Component } from "react";
import ScrollToTop from "./ScrollToTop";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./routes/home";
// import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import SeeMorePage from "./routes/seeMorePage";

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
              <Route  exact path="/" component={() => <Home />} />
              <Route  exact path="/fullDetails" component={() => <SeeMorePage />} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
        <ToastContainer
          style={{ fontSize: "1.5rem", marginLeft: "1.2rem" }}
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
