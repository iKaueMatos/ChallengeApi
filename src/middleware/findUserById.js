module.exports = function findUserById(request, response, next) {
    const { id } = request.params;
    const user = users.find((user) => user.id === id);

    if (!user) {
        return response.status(404).json({error: "User not found!"});
    }

    request.user = user;

    return next();
}