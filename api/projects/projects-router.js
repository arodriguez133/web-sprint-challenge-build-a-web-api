const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');

router.get('/', (req, res) => {
    Projects.get()
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
        let getProjectById = await Projects.get(id);
        if (!getProjectById) {
            res.status(404).json({
                message: "Action with specified ID does not exist"
            })
        } else {
            res.status(200).json(getProjectById);
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
    const { name, description, completed } = req.body;
    if (!name || !description) {
        res.status(400).json({
            message: "Please provide all data for specified fields"
        })
    } else {
        Projects.insert({ name, description, completed })
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

router.put('/:id', (req, res) => {
    let { name, description, completed } = req.body;
    if (!name || !description || !completed) {
        res.status(400).json({
            message: "please input all required fields"
        })
    } else {
        Projects.get(req.params.id)
            .then(() => {
                return Projects.update(req.params.id, req.body)
            })
            .then((data) => {
                res.status(201).json(data);
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Could not recieve data",
                    err: err.message,
                    stack: err.stack
                })
            })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Projects.get(req.params.id);
        if (!post) {
            res.status(404).json({
                message: "The post with specified ID could not be found"
            })
        } else {
            await Projects.remove(req.params.id);
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


