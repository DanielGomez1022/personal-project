import React from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Chatroom from './components/Chatrooms/Chatrooms'
import Login from './components/Login/Login'
import './routes.css'

export default (
   <div> 
       <nav>
           <Link to = "/">Home</Link>
           <Link to = "/chatrooms">Chatrooms</Link>
           <Link to = "/login">SignIn/SignUp</Link>
        </nav>
        <Switch>
        <Route exact path = "/" component = {Home} />
        <Route path = "/chatrooms" component = {Chatroom}/>
        <Route path = "/login" component = {Login}/>
         </Switch>
    </div>
)