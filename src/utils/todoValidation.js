module.exports = function todoValidation(todo) {
    if (!todo) {
        return response.status(404).json({error: "Todo not found!"});
    }
}