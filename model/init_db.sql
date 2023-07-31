DROP TABLE IF EXISTS workout_keyword;
DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS keywords;
DROP TABLE IF EXISTS users;

CREATE TABLE workouts(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    title VARCHAR(100), 
    url VARCHAR(255), 
    embedID VARCHAR(100), 
    minutes INT, 
    calories INT, 
    iscomplete TINYINT(1)); 

CREATE TABLE keywords(
    id INT PRIMARY KEY AUTO_INCREMENT, 
    text VARCHAR(100));

CREATE TABLE workout_keyword(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    WorkoutID INT, 
    KeywordID INT,
    FOREIGN KEY (WorkoutID) REFERENCES workouts (id),
    FOREIGN KEY (KeywordID) REFERENCES keywords (id)
);

CREATE TABLE users(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    isAdmin TINYINT(1) NOT NULL,
    password VARCHAR(255) NOT NULL,
    favoriteWorkouts TEXT
);

INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("High Impact Kickboxing Workout", "https://youtu.be/qGuAQX39y6E", "qGuAQX39y6E", 23, 180, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Booty Workout", "https://youtu.be/XCTYwFKHsOA", "XCTYwFKHsOA", 15, 70, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("HIIT Full Body Workout", "https://youtu.be/05HTb-oA5s4", "05HTb-oA5s4", 16, 100, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Yoga Recovery Workout", "https://youtu.be/ZbuU0_Siul4", "ZbuU0_Siul4", 15, 60, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Dumbbel Workout", "https://youtu.be/p7JjICp_NrY", "p7JjICp_NrY", 30, 185, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("HIIT Workout", "https://youtu.be/fWzEv89SmZI", "fWzEv89SmZI", 25, 150, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Yoga for Beginners", "https://youtu.be/Gl1Eh61n4Ls", "Gl1Eh61n4Ls", 15, 50, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("High Impact Yoga", "https://youtu.be/nsmq04gQyn0", "nsmq04gQyn0", 10, 45, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Full Body Yoga", "https://youtu.be/cmRz6Q8DOrA", "cmRz6Q8DOrA", 12, 40, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Hip Mobility Yoga", "https://youtu.be/65KVj8EMJIc", "65KVj8EMJIc", 14, 50, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Strength Workout", "https://youtu.be/0mXRt9UmoZA", "0mXRt9UmoZA", 20, 120, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("HIIT Workout with a Buddy", "https://youtu.be/qw32DPzSEHo", "qw32DPzSEHo", 20, 120, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Yoga for Runners", "https://youtu.be/hYwSJk3H61M", "hYwSJk3H61M", 30, 100, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Cardio and Core Workout", "https://youtu.be/bhsyPi_WM64", "bhsyPi_WM64", 25, 150, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Legs Strengthening Workout", "https://youtu.be/vHWvMTIGJEQ", "vHWvMTIGJEQ", 25, 150, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Yoga for Feeling Calm", "https://youtu.be/AZO3UIJxaro", "AZO3UIJxaro", 10, 35, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Yoga for Feeling Strong", "https://youtu.be/HpbdD_hAmhI", "HpbdD_hAmhI", 10, 50, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Full Body Workout", "https://youtu.be/O_nWCgnBL5U", "O_nWCgnBL5U", 15, 100, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Full Body HIIT", "https://youtu.be/yVrcrOMWdMY", "yVrcrOMWdMY", 17, 100, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Dancing Workout", "https://youtu.be/ay6ici05_74", "ay6ici05_74", 10, 50, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Post-Natal Yoga", "https://youtu.be/az-YCJYuDhU", "az-YCJYuDhU", 30, 100, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Cardio and Core Burn", "https://youtu.be/7NkK1YTfcDU", "7NkK1YTfcDU", 33, 200, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Quick HIIT Abs", "https://youtu.be/sk-x1ejsctM", "sk-x1ejsctM", 12, 50, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Push and Pull Basics", "https://youtu.be/5IdGmBbVe8k", "5IdGmBbVe8k", 24, 200, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Breakthrough HIIT & Core", "https://youtu.be/zTyd0IIgVSk", "zTyd0IIgVSk", 40, 400, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Bodyweight Burn", "https://youtu.be/q8ovI5i7FUE", "q8ovI5i7FUE", 20, 200, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Focus and Flow Yoga", "https://youtu.be/74fiZ7o0AM4", "74fiZ7o0AM4", 30, 150, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Gentle Yoga", "https://youtu.be/orYFAtGirkw", "orYFAtGirkw", 18, 90, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Abs Workout", "https://youtu.be/L28GQuOCaUQ", "L28GQuOCaUQ", 20, 150, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Leg Power Up", "https://youtu.be/mYtJhi4tQm4", "mYtJhi4tQm4", 37, 350, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("HIIT & Core Workout", "https://youtu.be/ScDKi5z52-0", "ScDKi5z52-0", 20, 200, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Rise & Flow Yoga ", "https://youtu.be/qc62p33LTNo", "qc62p33LTNo", 14, 50, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Total Body Blast", "https://youtu.be/E4FNg3lkxTw", "E4FNg3lkxTw", 30, 300, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Total Body Blast", "https://youtu.be/WWtZKGWrxPU", "WWtZKGWrxPU", 28, 300, 0);
INSERT INTO workouts(title, url, embedID, minutes, calories, iscomplete) VALUES("Kickboxing Workout", "https://youtu.be/ultvOOiAHrM", "ultvOOiAHrM", 25, 300, 0);

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

INSERT INTO workout_keyword (WorkoutID, KeywordID) VALUES (1, 1), (35, 1), (4, 2), (7, 2), (8, 2), (9, 2), (10, 2), (13, 2), (16, 2), (17, 2), (21, 2), (27, 2), (28, 2), (32, 2), (2, 3), (3, 4), (9, 4), (18, 4), (19, 4), (33, 5), (34, 5), (14, 6), (22, 6), (25, 6), (31, 6), (4, 7), (23, 8), (29, 8), (15, 9), (11, 10), (15, 10), (3, 11), (6, 11), (12, 11), (19, 11), (23, 11), (25, 11), (31, 11), (1, 12), (8, 12);


