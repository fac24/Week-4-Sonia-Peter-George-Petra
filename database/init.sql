BEGIN;

-- Remove existing tables and repopulate db when script runs
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE sessions (
    sid CHAR(24) UNIQUE NOT NULL PRIMARY KEY,
    data JSON NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE posts {
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    recipe TEXT NOT NULL, 
    joke TEXT NOT NULL, 
    photo BLOB 
}

-- INSERT INTO users (name, email) VALUES (
--     'Cheese Lover',
--     'cheese@mascarp.one'
-- );

COMMIT;