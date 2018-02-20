const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3050;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save()
    .then(doc => {
      res.send(doc);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => {
      res.send({todos});
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

// GET todos/:id
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
// Validate id using isValid
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({});
  }

  Todo.findById(id)
    .then(todo => {
      // send 404 status and empty body if no todo found
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send({todo});
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send()
      }
      res.status(200).send(todo);
    })
    .catch(e => {
      res.status(400).send();
    });

});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};

