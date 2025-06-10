const express = require('express');
const connection = require('./config/database');
const app = express();
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Biblioteca Acadêmica - Online');
});

const orientadorRoutes = require('./routes/orientadorRoutes');
const trabalhoRoutes = require('./routes/trabalhoRoutes');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
