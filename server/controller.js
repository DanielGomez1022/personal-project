module.exports = {

    read: (req, res) => {
        const {creator, subject} = req.body;
        const db = req.app.get('db')
        db.chatrooms([creator, subject]).then(chats=>{
          res.status(200).send(chats)
        }).catch(error => {
            console.log('error in all chatrooms', error)
            res.status(500).send('unexpected error occurred')
        })
    },

    create: (req, res) => {
        const db = req.app.get('db')
        const { subject, creator, image } = req.body
        db.create_chatroom([ subject, creator, image ]).then(newChatroom => {
            res.status(200).send(newChatroom)
        }).catch(error => {console.log('error in create_chatroom', error)
            res.status(500).send('unexpected error occurred')
    })
    }
}