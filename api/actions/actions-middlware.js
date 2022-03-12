const Actions = require('./actions-model');

const validateID = (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({
            message: "Action with specified ID does not exist"
        })
    } else {
        next();
    }
};

module.exports = {
    validateID,
}
