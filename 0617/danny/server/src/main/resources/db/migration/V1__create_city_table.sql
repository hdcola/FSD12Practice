create table users (
    id bigint auto_increment primary key,
    username varchar(255) not null unique,
    password varchar(255) not null,
    token varchar(255)
);

insert into users (username, password, token)
values ('admin', 'admin', 'P2GhOMApUHJpqYFLdiJnIpPqmBr_YcfO');

create table cities (
    id bigint auto_increment primary key,
    name varchar(255) not null,
    display_name varchar(255) not null,
    lat double not null,
    lon double not null,
    display_order int not null,
    user_id bigint,
    foreign key (user_id) references users(id)
);

insert into cities (name, display_name, lat, lon, display_order, user_id)
values ('Vancouver', 'Vancouver, Metro Vancouver Regional District, British Columbia, Canada', 49.2608724, -123.113952, 1,1);

insert into cities (name, display_name, lat, lon, display_order, user_id)
values ('Toronto', 'Toronto, Golden Horseshoe, Ontario, Canada', 43.6534817, -79.3839347, 2,1);

