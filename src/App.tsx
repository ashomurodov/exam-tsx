import React, { Component } from "react";
import Home from "./pages/home";
import Item from "./pages/item";

interface AppState {
  token: string;
}

export default class App extends Component<{}, AppState> {
  state: AppState = {
    token: "",
  };

  addToken = (token: string) => {
    this.setState({ token });
    localStorage.setItem("token", token);
  };

  deleteToken = () => {
    localStorage.removeItem("token");
    this.setState({ token: "" });
  };

  componentDidMount() {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    if (token?.length) this.setState({ token });
  }
  render() {
    const { token } = this.state;

    if (token)
      return (
        <div className="App d-flex justify-content-center">
          <Item token={token} deleteToken={this.deleteToken} />
        </div>
      );

    return (
      <div className="App d-flex justify-content-center">
        <Home addToken={this.addToken} />
      </div>
    );
  }
}
