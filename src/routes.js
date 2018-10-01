import React from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Chatrooms from './components/Chatrooms/Chatrooms'
import Chatroom from './components/Chatroom/Chatroom'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'

import './routes.css'

export default (
   <div> 
       <nav className = "navigation">
           <Link to = "/">Home</Link>
           <Link to = "/chatrooms">Chatrooms</Link>
           <Link to = "/profile">Profile</Link>
           <Link to = "/login">Login/SignUp</Link>
        </nav>
        <Switch>
        <Route exact path = "/" component = {Home}/>
        <Route path = '/chatroom/:name' component={Chatroom}/>
        <Route path = "/chatrooms" component={Chatrooms}/>
        <Route path = "/profile" component = {Profile}/>
        <Route path = "/login" component = {Login}/>
         </Switch>
    </div>
)