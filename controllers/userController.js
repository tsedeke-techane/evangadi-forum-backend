function register(req, res) {
    res.send('Register route');
}

function login(req, res) {
    res.send('Login route');
}


function checkUser(req, res) {
    res.send('Check user route');
}

export { register, login, checkUser };