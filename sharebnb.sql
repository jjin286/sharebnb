--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Homebrew)
-- Dumped by pg_dump version 15.4 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.listings DROP CONSTRAINT listings_host_id_fkey;
ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_listing_id_fkey;
ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_guest_id_fkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
ALTER TABLE ONLY public.listings DROP CONSTRAINT listings_pkey;
ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_pkey;
ALTER TABLE public.listings ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.bookings ALTER COLUMN id DROP DEFAULT;
DROP TABLE public.users;
DROP SEQUENCE public.listings_id_seq;
DROP TABLE public.listings;
DROP SEQUENCE public.bookings_id_seq;
DROP TABLE public.bookings;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bookings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    guest_id character varying(50) NOT NULL,
    listing_id integer NOT NULL,
    check_in_date timestamp with time zone NOT NULL,
    check_out_date timestamp with time zone NOT NULL,
    date_time_booked timestamp with time zone NOT NULL,
    price numeric(10,2) NOT NULL
);


--
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- Name: listings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.listings (
    id integer NOT NULL,
    title character varying(70) NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    address character varying(100) NOT NULL,
    city character varying(20) NOT NULL,
    state character varying(20) NOT NULL,
    zipcode character varying(10) NOT NULL,
    price_per_day numeric(10,2) NOT NULL,
    image character varying(150) NOT NULL,
    host_id character varying(50) NOT NULL
);


--
-- Name: listings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.listings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: listings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.listings_id_seq OWNED BY public.listings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    is_host boolean NOT NULL
);


--
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- Name: listings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listings ALTER COLUMN id SET DEFAULT nextval('public.listings_id_seq'::regclass);


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.bookings (id, guest_id, listing_id, check_in_date, check_out_date, date_time_booked, price) FROM stdin;
12	happyyy	10	2023-11-17 08:57:59.668-05	2023-11-17 08:57:59.668-05	2023-11-17 08:58:00.49-05	123.50
13	happyyy	10	2023-11-17 09:00:28.376-05	2023-11-17 09:00:28.376-05	2023-11-17 09:01:08.574-05	123.50
14	happyyy	10	2023-11-17 09:01:08.522-05	2023-11-17 09:01:08.522-05	2023-11-17 09:02:36.582-05	123.50
15	happyyy	10	2023-11-17 09:02:36.533-05	2023-11-17 09:02:36.533-05	2023-11-17 09:03:38.06-05	123.50
16	happyyy	10	2023-11-17 09:03:38.025-05	2023-11-17 09:03:38.025-05	2023-11-17 09:03:38.949-05	123.50
17	happyyy	10	2023-11-17 09:03:38.944-05	2023-11-17 09:03:38.944-05	2023-11-17 09:04:56.585-05	123.50
18	happyyy	10	2023-11-17 09:04:56.533-05	2023-11-17 09:04:56.533-05	2023-11-17 09:06:06.924-05	123.50
19	happyyy	10	2023-11-17 09:06:06.838-05	2023-11-17 09:06:06.838-05	2023-11-17 09:06:08.379-05	123.50
20	happyyy	10	2023-11-17 09:06:08.373-05	2023-11-17 09:06:08.373-05	2023-11-17 09:07:38.692-05	123.50
23	mellow123	18	2023-11-22 00:00:00-05	2023-11-30 00:00:00-05	2023-11-17 15:27:39.114-05	266.00
24	mellow123	10	2023-11-22 00:00:00-05	2023-11-29 00:00:00-05	2023-11-17 15:30:24.124-05	123.50
\.


--
-- Data for Name: listings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.listings (id, title, description, address, city, state, zipcode, price_per_day, image, host_id) FROM stdin;
10	Green Studio with Backyard	small & cozy	111 Royal Roal	New York	New York	123321	123.50	https://sharebnbnb.s3.us-east-2.amazonaws.com/sharbnb1.jpeg	happeee
14	Cabin In the Woods	Really nice, full of oxygen	345 Garden Road	Colorado	Denver	23456	157.00	https://sharebnbnb.s3.us-east-2.amazonaws.com/sharebnb4.jpg	happy123
15	Beach House next to the ocean	hot and sandy	222 Beach Road	Los Angelos	CA	91234	12.00	https://sharebnbnb.s3.us-east-2.amazonaws.com/sharebnb6.jpg	happy123
16	Forest Escape	Come to our tree house	123 Freeway	Westchester	NY	12345	250.00	https://sharebnbnb.s3.us-east-2.amazonaws.com/sharebnb3.avif	happy123
17	LIttle Cozy Backyard	we have a cute golden retriever in the backyard	123 Woodstock Way	Woodstock	NY	12345	346.00	https://sharebnbnb.s3.us-east-2.amazonaws.com/sharebnb8.jpeg	happy123
18	Cozy Summer Escape 	We have a big space for a group of friends	1234 Vegas Highway	Las Vegas	NV	98765	266.00	https://sharebnbnb.s3.us-east-2.amazonaws.com/sharebnb8.webp	happy123
19	Mountain View Mansion	Huge House for family and friends in front of the mountain	123 Vermon Road	Stew	Vermont	12344	222.00	https://sharebnbnb.s3.us-east-2.amazonaws.com/sharebnb11.jpeg	happy123
20	A lovely space	cute	123 drivewayt	city	ny	12344	12345.00	https://sharebnbnb.s3.us-east-2.amazonaws.com/sharebnb10.jpeg	mellow123
21	a shoe box	shoe box	123 shoe way	Shoe City	Shoe State	123333	678.00	https://sharebnbnb.s3.us-east-2.amazonaws.com/sharebnb12.jpeg	mellow123
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (username, password, email, first_name, last_name, is_host) FROM stdin;
host1	password	host1@gmail.com	Jon	Snow	t
guest	password	guest@gmail.com	John	Wick	f
rich man	$2b$12$tpZqyd7JAvB536fENX58IutxIWF8WOx8oxITOX2ZoABb6S0g33BGW	rich@rich.com	Rich	Owens	f
happy	$2b$12$1v8sIoV0qDLNNwq2xt0GH.J7CGCccdNJnLk7cHzuGJJuHNRyA9LzO	happy@gmail.com	Richhh	Owensss	t
happyyy	$2b$12$4XN3LULbQEy8KaAK5FU1D.9ZSZ7wm9N8IGrZD4nuJioGvSpyi2KVO	happyyy@gmail.com	Richhhh	Owensssh	t
happeee	$2b$12$G37xWsnzL64tkm81Dy/VLOCse6KTkiCk0JOTAP/Mwz8hXdeh3c86W	happeee@gmail.com	Richhhh	Owensssh	t
happy123	$2b$12$TBA4PwzAuDiypLi6WjqD1eT/JwIE3dy/.LB.x9iZXZfTIwBOt9VJ.	happeee123@gmail.com	Richhhh	Owensssh	t
mellow123	$2b$12$5mLpTu8RJ2dj03T7oJJXJe2nXagZpCMNrEFogseewvE2zadNR27D6	mellow@gmail.com	mellow	haha	t
\.


--
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.bookings_id_seq', 24, true);


--
-- Name: listings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.listings_id_seq', 21, true);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- Name: listings listings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- Name: bookings bookings_guest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_guest_id_fkey FOREIGN KEY (guest_id) REFERENCES public.users(username);


--
-- Name: bookings bookings_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id);


--
-- Name: listings listings_host_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_host_id_fkey FOREIGN KEY (host_id) REFERENCES public.users(username) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

