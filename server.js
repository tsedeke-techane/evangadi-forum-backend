import express from 'express';
import dbConnection from './dbConfig/dbConfig.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

const app = express();
// json middleware to extract data from the body
app.use(express.json());
const port = 3000;

// user routes middleware file
import userRoutes from './routes/userRoute.js'

// question routes middleware file
import questionRoutes from './routes/questionRoute.js';

// user routes middleware
app.use("/api/users", userRoutes);

// questions routes middleware
app.use("/api/questions", authMiddleware, questionRoutes);


// answers routes middleware



// db connection
async function connectDB() {
  try {
    await dbConnection.getConnection();
    console.log('Successfully connected to the database.');
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
}

connectDB();

// channel routes middleware
app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`listening on http://localhost:${port}`);
  }
});
