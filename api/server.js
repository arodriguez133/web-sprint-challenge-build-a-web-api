const express = require('express');

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');
const server = express();

server.use(express.json());
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use('api/actions', actionsRouter);
server.use('api/projects', projectsRouter);

server.use('*', (req,res)=> {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server;
