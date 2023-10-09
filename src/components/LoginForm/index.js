import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onGetUsername = event => this.setState({username: event.target.value})

  onGetPassword = event => this.setState({password: event.target.value})

  // If the the user clicks on the login button, and the user details were correct than this function is called
  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/')
  }

  // If the user enterd invalid username or password than this function will rund
  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  // whenever the user click on login button this function will runs

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    // If the jwtToken is undefined it again return the user to login route
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        {/* Login Form Card */}
        <form
          className="login-form-container"
          onSubmit={this.onSubmitLoginForm}
        >
          <div className="form-logo-container" style={{marginBottom: '15px'}}>
            <div className="app-logo" style={{justifySelf: 'flex-start'}}>
              <img
                src="https://www.freepnglogos.com/uploads/logo-website-png/logo-website-website-tools-design-website-name-logo-posters-and-25.png"
                alt="website logo"
                width="80px"
                height="80px"
              />
              <span className="joby-app-text">Joby App</span>
            </div>
          </div>
          <label className="form-label" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            className="form-input"
            type="text"
            value={username}
            title="Enter Username rahul"
            onChange={this.onGetUsername}
            placeholder="Enter Username as rahul"
            id="username"
          />
          <br />
          <br />
          <label className="form-label" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            className="form-input"
            type="password"
            title="Enter Password as rahul@2021"
            value={password}
            onChange={this.onGetPassword}
            placeholder="Enter Password rahul@2021"
            id="password"
          />
          <br />
          <br />
          <button className="form-submit-button" type="submit">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
        {/* Login form right side thumbnail image container */}
        <div className="form-img-container">
          <img
            src="img/LoginpageAnime.png"
            alt="login thumbnail"
            width="100%"
          />
        </div>
      </div>
    )
  }
}

export default LoginForm
