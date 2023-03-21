const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("MySql connected...");
});

connection.query("CREATE DATABASE IF NOT EXISTS meetup", (error) => {
  if (error) {
    console.error("Error creating database: ", error);
  } else {
    console.log("Database created");
  }
});

// Switch to the meetup database
connection.query("USE meetup", (error) => {
  if (error) {
    console.error("Error switching to database: ", error);
  } else {
    console.log("Using database: meetup");
  }
});

connection.query('DROP TABLE invitee');
connection.query('DROP TABLE meeting');
connection.query('DROP TABLE room');

// Create the Invitee table
connection.query(
  "CREATE TABLE Invitee (invitee_no INT AUTO_INCREMENT PRIMARY KEY, invitee_name VARCHAR(255), invited_by VARCHAR(255))",
  (error) => {
    if (error) {
      console.error("Error creating Invitee table: ", error);
    } else {
      console.log("Invitee table created!");
    }
  }
);

// Insert data into the Invitee table
const invitees = [  ["John", "Peter"],
  ["Sarah", "Peter"],
  ["Mark", "Mary"],
  ["Linda", "Mary"],
  ["David", "Mary"],
];
connection.query(
    "INSERT INTO Invitee (invitee_name, invited_by) VALUES ?",
    [invitees], (error) => {
  if (error) {
    console.error("Error inserting data into Invitee table: ", error);
  } else {
    console.log("Data inserted into Invitee table successfully!");
  }
});

// Create the Room table
connection.query(
  "CREATE TABLE Room (room_no INT AUTO_INCREMENT PRIMARY KEY, room_name VARCHAR(255), floor_number INT)",
  (error) => {
    if (error) {
      console.error("Error creating Room table: ", error);
    } else {
      console.log("Room table created!");
    }
  }
);

// Insert data into the Room table
const rooms = [
    ["Conference Room 1", 1],
  [ "Conference Room 2", 2 ],
  [ "Training Room 1", 1 ],
  [ "Training Room 2", 2 ],
  [ "Board Room", 1 ],
];
connection.query( "INSERT INTO Room (room_name, floor_number) VALUES ?",
[rooms], (error) => {
  if (error) {
    console.error("Error inserting data into Room table: ", error);
  } else {
    console.log("Data inserted into Room table successfully!");
  }
});

// Create the Meeting table
connection.query(
  "CREATE TABLE Meeting (meeting_no INT AUTO_INCREMENT PRIMARY KEY, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT, FOREIGN KEY (room_no) REFERENCES Room(room_no))",
  (error) => {
    if (error) {
      console.error("Error creating Meeting table: ", error);
    } else {
      console.log("Meeting table created!");
    }
  }
);

// Insert data into the Meeting table
const meetings = [
  [
    "Project Kickoff", "2023-03-22 09:00:00", "2023-03-22 11:00:00", 1,
  ],
  [
    "Budget Review", "2023-03-23 14:00:00", "2023-03-23 16:00:00", 2,
  ],
  [
    "Team Building", "2023-03-24 11:00:00", "2023-03-24 13:00:00", 3,
  ],
  [
    "Product Launch", "2023-03-25 09:00:00", "2023-03-25 12:00:00", 4,
  ],
  [
    "Board Meeting", "2023-03-26 10:00:00", "2023-03-26 12:00:00", 5,
  ],
];
connection.query("INSERT INTO Meeting (meeting_title, starting_time, ending_time,room_no) VALUES ?", [meetings], (error) => {
  if (error) {
    console.error("Error inserting data into Meeting table: ", error);
  } else {
    console.log("Data inserted into Meeting table successfully!");
  }
});

// Close the connection
connection.end((error) => {
  if (error) {
    console.error("Error closing the database connection: ", error);
  } else {
    console.log("Connection closed!");
  }
});