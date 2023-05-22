DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS keywords;

CREATE TABLE workouts(workout_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, title VARCHAR(100), url VARCHAR(255), minutes INT, calories INT, iscomplete TINYINT(1)); 



CREATE TABLE keywords(keyword_id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(100));




