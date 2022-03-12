const express = require('express');
const router = express.Router();
const { validateID } = require('./actions-middlware');
const Actions = require("./actions-model");

router.get('/', (req, res) => {
    Actions.get()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(500).json({
                message: "Could not recieve data",
                err: err.message,
                stack: err.stack
            })
        })

})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        let getActionById = await Actions.get(id);
        if (!getActionById) {
            res.status(404).json({
                message: "Action with specified ID does not exist"
            })
        } else {
            res.status(200).json(getActionById);
        }
    }
    catch (err) {
        res.status(500).json({
            message: "No data returned",
            err: err.message,
            stack: err.stack
        })
    }
})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})


module.exports = router;
