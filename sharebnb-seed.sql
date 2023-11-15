INSERT INTO users (username, password, email, first_name, last_name, is_host, createdAt)
VALUES ('host1',
'password',
'host1@gmail.com',
'Jon',
'Snow',
 TRUE,
 '2014-06-26 04:07:31'
);

INSERT INTO listings (id, title, description, address, city, state, zipcode, price_per_day,image, host_id, createdAt)
VALUES ('1',
'cabin in the woods',
'really nice, come to visit',
'12 parkway',
'salt lake city',
'utah',
'11111',
122.35,
'https://share-bb.s3.us-east-2.amazonaws.com/S3.png',
'host1',
 '2014-06-26 04:07:31'
);
