import React, { Component } from 'react'
import axios from 'axios'

export class Users extends Component {
    constructor(){
        super()
        this.state = {
            users = []
        }
    }

    // componentDidMount() {
    //     axios.get('/api/users').then(response => {
    //         this.setState({users: response.users})
    //     }).catch(error => {console.log('Error in /api/users')
    //     res.status(500).send
    // })
    // }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Users

