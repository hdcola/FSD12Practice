create table cities (
  id bigint auto_increment primary key,
  name varchar(255) not null,
  display_name varchar(255) not null,
  lat double not null,
  lon double not null,
  display_order int not null
);

insert into cities (name, display_name, lat, lon, display_order)
values ('Kirkland', 'Kirkland, Agglomération de Montréal, Montréal (région administrative), Québec, Canada', 45.4529194, -73.8647559, 1);

insert into cities (name, display_name, lat, lon, display_order)
values ('Toronto', 'Toronto, Golden Horseshoe, Ontario, Canada', 43.6534817, -79.3839347, 2);