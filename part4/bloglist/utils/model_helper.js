exports.schemaToJSON = (schema, callback) =>
  schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;

      if (callback) {
        callback(returnedObject);
      }
    },
  });
