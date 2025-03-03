import React from 'react'
import { NavLink } from 'react-router-dom'


const HeaderLogin = () => {
  return (
    <div class="login-input">
    <input type="text" id="email" placeholder="E-mail"></input>
    <input type="password" id="password" placeholder="Password"></input>
    <button type="submit" class="btn">Login</button>
    <button type="submit" class="btn"><NavLink to='/signup'>Sign-Up</NavLink></button>
    </div>
  )
}

export default HeaderLogin
