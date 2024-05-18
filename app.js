const express = require('express');
const bodyParser = require('body-parser');
const getCinecaData = require('./researcher/researcher.js'); // Modifica 
il percorso per importare il modulo researchers

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// Middleware per il parsing del corpo della richiesta
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve i file statici dalla directory 'public'
app.use(express.static('public'));

// Pagina iniziale
app.get('/', (req, res) => {
  res.render('index'); // Renderizza index
});

// Route per la ricerca dei ricercatori
app.post('/search', async (req, res) => {
  const { researcherName } = req.body;

  try {
    // Ottieni i dati dei ricercatori
    const researchers = await getCinecaData(researcherName);

    res.render('search', { researchers });
  } catch (error) {
    console.error('Errore:', error);
    res.render('error');
  }
});



// Avvia il server
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});

