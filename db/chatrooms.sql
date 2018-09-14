SELECT users.id, users.username, users.image, users.email, chatroom.id as chatroom_id, chatroom.subject, chatroom.creator FROM users
JOIN chatroom on(chatroom.creator = users.id);


