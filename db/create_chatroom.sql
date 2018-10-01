INSERT INTO chatroom
(subject, creator_id, image)
VALUES
($1, $2, $3);
SELECT * FROM chatroom
