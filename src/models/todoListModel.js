'use-strict';


import mongoose, { Schema } from 'mongoose';

//build task schema
export const TaskSchema = new Schema({
    title: {
        type: String,
        required: 'Kindly enter the name of the task'
    },
    content: {
        type: String,
        required: 'Task content cannot be empty'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    }
});

//export model for use
module.exports = exports = mongoose.model('Tasks', TaskSchema);
