-- CREATE DATABASE  naijabloodbank



CREATE TABLE bloodgroup (
  bg_id SERIAL PRIMARY KEY,
  bg VARCHAR(255),
  rhd VARCHAR(255),
  qty BIGINT,
  postdate TIMESTAMP --created Date
);


CREATE TABLE users (
  users_id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  email_verified BOOLEAN,
  f_name VARCHAR(255) ,
  l_name VARCHAR(255) ,
  postdate TIMESTAMP, --created Date
  last_login TIMESTAMP,
  phone BIGINT,
  user_loc_state VARCHAR(255),
  loc_lga VARCHAR(255),
  donor BOOLEAN,
  blood_group int REFERENCES bloodgroup(bg_id)
 );


CREATE TABLE bloodcenter (
  bc_id SERIAL PRIMARY KEY,
  centername VARCHAR(255),  -- name of the center
  locstate VARCHAR(255),  -- location State 
  loclga VARCHAR(255),  -- location L.G.A
  bg int REFERENCES bloodgroup(bg_id), --blood group
  qty INT,  -- blood Quantity
  postdate TIMESTAMP --created Date
  );

CREATE TABLE booking (
  bk_id SERIAL PRIMARY KEY,
  bg int REFERENCES bloodgroup(bg_id), -- blood group
  bc int REFERENCES bloodcenter(bc_id),  -- blood center 
  myusers INT REFERENCES users(users_id),  -- user
  p_status int REFERENCES payment(p_id), -- payment state
  postdate TIMESTAMP --created Date
);


CREATE TABLE payment (
  p_id SERIAL PRIMARY KEY,
  p_status BOOLEAN, -- payment status
  blood_center INT REFERENCES bloodcenter(bc_id), -- blood center 
  users_id INT REFERENCES users(users_id), -- user 
  postdate TIMESTAMP --created Date
);
