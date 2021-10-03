ALTER TABLE IF EXISTS ONLY users DROP CONSTRAINT IF EXISTS pk_users_id CASCADE;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL NOT NULL,
    name varchar,
    password varchar
);
ALTER TABLE ONLY users ADD CONSTRAINT pk_users_id PRIMARY KEY (id);

INSERT INTO users (id, name, password) VALUES(1, 'test@password.com', '$2b$12$M.2KydyGpc7A4eSrXtEQ5eOVWrkZ.Ca8wh.teN7HpPJLl3mMAhToe');
INSERT INTO users (id, name, password) VALUES(2, 'hello@hello.com', '$2b$12$z92lNTdi1s1k.oUsYz1fM.C5T133MyaXJpqmDZqThpu7EruHUrYjK');
SELECT pg_catalog.setval('users_id_seq', 2, true);