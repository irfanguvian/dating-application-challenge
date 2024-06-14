CREATE TABLE public.user (
	 id bigserial NOT null primary key,
	 username varchar(255) NOT null unique, 
	 password varchar(255) not null, 
	 created_at timestamp NOT null default now(),
	 login_at timestamp null
);

 create INDEX user_find_by_username_idx ON public.user USING btree (username);


CREATE TABLE public.auth_token (
	 id bigserial NOT null primary key,
	 access_id varchar(255) NOT NULL, 
	 user_id bigint not null, 
	 created_at timestamp NOT null default now(),
	 expired_at timestamp not null 
);


create INDEX auth_token_by_access_id_idx ON public.auth_token USING btree (access_id);


CREATE TABLE public.user_detail (
	 id bigserial NOT null primary key,
	 user_id bigint NOT NULL, 
	 first_name varchar(255) not null, 
	 last_name varchar(255) NOT null,
	 email varchar(255) not null, 
	 created_at timestamp not null default now(), 
	 updated_at timestamp not null default now()
);

create INDEX user_detail_by_user_id_idx ON public.user_detail USING btree (user_id);


CREATE TABLE public.subcription (
	 id bigserial NOT null primary key,
	 user_id bigint NOT NULL, 
	 end_date timestamp null, 
	 status smallint not null,
	 created_at timestamp not null default now()
);

drop table subcription 

 create INDEX subcription_by_user_id ON public.subcription USING btree (user_id);


CREATE TABLE public.order (
	 id bigserial NOT null primary key,
	 order_number varchar(255) NOT NULL, 
	 user_id bigint not null, 
	 total_price bigint not null,
	 description text not null,
	 status smallint not null,
	 created_at timestamp not null default now(),
	 updated_at timestamp not null default now()

);

 create INDEX order_by_user_id ON public.order USING btree (user_id);


CREATE TABLE public.swipe_history (
	 id bigserial NOT null primary key,
	 user_id bigint not null, 
	 direction smallint not null,
	 swipe_user_id bigint not null,
	 created_at timestamp not null default now()
);

 create INDEX swipe_history_by_user_id ON public.swipe_history USING btree (user_id);



-- Insert data into public.user
INSERT INTO public.user (username, password, created_at, login_at) VALUES
('user1', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-01 10:00:00', '2023-06-10 12:00:00'),
('user2', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-02 11:00:00', '2023-06-11 13:00:00'),
('user3', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-03 12:00:00', '2023-06-12 14:00:00'),
('user4', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-04 13:00:00', '2023-06-13 15:00:00'),
('user5', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-05 14:00:00', '2023-06-14 16:00:00'),
('user6', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-06 15:00:00', '2023-06-15 17:00:00'),
('user7', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-07 16:00:00', '2023-06-16 18:00:00'),
('user8', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-08 17:00:00', '2023-06-17 19:00:00'),
('user9', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-09 18:00:00', '2023-06-18 20:00:00'),
('user10', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-10 19:00:00', '2023-06-19 21:00:00'),
('user11', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-11 20:00:00', '2023-06-20 22:00:00'),
('user12', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-12 21:00:00', '2023-06-21 23:00:00'),
('user13', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-13 22:00:00', '2023-06-22 00:00:00'),
('user14', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-14 23:00:00', '2023-06-23 01:00:00'),
('user15', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-15 00:00:00', '2023-06-24 02:00:00'),
('user16', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-16 01:00:00', '2023-06-25 03:00:00'),
('user17', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-17 02:00:00', '2023-06-26 04:00:00'),
('user18', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-18 03:00:00', '2023-06-27 05:00:00'),
('user19', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-19 04:00:00', '2023-06-28 06:00:00'),
('user20', '$2a$12$qO3lclk3/AxutABhflvfBehURJNdxjJ/NIn5plZ9ADMFPdGP.rH3W', '2023-06-20 05:00:00', '2023-06-29 07:00:00');

-- Insert data into public.auth_token
INSERT INTO public.auth_token (access_id, user_id, created_at, expired_at) VALUES
('access1', 1, '2023-06-01 10:00:00', '2023-07-01 10:00:00'),
('access2', 2, '2023-06-02 11:00:00', '2023-07-02 11:00:00'),
('access3', 3, '2023-06-03 12:00:00', '2023-07-03 12:00:00'),
('access4', 4, '2023-06-04 13:00:00', '2023-07-04 13:00:00'),
('access5', 5, '2023-06-05 14:00:00', '2023-07-05 14:00:00'),
('access6', 6, '2023-06-06 15:00:00', '2023-07-06 15:00:00'),
('access7', 7, '2023-06-07 16:00:00', '2023-07-07 16:00:00'),
('access8', 8, '2023-06-08 17:00:00', '2023-07-08 17:00:00'),
('access9', 9, '2023-06-09 18:00:00', '2023-07-09 18:00:00'),
('access10', 10, '2023-06-10 19:00:00', '2023-07-10 19:00:00'),
('access11', 11, '2023-06-11 20:00:00', '2023-07-11 20:00:00'),
('access12', 12, '2023-06-12 21:00:00', '2023-07-12 21:00:00'),
('access13', 13, '2023-06-13 22:00:00', '2023-07-13 22:00:00'),
('access14', 14, '2023-06-14 23:00:00', '2023-07-14 23:00:00'),
('access15', 15, '2023-06-15 00:00:00', '2023-07-15 00:00:00'),
('access16', 16, '2023-06-16 01:00:00', '2023-07-16 01:00:00'),
('access17', 17, '2023-06-17 02:00:00', '2023-07-17 02:00:00'),
('access18', 18, '2023-06-18 03:00:00', '2023-07-18 03:00:00'),
('access19', 19, '2023-06-19 04:00:00', '2023-07-19 04:00:00'),
('access20', 20, '2023-06-20 05:00:00', '2023-07-20 05:00:00');

-- Insert data into public.user_detail
INSERT INTO public.user_detail (user_id, first_name, last_name, email, created_at, updated_at) VALUES
(1, 'John', 'Doe', 'john.doe1@example.com', '2023-06-01 10:00:00', '2023-06-01 10:00:00'),
(2, 'Jane', 'Smith', 'jane.smith2@example.com', '2023-06-02 11:00:00', '2023-06-02 11:00:00'),
(3, 'Alice', 'Johnson', 'alice.johnson3@example.com', '2023-06-03 12:00:00', '2023-06-03 12:00:00'),
(4, 'Bob', 'Brown', 'bob.brown4@example.com', '2023-06-04 13:00:00', '2023-06-04 13:00:00'),
(5, 'Charlie', 'Davis', 'charlie.davis5@example.com', '2023-06-05 14:00:00', '2023-06-05 14:00:00'),
(6, 'David', 'Martinez', 'david.martinez6@example.com', '2023-06-06 15:00:00', '2023-06-06 15:00:00'),
(7, 'Eva', 'Garcia', 'eva.garcia7@example.com', '2023-06-07 16:00:00', '2023-06-07 16:00:00'),
(8, 'Frank', 'Wilson', 'frank.wilson8@example.com', '2023-06-08 17:00:00', '2023-06-08 17:00:00'),
(9, 'Grace', 'Moore', 'grace.moore9@example.com', '2023-06-09 18:00:00', '2023-06-09 18:00:00'),
(10, 'Hank', 'Taylor', 'hank.taylor10@example.com', '2023-06-10 19:00:00', '2023-06-10 19:00:00'),
(11, 'Ivy', 'Anderson', 'ivy.anderson11@example.com', '2023-06-11 20:00:00', '2023-06-11 20:00:00'),
(12, 'Jack', 'Thomas', 'jack.thomas12@example.com', '2023-06-12 21:00:00', '2023-06-12 21:00:00'),
(13, 'Karen', 'Jackson', 'karen.jackson13@example.com', '2023-06-13 22:00:00', '2023-06-13 22:00:00'),
(14, 'Larry', 'White', 'larry.white14@example.com', '2023-06-14 23:00:00', '2023-06-14 23:00:00'),
(15, 'Mona', 'Harris', 'mona.harris15@example.com', '2023-06-15 00:00:00', '2023-06-15 00:00:00'),
(16, 'Nate', 'Martin', 'nate.martin16@example.com', '2023-06-16 01:00:00', '2023-06-16 01:00:00'),
(17, 'Olivia', 'Thompson', 'olivia.thompson17@example.com', '2023-06-17 02:00:00', '2023-06-17 02:00:00'),
(18, 'Pete', 'Lee', 'pete.lee18@example.com', '2023-06-18 03:00:00', '2023-06-18 03:00:00'),
(19, 'Quinn', 'Walker', 'quinn.walker19@example.com', '2023-06-19 04:00:00', '2023-06-19 04:00:00'),
(20, 'Rose', 'Hall', 'rose.hall20@example.com', '2023-06-20 05:00:00', '2023-06-20 05:00:00');



-- Insert data into public.subcription
INSERT INTO public.subcription (user_id, end_date, status, created_at) VALUES
(1, '2023-12-01 10:00:00', 1, '2023-06-01 10:00:00'),
(2, '2023-12-02 11:00:00', 1, '2023-06-02 11:00:00'),
(3, '2023-12-03 12:00:00', 1, '2023-06-03 12:00:00'),
(4, '2023-12-04 13:00:00', 1, '2023-06-04 13:00:00'),
(5, '2023-12-05 14:00:00', 1, '2023-06-05 14:00:00'),
(6, '2023-12-06 15:00:00', 1, '2023-06-06 15:00:00'),
(7, '2023-12-07 16:00:00', 1, '2023-06-07 16:00:00'),
(8, '2023-12-08 17:00:00', 1, '2023-06-08 17:00:00'),
(9, '2023-12-09 18:00:00', 1, '2023-06-09 18:00:00'),
(10, '2023-12-10 19:00:00', 1, '2023-06-10 19:00:00'),
(11, '2023-12-11 20:00:00', 1, '2023-06-11 20:00:00'),
(12, '2023-12-12 21:00:00', 1, '2023-06-12 21:00:00'),
(13, '2023-12-13 22:00:00', 1, '2023-06-13 22:00:00'),
(14, '2023-12-14 23:00:00', 1, '2023-06-14 23:00:00'),
(15, '2023-12-15 00:00:00', 1, '2023-06-15 00:00:00'),
(16, '2023-12-16 01:00:00', 1, '2023-06-16 01:00:00'),
(17, '2023-12-17 02:00:00', 1, '2023-06-17 02:00:00'),
(18, '2023-12-18 03:00:00', 1, '2023-06-18 03:00:00'),
(19, '2023-12-19 04:00:00', 1, '2023-06-19 04:00:00'),
(20, '2023-12-20 05:00:00', 1, '2023-06-20 05:00:00');

-- Insert data into public.order
INSERT INTO public.order (order_number, user_id, total_price, description, status, created_at, updated_at) VALUES
('ORD001', 1, 100, 'Order description 1', 1, '2023-06-01 10:00:00', '2023-06-01 10:00:00'),
('ORD002', 2, 200, 'Order description 2', 1, '2023-06-02 11:00:00', '2023-06-02 11:00:00'),
('ORD003', 3, 300, 'Order description 3', 1, '2023-06-03 12:00:00', '2023-06-03 12:00:00'),
('ORD004', 4, 400, 'Order description 4', 1, '2023-06-04 13:00:00', '2023-06-04 13:00:00'),
('ORD005', 5, 500, 'Order description 5', 1, '2023-06-05 14:00:00', '2023-06-05 14:00:00'),
('ORD006', 6, 600, 'Order description 6', 1, '2023-06-06 15:00:00', '2023-06-06 15:00:00'),
('ORD007', 7, 700, 'Order description 7', 1, '2023-06-07 16:00:00', '2023-06-07 16:00:00'),
('ORD008', 8, 800, 'Order description 8', 1, '2023-06-08 17:00:00', '2023-06-08 17:00:00'),
('ORD009', 9, 900, 'Order description 9', 1, '2023-06-09 18:00:00', '2023-06-09 18:00:00'),
('ORD010', 10, 1000, 'Order description 10', 1, '2023-06-10 19:00:00', '2023-06-10 19:00:00'),
('ORD011', 11, 1100, 'Order description 11', 1, '2023-06-11 20:00:00', '2023-06-11 20:00:00'),
('ORD012', 12, 1200, 'Order description 12', 1, '2023-06-12 21:00:00', '2023-06-12 21:00:00'),
('ORD013', 13, 1300, 'Order description 13', 1, '2023-06-13 22:00:00', '2023-06-13 22:00:00'),
('ORD014', 14, 1400, 'Order description 14', 1, '2023-06-14 23:00:00', '2023-06-14 23:00:00'),
('ORD015', 15, 1500, 'Order description 15', 1, '2023-06-15 00:00:00', '2023-06-15 00:00:00'),
('ORD016', 16, 1600, 'Order description 16', 1, '2023-06-16 01:00:00', '2023-06-16 01:00:00'),
('ORD017', 17, 1700, 'Order description 17', 1, '2023-06-17 02:00:00', '2023-06-17 02:00:00'),
('ORD018', 18, 1800, 'Order description 18', 1, '2023-06-18 03:00:00', '2023-06-18 03:00:00'),
('ORD019', 19, 1900, 'Order description 19', 1, '2023-06-19 04:00:00', '2023-06-19 04:00:00'),
('ORD020', 20, 2000, 'Order description 20', 1, '2023-06-20 05:00:00', '2023-06-20 05:00:00');

-- Insert data into public.swipe_history
INSERT INTO public.swipe_history (user_id, direction, swipe_user_id, created_at) VALUES
(1, 1, 2, '2023-06-01 10:00:00'),
(2, 0, 3, '2023-06-02 11:00:00'),
(3, 1, 4, '2023-06-03 12:00:00'),
(4, 0, 5, '2023-06-04 13:00:00'),
(5, 1, 6, '2023-06-05 14:00:00'),
(6, 0, 7, '2023-06-06 15:00:00'),
(7, 1, 8, '2023-06-07 16:00:00'),
(8, 0, 9, '2023-06-08 17:00:00'),
(9, 1, 10, '2023-06-09 18:00:00'),
(10, 0, 11, '2023-06-10 19:00:00'),
(11, 1, 12, '2023-06-11 20:00:00'),
(12, 0, 13, '2023-06-12 21:00:00'),
(13, 1, 14, '2023-06-13 22:00:00'),
(14, 0, 15, '2023-06-14 23:00:00'),
(15, 1, 16, '2023-06-15 00:00:00'),
(16, 0, 17, '2023-06-16 01:00:00'),
(17, 1, 18, '2023-06-17 02:00:00'),
(18, 0, 19, '2023-06-18 03:00:00'),
(19, 1, 20, '2023-06-19 04:00:00'),
(20, 0, 1, '2023-06-20 05:00:00');