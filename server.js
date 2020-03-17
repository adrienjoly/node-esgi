const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.json()) // for parsing application/json

const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/hello', function (req, res) {
  const nom = req.query.nom
  if (nom) {
    res.send('Bonjour, ' + nom + ' !')
  } else {
    res.send('Quel est votre nom ?')
  }
})

app.post('/chat', function (req, res) {
  if (req.body.msg === 'ville') {
    res.send('Nous sommes à Paris')
  } else if (req.body.msg === 'météo') {
    res.send('Il fait beau')
  } else {
    if (/ = /.test(req.body.msg)) {
      const [ cle, valeur ] = req.body.msg.split(' = ')
      // const valeursExistantes = readValuesFromFile();
      readValuesFromFile((err, valeursExistantes) => {
        if (err) {
          res.send('error while reading réponses.json', err)
        } else {
          const data = JSON.stringify({
            ...valeursExistantes,
            [cle]: valeur
          })
          fs.writeFile('réponses.json', data, (err) => {
            console.log('appel au callback de writefile')
            if (err) {
              console.error('error while saving réponses.json', err)
              res.send('Il y a eu une erreur lors de l\'enregistrement')
            } else {
              res.send('Merci pour cette information !')
            }
          });
          console.log('appel à writefile effectué')
        }
      })


    } else {
      const cle = req.body.msg
      readValuesFromFile((err, values) => {
        if (err) {
          res.send('error while reading réponses.json', err)
        } else {
          const reponse = values[cle]
          res.send(cle + ': ' + reponse)
        }
      })
    }
  }
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})

function readValuesFromFile(callback) {
  fs.readFile('réponses.json', { encoding: 'utf8' }, (err, reponses) => {
    if (err) {
      callback(err);
    } else {
      const valeursExistantes = JSON.parse(reponses);
      callback(null, valeursExistantes);
    }
  });
}

