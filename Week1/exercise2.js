const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

connection.connect();

connection.query(
  "SELECT name FROM country WHERE population > 8000000",
  (error, results) => {
    if (error) throw error;
    console.log(
      `Question: What are the names of countries with population greater than 8 million?`
    );
    console.log("Countries with population greater than 8 million:");
    results.forEach((result) => console.log(result.name));
    console.log("\n----------------------------------\n");
  }
);

connection.query(
  'SELECT name FROM country WHERE name LIKE "%land%"',
  (error, results) => {
    if (error) throw error;
    console.log(
      "Question: What are the names of countries that have “land” in their names?"
    );
    console.log('Countries with "land" in their names:');
    results.forEach((result) => console.log(result.name));
    console.log("\n----------------------------------\n");
  }
);

connection.query(
  "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000",
  (error, results) => {
    if (error) throw error;
    console.log(
      `Question: What are the names of the cities with population in between 500,000 and 1 million?`
    );
    console.log("Cities with population in between 500,000 and 1 million:");
    results.forEach((result) => console.log(result.name));
    console.log("\n----------------------------------\n");
  }
);

connection.query(
  'SELECT name FROM country WHERE continent = "Europe"',
  (error, results) => {
    if (error) throw error;
    console.log(
      `Question: What's the name of all the countries on the continent ‘Europe’?`
    );
    console.log("Countries in Europe:");
    results.forEach((result) => console.log(result.name));
    console.log("\n----------------------------------\n");
  }
);

connection.query(
  "SELECT name FROM country ORDER BY surfacearea DESC",
  (error, results) => {
    if (error) throw error;
    console.log(
      `Question: List all the countries in the descending order of their surface areas.`
    );
    console.log("Countries in descending order of surface area:");
    results.forEach((result) => console.log(result.name));
    console.log("\n----------------------------------\n");
  }
);

connection.query(
  'SELECT name FROM city WHERE countrycode = "NLD"',
  (error, results) => {
    if (error) throw error;
    console.log(
      `Question: What are the names of all the cities in the Netherlands?`
    );
    console.log("Cities in the Netherlands:");
    results.forEach((result) => console.log(result.name));
    console.log("\n----------------------------------\n");
  }
);

connection.query(
  'SELECT population FROM city WHERE name = "Rotterdam"',
  (error, results) => {
    if (error) throw error;
    console.log(`Question: What is the population of Rotterdam?`);
    console.log("Population of Rotterdam:");
    console.log(results[0].population);
    console.log("\n----------------------------------\n");
  }
);

connection.query(
  "SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10",
  (error, results) => {
    if (error) throw error;
    console.log(`Question: What's the top 10 countries by Surface Area?`);
    console.log("Top 10 countries by surface area:");
    results.forEach((result) => console.log(result.name));
    console.log("\n----------------------------------\n");
  }
);

connection.query(
  "SELECT name FROM city ORDER BY population DESC LIMIT 10",
  (error, results) => {
    if (error) throw error;
    console.log(`Question: What's the top 10 most populated cities?`);
    console.log("Top 10 most populated cities:");
    results.forEach((result) => console.log(result.name));
    console.log("\n----------------------------------\n");
  }
);

connection.query(
  "SELECT SUM(population) as world_population FROM country",
  (error, results) => {
    if (error) throw error;
    console.log(`Question: What is the population number of the world?`);
    console.log("Population of the world:");
    console.log(results[0].world_population);
    console.log("\n----------------------------------\n");
  }
);
connection.end();
