module.exports = function checksCreateTodosUserAvailability(request, response, next) {
    const { user } = request;

    if (!user.pro && user.todos.length >= 10) {
        return response.status(403).json({error: "User already has 10 todos!"});
    }

    next();
}