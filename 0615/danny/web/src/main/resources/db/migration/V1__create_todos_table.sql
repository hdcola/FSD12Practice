create table todos (
    id bigserial primary key,
    name varchar(255) not null,
    completed boolean not null default false
);