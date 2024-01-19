const Todo = require('../models/todo');
const {validateField, getErrorMessage} = require('../utils/function');

const getTodo = async (req, res, next) => {
    try {
        const todo = await Todo.find();
        res.send(todo)
    } catch (error) {
        console.log(error);
        next(getErrorMessage({
            status: 400,
            message : "Error while getting list of todos! Try again later."
        }) );
        // res.status(500).send();
    }
};
const addTodo = async (req, res, next) => {
    try {
       
        const areValidFields = validateField(req.body);

        if (!areValidFields) {
            // return res.s/("Only valid fields to update: 'title' and 'Status' ");
            return next(getErrorMessage({
                status: 400,
                message : "Only valid fields to update: 'title' and 'Status' "
            }) );
        }

        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).send();
    } catch (error) {
        console.log(error)
        next(getErrorMessage({
            status: 400,
            message : "Error while adding list of todos! Try again later."
        }) );
        // res.status(500).send();
    }
};
const updateTodo = async (req, res, next) => {
    try {
        const isValidId = await Todo.findById(req.params.id);
        if (!isValidId) {
            // return res.status(400).send();
            return next(
                getErrorMessage({
                status: 400,
                message : "Please Enter a Valid Todo Id"
            }) );
        }

        const areValidFields = validateField(req.body);

        if (!areValidFields) {
            // return res.status(400).send("Only valid fields to update: 'title' and 'Status' ");
            return next(getErrorMessage({
                status: 500,
                message :"Only valid fields to update: 'title' and 'Status' "
            }))
            
        }

        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        });
        // const updatedTodo = await Todo.findOneAndUpdate(
        // {
        //     _id: req.params.id
        // }, req.body,
        // {
        //     new: true

        // });
        return res.send(updatedTodo);
    } catch (error) {
        console.log(error);
        // res.status(500).send();
        next(getErrorMessage({
            status: 500,
            message : "Error while updating list of todos! Try again later."
        }) );
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const isValidId = await Todo.findById(req.params.id);
        if (!isValidId) {
            // return res.status(400).send("Pleae enter valid todo id");
            return next(getErrorMessage({
                status: 400,
                message : "Pleae enter valid todo id",
            }) );
        };

        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        return res.send(deletedTodo);

    } catch (error) {
        console.log(error);
        // res.status(500).send();
        next(getErrorMessage({
            message : "Error while deleting list of todos! Try again later."
        }) );


    }
}

module.exports = {
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
};   