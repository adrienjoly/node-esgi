const PASSWORD = process.env.MONGODB_PASSWORD
// il ne faut jamais stocker de mots de passe dans un dépot git, et encore moins dans un dépot git public !
// => pour lancer ce script avec votre mot de passe, taper la commande suivante:
// $ MONGODB_PASSWORD=<mon_mot_de_passe> node dates.js

const MongoClient = require('mongodb').MongoClient;
// const uri = `mongodb+srv://defaultuser:${PASSWORD}@esgi202003-ljuxa.mongodb.net/test?retryWrites=true&w=majority`;
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  await client.connect();
  const collection = client.db("test").collection("dates");
  // affiche la liste des documents de la collection dates dans la sortie standard
  const dates = await collection.find({}).toArray();
  console.log('dates:', dates)

  await collection.insertOne({ date: new Date() });

  await client.close();
})();
