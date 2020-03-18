const PASSWORD = process.env.MONGODB_PASSWORD

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://defaultuser:${PASSWORD}@esgi202003-ljuxa.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
  console.log('coucou')
});
