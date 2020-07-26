import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Form, FormGroup, Label } from 'reactstrap';
import AuthContext from '../context/auth-context';
import { Link } from 'react-router-dom';

class AuthPage extends Component {
  state = {
    isLogin: true,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.roleEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isLogin: !prevState.isLogin };
    });
  };

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
          <Grid item lg={12}>
            <div>
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
          </Grid>
          <FormGroup>
            <div>
              <Label htmlFor="password">Password *</Label>
              <input
                type="password"
                className="textarea"
                placeholder="Password"
                id="password"
                ref={this.passwordEl}
                required
              />
            </div>
          </FormGroup>
          {/* <FormGroup>
            <div>
              <Label htmlFor="role">Role *</Label>
              <input
                type="text"
                className="textarea"
                placeholder="user/admin"
                id="role"
                ref={this.roleEl}
                required
              />
            </div>
          </FormGroup> */}
          <br />
          <div>
            <button type="submit" className="btn">
              LOGIN
            </button>
            <small>
              Need an account? Register <Link to="/register">here</Link>
            </small>
          </div>
        </Form>
      </div>
    );
  }
}

export default AuthPage;
