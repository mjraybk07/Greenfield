import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import Register from './Register.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';



class LoginView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isActive: this.props.isActive || false
    }
    this.style = {
      display: this.state.isActive ? 'flex' : 'none'
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose() {
    this.setState({isActive: false})
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('/login', {email: this.state.email, password: this.state.password})
      .then((response) => {
        this.props.setUserIdToState(response.data.userId)
        localStorage.setItem('userId', response.data.userId)
      });
    this.setState({email: '', password: '', isActive: false})
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  render() {
    return (
      <div className="login-wrap" style={{display: this.state.isActive ? 'flex' : 'none'}}>

        <div className="container login-container">
        <button className="close-button-login" onClick={this.handleClose}><Link to="/">
            <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
       </Link></button>
          <div className="col-sm-6 col-sm-offset-3">
              <h1><span className="fa fa-sign-in"></span> Login</h1>
              <form action="/login" method="post">
                  <div className="form-group">
                      <label>Email</label>
                      <input type="text" className="form-control" name="email" onChange={this.handleEmailChange} value={this.state.email}/>
                  </div>
                  <div className="form-group">
                      <label>Password</label>
                      <input type="password" className="form-control" name="password" onChange={this.handlePasswordChange} value={this.state.password}/>
                  </div>
                  <button onClick={this.handleSubmit} className="btn-warning btn-lg"><Link to="/" style={{ textDecoration: 'none'}}>Login</Link></button>
              </form>
              <hr/>
              <p>Need an account?
                  <Link to="/signup"> Sign Up here</Link>
              </p>
              <p>Or go <Link to="/">home</Link>.</p>
          </div>
        </div>
      </div>
      
    )
  }
}

export default LoginView;