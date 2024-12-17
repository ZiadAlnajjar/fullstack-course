require('dotenv').config();
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.ovdgz.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

const db = mongoose
  .connect(url)
  .then(() => console.log('Connected\n'))
  .catch((e) => console.log('Couldn\'t connect to mongodb!\n', e));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

let query;

if (process.argv.length === 3) {
  query = db.then(() =>
    Person.find({}).then((result) => {
      console.log('phonebook:');
      result.forEach(({ name, number }) => console.log(name, number));
    })
  );
} else {
  if (process.argv.length >= 5) {
    query = db
      .then(() => {
        const person = new Person({
          name: process.argv[3],
          number: process.argv[4],
        });

        return person.save();
      })
      .then((addedPerson) =>
        console.log(`Added ${addedPerson.name} — ${addedPerson.number} to phonebook`)
      );
  }
}

if (query) {
  query
    .then(() => {
      close();
    })
    .catch((e) => console.log(e));
} else {
  db.then(() => close());
}

const close = () => {
  mongoose.connection.close()
    .then(() => console.log('\nDisconnected'))
    .catch((e) => console.log(e));

};
