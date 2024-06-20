

create table cities (
  id bigint auto_increment primary key,
  name varchar(255) not null,
  display_name varchar(255) not null,
  lat double not null,
  lon double not null,
  display_order int not null
);

create sequence cities_seq start with 1 increment by 1;