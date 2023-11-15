INSERT INTO users (username, password, email, first_name, last_name, is_host)
VALUES ('host1',
'password',
'host1@gmail.com',
'Jon',
'Snow',
 TRUE
);
INSERT INTO users (username, password, email, first_name, last_name, is_host)
VALUES ('guest',
'password',
'guest@gmail.com',
'John',
'Wick',
 FALSE
);

INSERT INTO listings (id, title, description, address, city, state, zipcode, price_per_day,image, host_id)
VALUES ('1',
'cabin in the woods',
'really nice, come to visit',
'12 parkway',
'salt lake city',
'utah',
'11111',
122.35,
'https://share-bb.s3.us-east-2.amazonaws.com/S3.png',
'host1'
);

INSERT INTO listings (id, title, description, address, city, state, zipcode, price_per_day,image, host_id)
VALUES ('2',
'beach house in hawaii',
'fancy steak and wine',
'123 I dont know street',
'Some city in hawaii',
'hawaii',
'23465',
1.35,
'https://share-bb.s3.us-east-2.amazonaws.com/S3.png',
'host1'
);