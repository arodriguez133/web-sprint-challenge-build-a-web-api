const express = require('express');
const { del } = require('superagent');
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
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        res.status(400).json({
            message: "Please provide all data for specified fields"
        })
    } else {
        Actions.insert({ project_id, description, notes })
            .then((data) => {
                res.status(201).json(data);
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Did not complete post",
                    err: err.message,
                    stack: err.stack
                })
            })
    }
})

router.put('/:id', async (req, res) => {
    try {
        let { notes, description, completed, project_id } = req.body;
        if (!notes || !description || !completed || project_id) {
            res.status(400).json({
                message: "Please provide specified data"
            })
        } else {
            let updatedAction = await Actions.update({ notes, description, completed, project_id })
            res.status(201).json(updatedAction);
        }
    } catch (err) {
        res.status(500).json({
            message: "Did not update post",
            err: err.message,
            stack: err.stack
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Actions.get(req.params.id);
        if (!post) {
            res.status(404).json({
                message: "The post with specified ID could not be found"
            })
        } else {
            await Actions.remove(req.params.id);
            res.json(post);
        }
    } catch (err) {
        res.status(500).json({
            message: "could not deleted item",
            err: err.message,
            stack: err.stack
        })
    }
})


module.exports = router;
