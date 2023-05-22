

CREATE TABLE workouts(workout_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, title VARCHAR(100), url VARCHAR(255), minutes INT, calories INT, iscomplete TINYINT(1)); 



CREATE TABLE keywords(keyword_id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(100));


CREATE TABLE table_junction(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
WorkoutID INT, 
KeywordID INT,
FOREIGN KEY (WorkoutID) REFERENCES workouts (workout_id),
FOREIGN KEY (KeywordID) REFERENCES keywords (keyword_id)
);


