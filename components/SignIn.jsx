import Link from 'next/link'
import Field from './field'
import Router from 'next/router';
import {authenticate, authenticateAction, authorizationAction, USER_FETCH_REQUESTED} from '../redux/actions/authActions'
import { setCookie, TOKEN } from '../utils/cookie'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Component } from 'react';
import { USER_LOGIN } from '../pages/api/apiConfig';
import fetch from 'isomorphic-unfetch'
import { Button, TextField } from '@material-ui/core';


class SignIn extends Component{
  
  async handleSubmit(event){
    event.preventDefault()

    let emailElement = event.currentTarget.elements.email
    let passwordElement = event.currentTarget.elements.password
    let obj = {
      email: emailElement.value,
      password: passwordElement.value,
    }
    this.props.authorizationAction(obj)
  }

  render() {
    return (
      <>
      <h1>Sign In</h1>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <TextField
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email"
        />
        <TextField
          name="password"
          type="password"
          autoComplete="password"
          required
          label="Password"
        />
        <Button variant="contained" color="primary" type="submit">Sign in</Button>
        or{' '}
        <Link href="signup">
          <a>Sign up</a>
        </Link>
      </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // authorizationAction: (user) => dispatch(authorizationAction(user)),
    authorizationAction: (user) => dispatch({type: USER_FETCH_REQUESTED, user: user})
  }
}

export default connect(null, mapDispatchToProps)(SignIn)
// export default SignIn
 