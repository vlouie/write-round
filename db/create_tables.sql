CREATE TABLE IF NOT EXISTS user (
	id int NOT NULL AUTO_INCREMENT,
	username varchar2(50) NOT NULL,
	password varchar2(50) NOT NULL,
	email varchar2(50) NOT NULL,
	created_at datetime NOT NULL,
	PRIMARY KEY ( id ),
	CONSTRAINT uniq_user UNIQUE ( username )
);

CREATE TABLE IF NOT EXISTS session (
	id int NOT NULL AUTO_INCREMENT,
	title varchar2(255) NOT NULL,
	current_turn int NOT NULL,
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	finished boolean NOT NULL DEFAULT 0,
	PRIMARY KEY ( id )
);

CREATE TABLE IF NOT EXISTS story (
	id int NOT NULL AUTO_INCREMENT,
	session_id int NOT NULL,
	text longtext CHARACTER SET utf-8,
	PRIMARY KEY ( id ),
	CONSTRAINT fk_session FOREIGN KEY ( session_id ) REFERENCES session( id )
);

CREATE TABLE IF NOT EXISTS relation (
	user_id1 int NOT NULL,
	user_id2 int NOT NULL,
	type varchar2(30) DEFAULT NULL,
	CHECK(type IN ('friends', 'block'),
	PRIMARY KEY ( user_id1, user_id2),
	CONSTRAINT fk_user_1 FOREIGN KEY ( user_id1 ) REFERENCES user( id ),
	CONSTRAINT fk_user_2 FOREIGN KEY ( user_id2 ) REFERENCES user( id )
);

CREATE TABLE IF NOT EXISTS users_sessions (
	user_id int NOT NULL,
	session_id int NOT NULL,
	colour varchar2(30) NOT NULL,
	turn int NOT NULL,
	PRIMARY KEY ( user_id, session_id ),
	CONSTRAINT fk_user_session FOREIGN KEY ( user_id ) REFERENCES user( id ),
	CONSTRAINT fk_session_user FOREIGN KEY ( session_id ) REFERENCES session( id )
);

commit;
