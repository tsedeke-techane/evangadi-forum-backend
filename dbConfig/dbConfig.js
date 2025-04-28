import mysql2 from 'mysql2/promise';

// Create a connection pool
const dbConnection = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'evangadi_db',
  connectionLimit: 10, 
});

export default dbConnection;
