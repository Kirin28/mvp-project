var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn');
const db = require('../model/helper');
require('dotenv').config();
var bcrypt = require('bcrypt');
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

// Signup
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const favoriteWorkoutsJSON = JSON.stringify([]);

    await db(
      `INSERT INTO users (username, password, isAdmin, favoriteWorkouts) VALUES ("${username}" , "${hash}", 0, '${favoriteWorkoutsJSON}')`
    );
    const response = {
      message: 'Registration successful',
      status: 200,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      message: 'The username is taken',
      status: 400,
    };
    res.status(400).send(response);
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let isCorrectPassword;
  let isCorrectUsername;

  try {
    const response = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    const user = response.data[0];
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      isCorrectPassword = correctPassword;

      if (!correctPassword) throw new Error('Incorrect password');

      var token = jwt.sign({ user_id }, supersecret);

      const response = {
        message: 'Login successful, here is your token',
        status: 200,
        token,
      };
      res.status(200).send(response);
    } else {
      isCorrectUsername = false;
      throw new Error('User does not exist');
    }
  } catch (error) {
    const response = {
      message: 'Wrong credentials',
      status: 400,
      isCorrectUsername,
      isCorrectPassword,
    };
    res.status(400).send(response);
  }
});

router.get('/profile', userShouldBeLoggedIn, async (req, res) => {
  const result = await db(`SELECT * FROM users WHERE id = ${req.user_id};`);
  const user = result.data[0];

  res.send({
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
    favoriteWorkouts: JSON.parse(user.favoriteWorkouts),
  });
});

//Get all users
router.get('/', async function (_, res) {
  try {
    const result = await db('SELECT * FROM users;');

    const formattedData = result.data.map((user) => {
      return {
        ...user,
        favoriteWorkouts: JSON.parse(user.favoriteWorkouts),
      };
    });

    const response = {
      data: formattedData,
      message: 'Success',
      status: 200,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      error: error.message,
      message: 'Internal Server Error',
      status: 500,
    };
    res.status(500).send(response);
  }
});

// Reset password -> need both username and password to test
router.patch('/reset-password', async function (req, res) {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const userExists = await db(
      `SELECT * FROM users WHERE username = '${username}';`
    );
    if (userExists.data.length === 0) {
      const response = {
        status: 404,
        message: 'User not found',
      };
      return res.status(404).send(response);
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the password of the user with the hashed password
    await db(
      `UPDATE users SET password = "${hashedPassword}" WHERE username = '${username}';`
    );

    // Fetch the updated user
    const updatedUser = await db(
      `SELECT * FROM users WHERE username = '${username}';`
    );
    const response = {
      data: updatedUser,
      message: 'Password reset successful',
      status: 200,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      message: "Can't reset the password",
      status: 400,
    };
    res.status(400).send(response);
  }
});

//Add favorite workout
router.patch('/add-favorite-workout', async function (req, res) {
  try {
    const { id, favoriteWorkouts } = req.body;

    // Check if the user exists
    const userExists = await db(`SELECT * FROM users WHERE id = ${id};`);
    if (userExists.data.length === 0) {
      return res.status(404).send('User not found');
    }

    // Fetch the current favoriteworkouts array
    const existingUser = userExists.data[0];
    const currentFavoriteWorkouts = JSON.parse(existingUser.favoriteWorkouts);

    // Merge the existing and new favoriteWorkouts arrays
    const updatedFavoriteWorkouts = [
      ...currentFavoriteWorkouts,
      ...favoriteWorkouts,
    ];

    // Convert the updated favoriteWorkouts array to a stringified JSON
    const updatedFavoriteWorkoutsString = JSON.stringify(
      updatedFavoriteWorkouts
    );

    // Update the favorite workouts of the user
    await db(
      `UPDATE users SET favoriteWorkouts = '${updatedFavoriteWorkoutsString}' WHERE id = ${id};`
    );

    // Fetch the updated user
    // favoriteWorkouts: JSON.parse(result.data[0].favoriteWorkouts),
    const updatedUser = await db(`SELECT * FROM users WHERE id = ${id};`);

    const response = {
      id: updatedUser.data[0].id,
      favoriteWorkouts: JSON.parse(updatedUser.data[0].favoriteWorkouts),
      // favoriteWorkouts: updatedUser.data[0].favoriteWorkouts,
      message: 'Workout added successfuly',
      status: 200,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      message: "Couldn't add workout to the list",
      status: 500,
    };
    res.status(500).send(response);
  }
});

router.patch('/remove-favorite-workout', async function (req, res) {
  try {
    const { id, favoriteWorkouts } = req.body;

    // Check if the user exists
    const userExists = await db(`SELECT * FROM users WHERE id = ${id};`);
    if (userExists.data.length === 0) {
      return res.status(404).send('User not found');
    }

    // Fetch the current favoriteWorkouts array
    const existingUser = userExists.data[0];
    const currentFavoriteWorkouts = JSON.parse(existingUser.favoriteWorkouts);

    // Remove the workout ID from the favoriteWorkouts array
    const updatedFavoriteWorkouts = currentFavoriteWorkouts.filter(
      (workoutId) => !favoriteWorkouts.includes(workoutId)
    );

    // Convert the updated favoriteWorkouts array to a stringified JSON
    const updatedFavoriteWorkoutsString = JSON.stringify(
      updatedFavoriteWorkouts
    );

    // Update the favorite workouts of the user
    await db(
      `UPDATE users SET favoriteWorkouts = '${updatedFavoriteWorkoutsString}' WHERE id = ${id};`
    );

    // Fetch the updated user
    const updatedUser = await db(`SELECT * FROM users WHERE id = ${id};`);
    // res.send(updatedUser.data);
    const response = {
      id: updatedUser.data[0].id,
      favoriteWorkouts: JSON.parse(updatedUser.data[0].favoriteWorkouts),
      // favoriteWorkouts: updatedUser.data[0].favoriteWorkouts,
      message: 'Workout removed successfuly',
      status: 200,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      message: "Couldn't remove workout from the list",
      status: 500,
    };
    res.status(500).send(response);
  }
});

/*
// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    const user = response.data[0];
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);
      
      if (!correctPassword) throw new Error('Incorrect password');

      var token = jwt.sign({ user_id }, supersecret);

      res.status(200).send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error('User does not exist');
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let isCorrectPassword;
  let isCorrectUsername;

  try {
    const response = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    const user = response.data[0];
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      isCorrectPassword = correctPassword;

      if (!correctPassword) throw new Error('Incorrect password');

      var token = jwt.sign({ user_id }, supersecret);

      const response = {
        message: 'Login successful, here is your token',
        status: 200,
        token,
      };
      res.status(200).send(response);
    } else {
      isCorrectUsername = false;
      throw new Error('User does not exist');
    }
  } catch (error) {
    const response = {
      message: 'Wrong credentials',
      status: 400,
      isCorrectUsername,
      isCorrectPassword,
    };
    res.status(400).send(response);
  }
});



// DELETE user by ID
router.delete('/:id', async function (req, res, next) {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const userExists = await db(`SELECT * FROM users WHERE id = ${userId};`);
    if (userExists.data.length === 0) {
      return res.status(404).send('User not found');
    }

    // Delete the user
    await db(`DELETE FROM users WHERE id = ${userId};`);

    // Fetch the updated list of users
    const userList = await db('SELECT * FROM users;');
    res.send(userList.data);
  } catch (error) {
    res.status(500).send(error);
  }
});


 */

module.exports = router;