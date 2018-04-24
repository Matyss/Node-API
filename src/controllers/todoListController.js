'use-strict';


import mongoose from 'mongoose';
import Task from '../models/todoListModel';

//define default route message
exports.get_default = (req, res) => {
    res.json({"message": "Welcome to the Todo API bulit with Node"});
}

//define main routes for todos
//GET all todos
exports.get_all_tasks = (req, res) => {
    Task.find({}, (err, task) => {
        err ? res.status(500).send({'message': 'Some error occurred while retrieving tasks'})
            : res.json(task);
    });
};

//CREATE new task
exports.create_a_task = (req, res, err) => {
    if(!req.body.content) {
        return res.status(400).send({message: "Task content cannot be empty"});
    }

    let new_task = new Task({title: req.body.title || 'Untitled Task', content: req.body.content});

    new_task.save((err, task) => {
        err ? res.status(500).send({message: 'Some error occurred while creating the task'})
            : res.json(task);
    });
};

//GET single task
exports.read_a_task = (req, res) => {
    Task.findById(req.params.taskId, (err, task) => {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: `Task with id ${req.params.taskId} was not found`});
            } else {
                return res.status(500).send({message: `Error retrieving task with id ${req.params.taskId}`});
            }
        }

        if(!task) {
            return res.status(404).send({message: `Task with id ${req.params.taskId} not found`});
        }

        res.json(task)
    });
};

//UPDATE single task identified by ID
exports.update_a_task = (req, res) => {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, (err, task) => {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: `Task with id ${req.params.taskId} was not found`});
            } else {
                return res.status(500).send({message: `Error retrieving task with id ${req.params.taskId}`});
            }
        }

        if(!task) {
            return res.status(404).send({message: `Task with id ${req.params.taskId} not found`});
        }
        err ? res.send(err) : res.json(task);
    });
};

//REMOVE the task
exports.delete_a_task = (req, res) => {
    Task.remove({_id: req.params.taskId}, (err, task) => {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: `Task with id ${req.params.taskId} was not found`});
            } else {
                return res.status(500).send({message: `Error deleting task with id ${req.params.taskId}`});
            }
        }

        if(!task) {
            return res.status(404).send({message: `Task with id ${req.params.taskId} not found`});
        }
        err ? req.send(err) : res.json({ message: 'Task deleted successfully' });
    });
};
