import React, { Component } from 'react'
import axios from 'axios'
import './Home.css'

export default class UserNameRenderProps extends Component {
    state = {
        isLoading: false,
        data: null
    }

    componentDidMount(){
        this.setState({isLoading: true})
        axios.get('/api/get_logged_in_user').then(response => {
            this.setState({data: response.data[0], isLoading: false})
        }).catch(error => {
            console.log('-----------------error', error)
        })
    }

  render() {
      const {isLoading, data} = this.state
      const {children} = this.props
      console.log('---------------children', children)
      console.log('------------------data', data)
    return (
      <div>
        {(isLoading || !data)
        ? <div className = "title">Welcome To The Chat</div>
        : children(data)
        }
      </div>
    )
  }
}