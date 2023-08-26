module.exports = function checksTodoExists(request, response, next) {
    const { username } = request.headers;
    const { id } = request.params;
    const user = users.find((user) => user.username === username);
    const todo = user.todos.find((todo) => todo.id === id);
    if (!user) {
        return response.status(404).json({ error: "User not found!" });
    }
    if (!todo) {
        return response.status(404).json({ error: "Todo not found!" });
    }
    request.user = user;
    request.todo = todo;
    return next();
}