SELECT users.id, users.username, users.image, chatroom.id as chatroom_id FROM users 
JOIN chatroom on(chatroom.id = users.id)