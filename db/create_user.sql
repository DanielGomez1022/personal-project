INSERT INTO users
(username, password, image, email)
VALUES
($1, $2, $3, $4);

INSERT INTO profile
(image)
VALUES
($1);


SELECT id, username, image, email FROM users
WHERE email = $4;