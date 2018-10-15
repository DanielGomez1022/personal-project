CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
username  TEXT UNIQUE,
password TEXT,
image TEXT,
email TEXT
);


CREATE TABLE IF NOT EXISTS profile (
id serial PRIMARY KEY,
username integer references users(id),
image TEXT
);


CREATE TABLE IF NOT EXISTS chatroom (
id SERIAL PRIMARY KEY,
image text,
subject TEXT,
creator_id integer references users(id)
);
