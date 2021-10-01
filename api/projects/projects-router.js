const express = require('express');
const { validateProject } = require('./projects-middleware')
const Project = require('./projects-model')
const Action = require('../actions/actions-model')

const router = express.Router();

//[GET] api/projects
router.get('/', (req, res, next) => {
    Project.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(next)
})

//[GET] api/projects/:id
 router.get('/:id', async (req, res) => {
   try {
       const { id } = req.params
       const project = await Project.get(id)
      
       if (!project) {
           res.status(404).json({
               message: "No project was found"
           })
       } else {
           res.status(200).json(project)
       }
   } catch(err) {
       res.status(500).json({
           message: "Something went wrong"
       })
   }
})

//[POST] api/projects
router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(next)
})

//[PUT] api/projects/:id
router.get('/:id', (req, res) => {

})

//[DELETE] api/projects/:id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Project.get(req.params.id)
        if (!deleted) {
            res.status(404).json({
                message: "The project does not exist"
            })
        } else {
            await Project.remove(req.params.id)
            res.json(deleted)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The post could not be removed',
            err:err
        })
    }

})

//[GET] api/projects/:id/actions
router.get('/:id/actions', (req, res) => {

})

// Catch-All Error Function
router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
      message: "Something went wrong"
    })
  })



module.exports = router