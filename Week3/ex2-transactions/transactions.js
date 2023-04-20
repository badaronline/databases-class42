const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week3homework',
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySql connected...');
});

try {
  db.query('START TRANSACTION');
  
  db.query(
    'UPDATE account SET balance = balance-1000 WHERE account_number = 101'
  );

  db.query(
    'UPDATE account SET balance = balance+1000 WHERE account_number = 102'
  );

  db.query(
    'INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (101, -1000, "2023-04-04","Transfer from account 101 to account 102")'
  );

  db.query(
    'INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (102, 1000, "2023-04-04","Transfer from account 101 to account 102")'
  );

  db.query('COMMIT');
  console.log('Transfer complete.');
} catch (error) {
  db.query('ROLLBACK');
  console.log('Transfer failed. Error: ' + error);
} finally {
  db.end();
}
