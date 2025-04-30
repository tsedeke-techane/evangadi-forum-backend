import dbConnection from "../dbConfig/dbConfig.js"; 
import bcrypt from 'bcrypt';   // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Import jwt for token generation



async function register(req, res) {
    const { username, firstname, lastname, email, password } = req.body;
    
    if (!username || !firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // Initialize the connection
        const connection = await dbConnection.getConnection();

        // check if the user already exists
        const checkUserQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
        const [rows] = await connection.query(checkUserQuery, [username, email]);
        if (rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // password length validation
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);


        // email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        
        // Insert the new user into the database
        const query = "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)";
        const values = [username, firstname, lastname, email, hashedPassword];
        
        await connection.query(query, values);
        res.status(201).json({ message: "User registered successfully" });


    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Something went wrong. Please try again later!" });
    }

    
}

async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        
        // Initialize the connection
        const connection = await dbConnection.getConnection();

        // Check if the user exists
        const query = "SELECT * FROM users WHERE email = ?";
        const [rows] = await connection.query(query, [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare the password with the hashed password in the database
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate a JWT token
        const username = user.username;
        const userId = user.userId;
        const token = jwt.sign({userId, username}, process.env.JWT_SECRET, { expiresIn: '30d' });
        
        // Successful login
        res.status(200).json({ message: "Login successful", token, user: { id: user.id, username: user.username } });
        

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Something went wrong. Please try again later!" });
        
    }
}


async function checkUser(req, res) {
    const username = req.user.username;
    const userId = req.user.userId;
    res.status(200).json({ message: "User is authenticated", userId, username });
}

export { register, login, checkUser };