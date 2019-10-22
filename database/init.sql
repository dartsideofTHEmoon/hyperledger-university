CREATE DATABASE notary;
CREATE USER web WITH ENCRYPTED PASSWORD 'pass';
GRANT ALL PRIVILEGES ON DATABASE notary TO web;


//INSERT INTO public.users (id, email, password) VALUES ('64dd1b13-2794-43f7-9252-1c81bfd3b79d', 'notary@example.com', 'password');
