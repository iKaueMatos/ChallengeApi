module.exports = function checksExistsUserAccount(request, response, next) {
    const { username } = request.header;
    const userAlreadyExists = users.some((user) => user.username === username);

    if (userAlreadyExists) {
        return response.status(400).json({error: "User already exists!"});   
    }

    return next();   
}