CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
username TEXT,
password TEXT,
image TEXT,
email TEXT
);

CREATE TABLE IF NOT EXISTS chatroom (
id SERIAL PRIMARY KEY,
subject TEXT,
creator integer references users(id)
);


INSERT INTO chatroom
(subject, creator)
VALUES
('movies', 2);

INSERT INTO users 
(username, password, image, email)
VALUES
('Timmy', 'DummyData', 'http://media-cache-ak0.pinimg.com/736x/26/4d/8a/264d8aab73176829df2cf89e64f9dc8f.jpg'),
('Daren', 'DummyData2', 'http://images.amcnetworks.com/ifc.com/wp-content/uploads/2011/05/darren-trumeter-whitest-kids-wkuk-ifc.jpg'),
('Sam', 'DummyData3', 'https://i.pinimg.com/736x/4c/4c/7c/4c4c7c64a44c74fd3eb364a16174c2d5.jpg');
