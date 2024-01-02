const db = require("../models");
const Todo = db.todo;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Title can't be empty" });
    return;
  }

  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    finished: req.body.finished ?? false,
  });

  todo
    .save(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating todo",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Todo.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving todo's",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findById(id)
    .then((data) => {
      if (!data)
        res.status(400).send({ message: `Not found todo with id ${id}` });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: `Error retrieving todo with id ${id}` });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can't be empty" });
  }

  const id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `can't update todo with id=${id}. todo was not found`,
        });
      } else res.send({ message: "Todo was updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: `Error updating todo with id ${id}` });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Can't delete todo with id ${id}. Todo was not found`,
        });
      } else {
        res.send({ message: "Todo was deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cound not delete todo with id ${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Todo.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} todo was deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while removing all todo's",
      });
    });
};

exports.findAllFinished = (req, res) => {
  Todo.find({ finished: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message: err.message || "Some error occured while retrieving todo's",
        });
    });
};
