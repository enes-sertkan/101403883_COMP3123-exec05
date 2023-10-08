const express = require('express');
const app = express();
const router = express.Router();

const fs = require('fs'); // Add this line to require the 'fs' module for file operations

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req, res) => {
  // Create an HTML file with the specified content
  const homeHtml = `<html><body><h1>Welcome to ExpressJs Tutorial</h1></body></html>`;

  // Send the HTML file as a response
  res.send(homeHtml);
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  // Read user.json file and send its contents as JSON
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      // Handle error if the file couldn't be read
      res.status(500).send('Error reading user.json');
      return;
    }

    // Parse the JSON data and send it as a response
    const userData = JSON.parse(data);
    res.json(userData);
  });
});

/*
- Modify /login router to accept username and password as query string parameters
- Read data from user.json file
- If username and passsword are valid then send response as below
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below
    {
        status: false,
        message: "User Name is invalid"
    }
- If password is invalid then send response as below
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req, res) => {
  const { username, password } = req.query; // Extract username and password from query parameters

  // Read user.json file and validate username and password
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      // Handle error if the file couldn't be read
      res.status(500).send('Error reading user.json');
      return;
    }

    // Parse the JSON data
    const userData = JSON.parse(data);

    // Check if the username and password match the data from user.json
    if (userData.username === username && userData.password === password) {
      res.json({ status: true, message: 'User Is valid' });
    } else if (userData.username !== username) {
      res.json({ status: false, message: 'User Name is invalid' });
    } else {
      res.json({ status: false, message: 'Password is invalid' });
    }
  });
});

/*
- Modify /logout route to accept username as a parameter and display a message
  in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req, res) => {
  const { username } = req.params; // Extract username from the route parameter

  // Create an HTML message
  const logoutMessage = `<b>${username} successfully logged out.</b>`;

  // Send the HTML message as a response
  res.send(logoutMessage);
});

app.use('/', router);

app.listen(process.env.PORT || 8081);

console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
