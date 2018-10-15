import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css';


export class Profile extends Component {
    constructor() {
        super()
        this.state = {
            backgroundProfileImage: '',
            aboutMe: '',
            id: '',
            userInfo: []
        }
    }

    componentDidMount() {
        axios.get(`/api/get_logged_in_user`).then(response => {
            console.log(response.data, 'res.data')
            this.setState({userInfo: response.data})
        })
    }

    update = () => {
        let update = {
            aboutMe: this.state.aboutMe
        }
        axios.post('/user/update_profile', {update}).then((response) => {
           this.setState({aboutMe: response.data[0].aboutMe})
        })
    }

  render() {
      const userInfoToDisplay = this.state.userInfo.map((e, i) => {
          return (
              <div key = {i}>
                <div className = 'profile-container'>
                  <img className = 'profile-image' src = {e.image}/>
                <input className = 'bio' placeholder = 'Tell me about yourself!'/>
                  <div className = 'profile-username'>{e.username}</div>
                  <div className = 'email'>{e.email}</div>
                </div>
              </div>
          )
      })
    return (
      <div>
        {
            this.state.userInfo
            ?
        <div>
        <div>{userInfoToDisplay}</div>
        </div>
            :
            'You need to login first'
        }
      </div>
    )
  }
}
 export default Profile