const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const Person = require('./models/person');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

morgan.token('req-body', (req) => JSON.stringify(req.body));

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use(morgan(':method :url :status :req[content-length] - :response-time ms :req-body'));

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((result) => response.json(result))
    .catch((e) => next(e));
});

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body;

  const person = new Person({
    name,
    number,
  });

  person.save()
    .then(savedPerson => {
      response.json(savedPerson);
    })
    .catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        response.status(404).end();
      }
      response.json(person);;
    })
    .catch((e) => next(e));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;
  const person = {
    name,
    number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      if (!updatedPerson) {
        response.status(404).end();
        return;
      }
      response.json(updatedPerson);
    })
    .catch((e) => next(e));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((e) => next(e));
});

app.get('/api/info', (request, response, next) => {
  Person.countDocuments({})
    .then((personsCount) => {
      const info = `<p>Phonebook has info for ${personsCount}</p><p>${new Date()}</p>`;
      response.send(info);
    })
    .catch((e) => next(e));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});