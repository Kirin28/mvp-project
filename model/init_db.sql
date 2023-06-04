DROP TABLE IF EXISTS workout_keyword;
DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS keywords;

CREATE TABLE workouts(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, title VARCHAR(100), url VARCHAR(255), embedID VARCHAR(100), minutes INT, calories INT, iscomplete TINYINT(1)); 

CREATE TABLE keywords(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(100));

CREATE TABLE workout_keyword(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
WorkoutID INT, 
KeywordID INT,
FOREIGN KEY (WorkoutID) REFERENCES workouts (id),
FOREIGN KEY (KeywordID) REFERENCES keywords (id)
);


INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("High Impact Kickboxing Workout", "https://youtu.be/qGuAQX39y6E", "qGuAQX39y6E", 23, 180, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Gentle Yoga Flow", "https://youtu.be/ZvQ-5ad-6Qo", "ZvQ-5ad-6Qo", 20, 100, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Booty Workout", "https://youtu.be/XCTYwFKHsOA", "XCTYwFKHsOA", 15, 70, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("HIIT Full Body Workout", "https://youtu.be/05HTb-oA5s4", "05HTb-oA5s4", 16, 100, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Yoga Recovery Workout", "https://youtu.be/ZbuU0_Siul4", "ZbuU0_Siul4", 15, 60, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Dumbbel Workout", "https://youtu.be/p7JjICp_NrY", "p7JjICp_NrY", 30, 185, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("HIIT Workout", "https://youtu.be/fWzEv89SmZI", "fWzEv89SmZI", 25, 150, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Yoga for Beginners", "https://youtu.be/Gl1Eh61n4Ls", "Gl1Eh61n4Ls", 15, 50, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("High Impact Yoga", "https://youtu.be/nsmq04gQyn0", "nsmq04gQyn0", 10, 45, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Full Body Yoga", "https://youtu.be/cmRz6Q8DOrA", "cmRz6Q8DOrA", 12, 40, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Hip Mobility Yoga", "https://youtu.be/65KVj8EMJIc", "65KVj8EMJIc", 14, 50, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Yoga for Recovery", "https://youtu.be/tcSDpenhuMo", "tcSDpenhuMo", 20, 70, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Abs Workout", "https://youtu.be/yNC2ewTn6Bw", "yNC2ewTn6Bw", 15, 130, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Thighs and Booty Burn", "https://youtu.be/CxuAYfeA9X8", "CxuAYfeA9X8", 15, 130, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Kickboxing", "https://youtu.be/6RfOb9_9_t4", "6RfOb9_9_t4", 15, 130, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Total Body Workout", "https://youtu.be/JqynUEhocf8", "JqynUEhocf8", 15, 130, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Legs and Booty Workout", "https://youtu.be/dxHNhqA8Bhg", "dxHNhqA8Bhg", 20, 170, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Total Body Workout", "https://youtu.be/yOpKjRIMEtY", "yOpKjRIMEtY", 25, 180, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Strength Workout", "https://youtu.be/0mXRt9UmoZA", "0mXRt9UmoZA", 20, 120, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("HIIT Workout with a Buddy", "https://youtu.be/qw32DPzSEHo", "qw32DPzSEHo", 20, 120, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Yoga for Runners", "https://youtu.be/hYwSJk3H61M", "hYwSJk3H61M", 30, 100, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Cardio and Core Workout", "https://youtu.be/bhsyPi_WM64", "bhsyPi_WM64", 25, 150, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Legs Strengthening Workout", "https://youtu.be/vHWvMTIGJEQ", "vHWvMTIGJEQ", 25, 150, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Yoga for Feeling Calm", "https://youtu.be/AZO3UIJxaro", "AZO3UIJxaro", 10, 35, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Yoga for Feeling Strong", "https://youtu.be/HpbdD_hAmhI", "HpbdD_hAmhI", 10, 50, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Full Body Workout", "https://youtu.be/O_nWCgnBL5U", "O_nWCgnBL5U", 15, 100, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Full Body HIIT", "https://youtu.be/yVrcrOMWdMY", "yVrcrOMWdMY", 17, 100, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Quick Abs Workout", "https://youtu.be/NKyaZKwR7Q8", "NKyaZKwR7Q8", 10, 50, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Dancing Workout", "https://youtu.be/ay6ici05_74", "ay6ici05_74", 10, 50, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Post-Natal Yoga", "https://youtu.be/az-YCJYuDhU", "az-YCJYuDhU", 30, 100, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Cardio and Core Burn", "https://youtu.be/7NkK1YTfcDU", "7NkK1YTfcDU", 33, 200, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Quick HIIT Abs", "https://youtu.be/sk-x1ejsctM", "sk-x1ejsctM", 12, 50, 0);

INSERT INTO keywords(text) VALUES("Kickboxing");
INSERT INTO keywords(text) VALUES("Yoga");
INSERT INTO keywords(text) VALUES("Booty");
INSERT INTO keywords(text) VALUES("Full Body");
INSERT INTO keywords(text) VALUES("Total Body");
INSERT INTO keywords(text) VALUES("Core");
INSERT INTO keywords(text) VALUES("Recovery");
INSERT INTO keywords(text) VALUES("Abs");
INSERT INTO keywords(text) VALUES("Legs");
INSERT INTO keywords(text) VALUES("Strength");
INSERT INTO keywords(text) VALUES("HIIT");
INSERT INTO keywords(text) VALUES("High Impact");

INSERT INTO workout_keyword (WorkoutID, KeywordID) VALUES (1, 1), (15, 1), (2, 2), (5, 2), (8, 2), (9, 2), (10, 2), (11, 2), (12, 2), (21, 2), (24, 2), (25, 2), (30, 2), (3, 3), (14, 3), (17, 3), (4, 4), (10, 4), (26, 4), (27, 4), (16, 5), (18, 5), (22, 6), (31, 6), (5, 7), (12, 7), (13, 8), (28, 8), (32, 8), (17, 9), (23, 9), (19, 10), (23, 10), (4, 11), (7, 11), (20, 11), (27, 11), (32, 11), (1, 12), (9, 12);

