import React, { Component } from 'react';
//import { Grid } from '@material-ui/core';
import { Form, FormGroup, Label } from 'reactstrap';
import AuthContext from '../../context/auth-context';
import { Link } from 'react-router-dom';

class Register extends Component {
  state = {
    isLogin: false,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  submitHandler = (event) => {
    event.preventDefault();

    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            role
            tokenExpiration
          }
        }
      `,
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
              role
            }
          }
        `,
      };
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.role,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.submitHandler}>
          <div>
            <FormGroup>
              <Label htmlFor="firstName">First Name *</Label>
              <input
                type="text"
                className="textarea"
                placeholder="First Name"
                id="firstName"
                required
                minLength="3"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastName">Last Name *</Label>
              <input
                type="text"
                className="textarea"
                placeholder="Last Name"
                id="lastName"
                required
                minLength="3"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="birthDay">Birthday *</Label>
              <input
                type="Date"
                className="textarea"
                placeholder="Birthday"
                id="birthDay"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="Phone Number">Phone Number *</Label>
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                className="textarea"
                placeholder="xxx-xxx-xxxx"
                id="phoneNumber"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email *</Label>
              <input
                type="email"
                className="textarea"
                placeholder="Email"
                id="email"
                ref={this.emailEl}
                required
                minLength="5"
              />
            </FormGroup>
          </div>
          <FormGroup>
            <div>
              <Label htmlFor="password">Password *</Label>
              <input
                type="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain: one number one uppercase and lowercase letter, and at least 8 or more characters"
                className="textarea"
                placeholder="Password"
                id="password"
                ref={this.passwordEl}
                required
                minLength="5"
              />
            </div>
          </FormGroup>
          <br />
          <div>
            <button type="submit" className="btn">
              SIGN UP
            </button>
            <small>
              Already have an account? Login <Link to="/">here</Link>
            </small>
          </div>
        </Form>
      </div>
    );
  }
}

export default Register;
