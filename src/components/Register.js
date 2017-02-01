import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import MainPage from './MainPage';

import * as firebase from 'firebase';

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      repeatPassword: '',
      error: '',
      logged: false,
      wait: false
    };

    this.getEmail = this.getEmail.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.getRepeatPassword = this.getRepeatPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  getPassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  getRepeatPassword(e) {
    this.setState({
      repeatPassword: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      wait: true,
      error: ''
    });
    if (this.state.password === this.state.repeatPassword) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          this.setState({
            logged: true,
            wait: false
          });
        })
        .catch(error => {
          this.setState({
            logged: false,
            error: error.message,
            wait: false
          });
        });
    }
    else {
      this.setState({
        error: 'Check passwords'
      });
    }
  }

  render() {
    if (this.state.logged) {
      return (
        <MainPage />
      );
    }
    else {
      return (
        <form className="login-form">
          <TextField
            hintText="Enter your e-mail"
            floatingLabelText="E-mail"
            onChange={this.getEmail}
          />
          <br />
          <TextField
            hintText="Enter your password"
            floatingLabelText="Password"
            type="password"
            onChange={this.getPassword}
          />
          <br />
          <TextField
            hintText="Enter your password again"
            floatingLabelText="Repeat password"
            type="password"
            onChange={this.getRepeatPassword}
          />
          <br /><br />
          <RaisedButton
            type="submit"
            label="Register"
            secondary={true}
            onClick={this.handleSubmit}
          />
          <br /><br />
          {this.state.wait && <CircularProgress size={60} thickness={5} className="progress-bar"/> }

          <p className="error-msg">{this.state.error}</p>
        </form>
      );
    }
  }
}
