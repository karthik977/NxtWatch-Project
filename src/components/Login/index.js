import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showerror: false,
    errorMsg: '',
    passwrdShow: true,
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = () => {
    this.setState({
      showerror: true,
      errorMsg: "*Username and Password didn't match",
    })
  }

  onSubmitted = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure()
    }
  }

  onShowPasswrd = () => {
    this.setState(prevState => ({passwrdShow: !prevState.passwrdShow}))
  }

  render() {
    const {username, password, showerror, errorMsg, passwrdShow} = this.state
    const passType = passwrdShow ? 'password' : 'text'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container-login">
        <div className="card-container-login">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
              className="logo-image"
            />
          </div>
          <form className="text-container" onSubmit={this.onSubmitted}>
            <label htmlFor="username" className="username">
              USERNAME
            </label>

            <input
              type="text"
              className="input-el"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.changeUsername}
            />
            <label htmlFor="password" className="username">
              PASSWORD
            </label>
            <input
              type={passType}
              className="input-el"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.changePassword}
            />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox-el"
                onChange={this.onShowPasswrd}
              />
              <label htmlFor="checkbox" className="checkbox-text">
                Show Password
              </label>
            </div>
            <button className="btn" type="submit">
              Login
            </button>
          </form>
          {showerror && <p className="warning-msg">{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default Login
