import jwt from "jsonwebtoken";

async function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization is missing" });
        
    }
    const token = authHeader.split(" ")[1];
    console.log(token);
    console.log(authHeader);

    try {

        const {username, userid } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { username, userid };
        next();
        
    } catch (error) {
        return res.status(401).json({ message: "Authorization is missing", error: error.message });
                
    }
    
}

export { authMiddleware };