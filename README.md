# MVP

Forever Active is a full stack web app built using React.js on the frontend, Node.js and Express on the backend, and SQL for the database. 
The project's features include a search across the SQL database of workouts. The search method was implemented using a junction table, combining a list of workouts and a list of search keywords. Moreover, the project enables the admin of the website to add more workouts using the input form, adding them to the database and eventually displaying them on the page. 
The users are able to watch workouts either on the website and be redirected to YouTube. In the future, I plan to add more functionality, such as saving user's favorite workouts, marking the workouts as complete and calculating the calories burned. 

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called facebook: `create database workouts`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
    DB_HOST=localhost
    DB_USER=root
    DB_NAME=workouts
    DB_PASS=root
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called 'workouts' in your database.


### Development

- Run `npm start` in project directory to start the Express server on port 4000
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.

### Testing Endpoints

- To get to the homepage, open Postman, create a new GET request and enter `http://localhost:4000/api`.
- To get the list of workouts, enter `http://localhost:4000/api/workouts`.
- The POST request should be handled at `http://localhost:4000/api/workouts`.
- To access the workouts based on a keyword, open a new tab on Postman, enter `http://localhost:4000/api/search`, then click on Params -> Query Params and find the fields 'Key' and 'Value'. Type 'keyword' in the Key field. The value is any of the 12 keywords that you will find in the 'keywords' SQL table. 

### Other Dependencies

- You'll need to install a few other dependencies on the frontend, such as: 'react-bootstrap', 'google-fonts', 'axios' and 'react-router-dom'. To install them, run `npm install` plus the name of the package, e.g. `npm install axios`.
