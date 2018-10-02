module.exports = {
    read: (req, res) => {
        const {creator, subject, image} = req.body;
        const db = req.app.get('db')
        db.chatrooms([creator, subject, image]).then(chats=>{
          res.status(200).send(chats)
        }).catch(error => {
            console.log('error in all chatrooms', error)
            res.status(500).send('unexpected error occurred')
        })
    },

    create: (req, res) => {
        const db = req.app.get('db')
        const { subject, image } = req.body
        db.create_chatroom([ subject, req.session.user.id, image ]).then(newChatroom => {
            console.log(newChatroom)
            res.status(200).send(newChatroom)
        }).catch(error => {console.log('error in create_chatroom', error)
            res.status(500).send('unexpected error occurred')
    })
    },
    
    delete: (req, res) => {
        const db = req.app.get('db')
    db.delete_chatroom([this.props.match.params.name]).then(response => {
        res.status(200).send(response)
    }).catch(error => {console.log('error in delete chatroom', error)
        res.status(500).send('unexpected error when trying to delete')
    })
    },
    
    readUserInChatroom: (req, res) => {
        const db = req.app.get('db')
        const {username, image} = req.body
        db.get_user_in_chat_room([username, image]).then(response => {
            res.status(200).send(response)
        }).catch(error => {console.log('error in get user_in_chat_room', error)
        res.status(500).send('unexpected error occured')
    })
    },
    readUser: (req, res) => {
        const db = req.app.get('db')
        db.profile([req.session.user.id]).then(profiles => {
            res.status(200).send(profiles)
        }).catch(error => {console.log('error in profile', error)
        res.status(500).send('unexpected error occured')
    })
  }
}