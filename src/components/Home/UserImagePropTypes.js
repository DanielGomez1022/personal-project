import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Home.css'


 class UserImagePropTypes extends Component {
  render() {
      const {image} = this.props.user
    return (
      <div>
        <img className='profileImage' src={image} />
      </div>
    )
  }
}
export default UserImagePropTypes

UserImagePropTypes.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string.isRequired
  }).isRequired
}