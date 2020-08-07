import Link from 'next/link'
import Field from './field'
import Router from 'next/router';
import {authenticate, authenticateAction, authorizationAction} from '../redux/actions/authActions'
import { setCookie, TOKEN } from '../utils/cookie'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Component } from 'react';
import { USER_LOGIN, BASE_URL_API } from '../pages/api/apiConfig';
import fetch from 'isomorphic-unfetch'


class SignIn extends Component{
  
  async handleSubmit(event){
    event.preventDefault()

    let emailElement = event.currentTarget.elements.email
    let passwordElement = event.currentTarget.elements.password
    let obj = {
      email: emailElement.value,
      password: passwordElement.value,
    }
    console.log('obj json ', obj)
    const rawResponse = await fetch(BASE_URL_API +'api/user/authention/' + USER_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    });
    const user = await rawResponse.json();
    console.log(user);
    setCookie(TOKEN, user.token)
    this.props.authorizationAction(user)
  }

  render() {
    return (
      <>
      <h1>Sign In</h1>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Field
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email"
        />
        <Field
          name="password"
          type="password"
          autoComplete="password"
          required
          label="Password"
        />
        <button type="submit">Sign in</button> or{' '}
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
    authorizationAction: (user) => dispatch(authorizationAction(user)),
  }
}

export default connect(null, mapDispatchToProps)(SignIn)
// export default SignIn
 