import express from 'express';
import dbConnection from './dbConfig/dbConfig.js';

const app = express();
const port = 3000;

// user routes middleware file
import userRoutes from './routes/userRoute.js'

// user routes middleware
app.use("/api/users", userRoutes);

// questions routes middleware


// answers routes middleware




async function connectDB() {
  try {
    await dbConnection.getConnection();
    console.log('Successfully connected to the database.');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

connectDB();

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`listening on http://localhost:${port}`);
  }
});
